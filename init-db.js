db.createUser(
    {
        user: "root",
        pwd: "root",
        roles: [ { role: "dbAdmin", db: "db" } ]
    }
)
db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [ { role: "readWrite", db: "db" } ]
    }
)