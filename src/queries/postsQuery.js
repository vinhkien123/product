const connect = require('../database/database')

module.exports = {
    add_posts: async function (title, desc, content, cateId, authId) {
        var query = `INSERT INTO posts set ?`
        const posts = {
            title,desc,content,cateId,authId
        }
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getAllPostOfUser: async function (id) {
        var query = `SELECT * FROM posts WHERE authId=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    getPostById: async function (id) {
        var query = `SELECT * FROM posts WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },

    edit_posts: async function (title, desc, content, cateId, authId) {
        var query = `INSERT INTO posts set ?`
        const posts = {
            title,desc,content,cateId,authId
        }
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
}
