const connect = require('../database/database')

module.exports = {
     updateReply: async function (id) {
         const sql = `UPDATE tb_product SET reply_to=reply_to+1 WHERE id=${id}`
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
      updateReplyComment: async function (id, avatar) {
          const sql = `UPDATE tb_comments SET reply_to=reply_to+1 WHERE id=${id}`
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
    updateSubComment: async function (id, sub_comment) {
        const sql = `UPDATE tb_comments SET sub_comment="${sub_comment}" WHERE id=${id}`
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
      getCommentsProductPagination: async function (id) {
          var query = `SELECT id FROM tb_comments WHERE id_product=${id} AND id_comment is null `
          return new Promise((resolve, reject) => {
              connect.connect.query(query, (err, rows) => {
                  if (err) return reject(err);
                  resolve(rows);
              });
          });
    },
        updateVote: async function (id, id_vote) {
            const sql = `UPDATE tb_comments SET id_vote="${id_vote}",vote=vote+1 WHERE id=${id}`
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
       getCommentToIdCommentPagination: async function (id) {
           var query = `SELECT * FROM tb_comments WHERE id=${id} `
           return new Promise((resolve, reject) => {
               connect.connect.query(query, (err, rows) => {
                   if (err) return reject(err);
                   resolve(rows);
               });
           });
       },
    getComments: async function (limit, page, id) {
        var query = `SELECT * FROM tb_comments WHERE id_product=${id} AND id_comment is NULL ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    addPrentComments: async function (username, userid, description, id_product, id_comment) {
        const array = JSON.stringify([])
          const sqlNotification = `INSERT INTO tb_comments set ?`
          const cusObj = {
              username,
              description,
              userid,
              id_product,
              sub_comment: array,
              id_comment,
              id_vote: array
          }
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
     getCommentToId: async function (id) {
         var query = `SELECT * FROM tb_comments where id=${id}`
         return new Promise((resolve, reject) => {
             connect.connect.query(query, (err, rows) => {
                 if (err) return reject(err);
                 resolve(rows);
             });
         });
     },
    addComments: async function (username, userid, description, id_product) {
        const array = JSON.stringify([])
         const sqlNotification = `INSERT INTO tb_comments set ?`
         const cusObj = {
             username,
             description,
             userid,
             id_product,
             sub_comment: array,
             id_vote: array,
         }
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
    /////////////////////////////////////////////////////////////
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
