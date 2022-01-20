const connect = require('../database/database')

module.exports = {
    updateLikeSubMenuToId: async function (id, userid_like) {
        const sql = `UPDATE tb_sub_menu SET userid_like="${userid_like}" WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    message: "Lỗi Front End !",
                    status: false,
                    err
                });
                resolve({
                    message: "Cập nhật phone token app ! ",
                    status: true
                });
            });

        });
    },
    getSlider: async function (idMenu) {
        var query = `SELECT * FROM tb_slider`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getSubMenuToId: async function (id) {
        var query = `SELECT * FROM tb_sub_menu WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getSubMenuToIdMenu: async function (idMenu) {
        var query = `SELECT * FROM tb_sub_menu WHERE id_menu=${idMenu}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getMenu: async function () {
        var query = `SELECT * FROM tb_menu `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
       getSubMenu: async function () {
           var query = `SELECT * FROM tb_sub_menu `
           return new Promise((resolve, reject) => {
               connect.connect.query(query, (err, rows) => {
                   if (err) return reject(err);
                   resolve(rows);
               });
           });
       },


    ///////////////////////////////////////////// END ///////////////////////////////////////////////////////////////
    add_posts: async function (title, desc, content, cateId, authId) {
        var query = `INSERT INTO posts set ?`
        const posts = {
            title,
            desc,
            content,
            cateId,
            authId
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
    updateAvatar: async function (id, avatar) {
        const sql = `UPDATE users SET avatar="${avatar}" WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    message: "Lỗi Front End !",
                    status: false,
                    err
                });
                resolve({
                    message: "Cập nhật phone token app ! ",
                    status: true
                });
            });

        });
    },
}