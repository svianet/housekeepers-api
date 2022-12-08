const fs = require('fs');
const db = require('../config/db');
const path = require('path');
const { exit } = require('process');
// recover the parameters (example: node ./util/crud.create.js --name=MyEntity)
const args = require('minimist')(process.argv.slice(2));

const SQL_DB_METADATA = `SELECT c.table_schema, c.table_name, c.column_name, c.data_type, c.column_default, ordinal_position, is_nullable, c.character_maximum_length, pk.constraint_type
    FROM information_schema.columns c
    LEFT JOIN (select tc.table_schema, tc.table_name, ccu.column_name, tc.constraint_type
        FROM information_schema.constraint_column_usage ccu
        LEFT JOIN information_schema.table_constraints tc ON ccu.table_schema = tc.constraint_schema 
            AND tc.table_name = ccu.table_name 
            AND ccu.constraint_name = tc.constraint_name
            AND tc.constraint_type = 'PRIMARY KEY') pk
    on c.table_schema = pk.table_schema AND c.table_name = pk.table_name AND c.column_name = pk.column_name 
    WHERE c.table_name = $1
    order by ordinal_position`;

const createRoute = (entityName) => {
    // TEMPLATES
    const data =`'use strict';
const { Router } = require('express');
const controller = require('../controllers/${entityName}.controller');
const api = Router();

api.post('/', controller.create);
api.get('/', controller.findAll);
api.get('/:id', controller.findOne);
api.patch('/:id', controller.update);
api.delete('/:id', controller.remove);

// LOGIC BUSINESS ROUTES

module.exports = api;`;
    try {
        let filepath = path.resolve(`./routes/${entityName}.route.js`);
        // Open file for appending. The file is created if it does not exist. Fails if the path exists.
        fs.writeFileSync(filepath, data, { flag:'ax' });
        console.log("Route file written successfully");
    } catch(err) {
        console.error(err);
    }
}

const createController = (entityName, className, metadata) => {
    const data = `'use strict';
const db = require("../models");
const ${className} = require("../models/${entityName}.model.js")(db.sequelize);
const { tableName, schema } = ${className}.options;

// Operations using plain SQL (selects)
const findAll = async (req, res, next) => {
  let sql = \`SELECT ${metadata.fields.join(", ")} FROM \${schema}.\${tableName}\`;
  db.sequelize.query(sql, { raw: true, type: db.sequelize.QueryTypes.SELECT })
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(404).send({ success: false, message: 'Cannot find records.' });
      }
    })
    .catch(err => {
      next(err)
    });
};

// operations using the ORM (insert, update, delete, findByPk)
const findOne = async (req, res, next) => {
  const { id } = req.params;
  ${className}.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).json({ success: true, data: data });
      } else {
        res.status(400).send({ success: false, message: \`Cannot find record with id=\${id}.\` });
      }
    })
    .catch(err => {
      next(err)
    });
};

const create = async (req, res, next) => {
  const { ${metadata.fields.join(", ")} } = req.body;
  const t = await db.sequelize.transaction();
  try {
    const ${entityName} = ${className}.build({
        ${metadata.fields.map(element => {
            return element + ": " + element
        }).join(",\n")}
    });
    await ${entityName}.save({ transaction: t });

    res.status(200).json({ success: true, data: ${entityName} });
    await t.commit();
  } catch (err) {
    await t.rollback();
    next(err)
  }
};

const update = async (req, res, next) => {
  const { id } = req.params; // but get parameters
  // @todo capture the attributes to create your class
  const { ${metadata.fields.join(", ")} } = req.body;
  
  ${className}.update({
        ${metadata.fields.map(element => {
            return element + ": " + element
        }).join(",\n")}
    },
    {
      where: { ${metadata.pk}: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: \`Cannot update the record with id=\${id}.\` });
      }
    })
    .catch(err => {
      next(err);
    });
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  
  ${className}.destroy({
      where: { ${metadata.pk}: id }
    })
    .then(num => {
      if (num == 1) {
        res.status(200).json({ success: true });
      } else {
        res.status(400).send({ success: false, message: \`Cannot delete record with id=\${id}.\` });
      }
    })
    .catch(err => {
      next(err);
    });
};

module.exports = {
  findAll, findOne, create, update, remove
};`;
    try {
        let filepath = path.resolve(`./controllers/${entityName}.controller.js`);
        // Open file for appending. The file is created if it does not exist. Fails if the path exists.
        fs.writeFileSync(filepath, data, { flag:'ax' });
        console.log("Controller file written successfully");
    } catch(err) {
        console.error(err);
    }
}

const postgres2Sequelize = (data_type) => {
    if (data_type == "integer" || data_type == "numeric") {
        return "DataTypes.NUMBER";
    }
    if (data_type.substr(0,9) == "timestamp") {
        return "DataTypes.DATE";
    }
    return "DataTypes.STRING";
}

const createModel = (entityName, className, metadata) => {
    const data = `// https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
// const dayjs = require('dayjs');
// const isSameOrAfter = require('dayjs/plugin/isSameOrAfter') // import plugin example
const { DataTypes } = require("sequelize"); // Import the built-in data types
const ${entityName} = {
    ${metadata.rows.map(element => {
        return element.column_name + `: {\n
        type: ${postgres2Sequelize(element.data_type)}
        ${element.is_nullable == "NO" ? ", allowNull: false" : ", allowNull: true"}
        ${element.column_default?.substr(0,7) == "nextval" ? ", autoIncrement: true" : ""}
        ${element.constraint_type == "PRIMARY KEY" ? ", primaryKey: true" : ""}
        ${element.character_maximum_length != null ? ", validate: { len: [0, " + element.character_maximum_length + "] }" : ""}
    }`
        }).join(",\n")
    }
};

module.exports = (sequelize) => {
    let schema = "${metadata.schema}";
    let tableName = "${entityName}";
    const Model = sequelize.define(tableName, ${entityName}, {
        timestamps: false,
        tableName: tableName,
        schema: schema
    });
    return Model;
};`;
    
    try {
        let filepath = path.resolve(`./models/${entityName}.model.js`);
        // Open file for appending. The file is created if it does not exist. Fails if the path exists.
        fs.writeFileSync(filepath, data, { flag:'ax' });
        console.log("Model file written successfully");
    } catch(err) {
        console.error(err);
    }
}

const getMetadata = async (entityName) => {
    const { rows } = await db.query(SQL_DB_METADATA, [entityName]);
    
    let metadata = {
        rows: rows,
        schema: null,
        pk: null
    };
    metadata.fields = rows.map(element => {
        return element.column_name;
    });
    rows.forEach(element => {
        if (element.constraint_type == "PRIMARY KEY") {
            metadata.pk = element.column_name;
            metadata.schema = element.table_schema;
        }
    });    
    return metadata;
}

let entityName = args['name'];
let className = args['className'];
if (entityName && className) {
    getMetadata(entityName).then((metadata) => {
        createRoute(entityName);
        createController(entityName, className, metadata);
        createModel(entityName, className, metadata);
        // @todo test
        exit(0);
    }).catch((err) => {
        console.log(err);
    });
}