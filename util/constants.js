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
    },
    US_STATES: {
        AL: "Alabama",
        AK: "Alaska",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DE: "Delaware",
        FL: "Florida",
        GA: "Georgia",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PA: "Pennsylvania",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming"
    }
}