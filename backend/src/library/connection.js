"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE_NAME,
    user: process.env.DB_USER,
    password: (process.env.DB_PASS),
});
exports.default = pool;
// class Pool {
//   _pool = null;
//   connect(options) {
//     this._pool = new pg.Pool(options);
//     return this._pool.query("SELECT 1+1;");
//     }
//     close() {
//         return this._pool.end();
//     }
//     query(sql,params) {
//         return this._pool.query(sql,params);
//     }
// }
// module.exports = new Pool();
