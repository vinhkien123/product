const connect = require('../database/database')

module.exports = {
    updateProfile: async function (id, address,phone) {
        const sql = `UPDATE tb_user SET address="${address}",phone=${phone} WHERE id=${id}`
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
    updatePasswordToId: async function (id, password) {
        const sql = `UPDATE tb_user SET password="${password}" WHERE id=${id}`
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
     getUserToId: async function (id) {
         var query = `SELECT * FROM tb_user WHERE id=${id}`
         return new Promise((resolve, reject) => {
             connect.connect.query(query, (err, rows) => {
                 if (err) return reject(err);
                 resolve(rows);
             });
         });
     },
      loginUser: async function (email, password) {
          var query = `SELECT * FROM tb_user WHERE   password='${password}' AND email='${email}' OR username="${email}"  `
          return new Promise((resolve, reject) => {
              connect.connect.query(query, (err, rows) => {
                  if (err) return reject(err);
                  resolve(rows);
              });
          });
      },
      addUserEmail: async function (username, email, password) {
          const sqlNotification = `INSERT INTO tb_user set ?`
          const cusObj = {
              username,
              email,
              password
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
       updateAvatar: async function (id, avatar) {
           const sql = `UPDATE tb_user SET avatar="${avatar}" WHERE id=${id}`
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
      getUserToEmail: async function (username) {
        var query = `SELECT * FROM tb_user WHERE email='${username}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
       getUserToPassword: async function (password, id) {
           var query = `SELECT * FROM tb_user WHERE password='${password}' AND id=${id}`
           return new Promise((resolve, reject) => {
               connect.connect.query(query, (err, rows) => {
                   if (err) return reject(err);
                   resolve(rows);
               });
           });
       },
      getUserToId: async function (id) {
        var query = `SELECT * FROM tb_user WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    ///////////////////////////////////////// END //////////////////////
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
    ////////////////////////////////////////////////////////// aa
    getAllPostOfUser: async function (id) {
        var query = `SELECT * FROM posts WHERE authId=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    updateLikeSubMenuToId: async function (id, like_submenus) {
        const sql = `UPDATE tb_user SET like_submenus='${like_submenus}' WHERE id=${id}`
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
        const sql = `UPDATE tb_user SET avatar="${avatar}" WHERE id=${id}`
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
