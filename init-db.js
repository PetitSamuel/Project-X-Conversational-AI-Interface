db.createUser(
    {
        user: "root",
        pwd: "root",
        roles: [
            { role: "dbAdmin", db: "db" },
            { role: "dbAdmin", db: "test" }
        ]
    }
)
db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [
            { role: "readWrite", db: "db" },
            { role: "readWrite", db: "test" },
        ]
    }
)
