module.exports = {
    ACCOUNT: {
        PENDING: "P",
        VALIDATED: "V",
        BLOCKED: "B",
        REMOVED: "X"
    },
    ROLE: {
        ADMINISTRATOR: 1,
        HOUSEKEEPER: 2,
        CUSTOMER: 3
    },
    JOB: {
        TYPE: {
            RECURRING: "R",
            ONETIME: "O"
        },
        FREQUENCY: {
            WEEK: "W",
            EVERY_OTHER_WEEK: "Q",
            EVERY_MONTH: "M",
            ONETIME: "1"
        },
        DAYS: {
            SUNDAY: "S",
            MONDAY: "M",
            TUESDAY: "T",
            WEDNESDAY: "W",
            THURSDAY: "H",
            FRIDAY: "F",
            SATURDAY: "A"
        },
        STATUS: {
            OPENED: "O",
            CANCELLED: "C",
            EXPIRED: "E",
            ACCEPTED: "A",
            DONE: "D"
        }
    },
    SERVICE_COMPLETION: {
        STATUS: {
            OPENED: "O",
            STARTED: "S",
            CANCELLED: "C",
            DONE: "D"
        }
    },
    APPLICATION: {
        STATUS: {
            REQUESTED: "R",
            VIEWED: "V",
            ACCEPTED: "A",
            REJECTED: "X"
        }
    }
}