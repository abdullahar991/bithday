// lib/db.js
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',           // default XAMPP password is empty
    database: 'mydb',       // make sure this database exists
});
