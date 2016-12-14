var sql = require("mssql");

var dbConfig = {
    server: "(localdb)\\MSSQLLocalDB",
    database: "Blog",
    user: "DUNDEE\\Hristo Nestorov",
    password: "Ne$100rov8888",
    port: 1433
};

console.log(dbConfig.user);

function getEmp() {
    var conn = new sql.Connection(dbConfig);

    conn.connect().then(function () {
        var req = new sql.Request(conn);
        req.query("SELECT * FROM users").then(function (recordset) {
            console.log(recordset);
            conn.close();
        })
            .catch(function (err) {
                console.log(err);
                conn.close();
            });
    })
        .catch(function (err) {
            console.log(err);
        });
}

getEmp();