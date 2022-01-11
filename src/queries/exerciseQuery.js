const connect = require('../database/database')

module.exports = {
      getExerciseToUserIdAndProduct: async function (userid, idProduct) {
          var query = `SELECT * FROM tb_exercise WHERE userid=${userid} AND idProduct=${idProduct}`
          return new Promise((resolve, reject) => {
              connect.connect.query(query, (err, rows) => {
                  if (err) return reject(err);
                  resolve(rows);
              });
          });
      },
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
