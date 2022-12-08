# housekeepers-api

Housekeepers backend

Using: Express, NodeJS 18+, PostgreSQL 14.5, JWT, MongoDB
Could host: AWS

We willl use mongoDB to control session.
Follow https://www.mongodb.com/docs/manual/administration/install-community/ to know install it

# References
Security and express: https://auth0.com/blog/node-js-and-express-tutorial-building-and-securing-restful-apis/
ORM: https://sequelize.org/docs/v6/
Date and time manipulation: https://day.js.org/docs/en/parse/parse

# Database connection

There is a develop environment created at AWS, open to public access. If you what install postgreSQL database in your local machine, follow the instructions on https://www.postgresql.org/download/

# Code

The project has the *master* branch protected. You must use "dev" branch as base.
Each task must be developed in a new banch and create a *pull request* to merge the code into "dev". You can use jira software to generate the branch script or create it in the terminal with the command: git checkout -b HKP-#-[Task description].
Commits must be named as HKP-# to maintain code traceability.

CRUD example: node util/crud.create.js --name=service --className=Service
After that needs to include the reference into routes/index.js