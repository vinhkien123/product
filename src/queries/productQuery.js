const connect = require('../database/database')

module.exports = {
   getHistoryBuyProductToId: async function (limit, page, userid) {
       var query = `SELECT * FROM tb_buy_product WHERE userid=${userid}   ORDER by id DESC LIMIT  ${limit * (page - 1)},${limit}`
       return new Promise((resolve, reject) => {
           connect.connect.query(query, (err, rows) => {
               if (err) return reject(err);
               resolve(rows);
           });
       });
    },
    getHistoryBuyProductToIdPagination: async function ( userid) {
        var query = `SELECT * FROM tb_buy_product WHERE userid=${userid} `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getProductsToIdSubMenu: async function (limit, page, idMenu) {
        var query = `SELECT * FROM tb_product WHERE id_submenu=${idMenu}   ORDER by id DESC LIMIT  ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
       getAllProduct: async function () {
           var query = `SELECT * FROM tb_product`
           return new Promise((resolve, reject) => {
               connect.connect.query(query, (err, rows) => {
                   if (err) return reject(err);
                   resolve(rows);
               });
           });
    },
       getStepProduct: async function (userid,idProduct) {
           var query = `SELECT * FROM tb_processing_products WHERE userid=${userid} AND idProduct=${idProduct}`
           return new Promise((resolve, reject) => {
               connect.connect.query(query, (err, rows) => {
                   if (err) return reject(err);
                   resolve(rows);
               });
           });
    },
       
    getProductsToId: async function (id) {
        var query = `SELECT * FROM tb_product WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getBuyProductsToIdAndProduct: async function (id, id_product) {
        var query = `SELECT * FROM tb_buy_product WHERE userid=${id} AND id_product=${id_product}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
   
    getProductsToIdSubMenuLength: async function (idMenu) {
        var query = `SELECT * FROM tb_product WHERE id_submenu=${idMenu}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    addBuyProduct: async function (userid,
                title,
                id_product) {
        const sqlNotification = `INSERT INTO tb_buy_product set ?`
        const cusObj = {
            userid,
            title,
            id_product
        }
        console.log(cusObj);
        return new Promise((resolve, reject) => {
            connect.connect.query(sqlNotification, cusObj, (err, rows) => {
                if (err)
                    return reject({
                        status: false,
                        message: "đăng ký thất bại !",
                        err
                    });
                return resolve({
                    status: 200,
                    message: "Kích hoạt gói thành công !",
                    resolve: rows

                });
            });
        })
    },
    /////////////////// END //////////////////////////////
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
     updateStepToProducts: async function (id, step,idProduct) {
         const sql = `UPDATE tb_processing_products SET step=${step} WHERE userid=${id} AND idProduct=${idProduct}`
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