const connect = require('../database/database')
module.exports = {
    getUserToId: async function (id) {
        var query = `SELECT * FROM tb_user WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
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
    updateRooms: async function (id, rooms) {
        const sql = `UPDATE tb_user SET rooms='${rooms}' WHERE id=${id}`
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
    ////// END
  
    updateActive: async function (id, avatar) {
        const sql = `UPDATE tb_user SET active=1 WHERE id=${id}`
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
    updateLibrary: async function (id, title, description, images, detail) {
        const sql = `UPDATE libary SET title="${title}", description='${description}', images="${images}", detail="${detail}" WHERE id=${id}`
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
        const sql = `UPDATE comments SET sub_comment="${sub_comment}" WHERE id=${id}`
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
    updateBonusPost: async function (id, flag) {
        const sql = `UPDATE posts SET is_bonus=${flag} WHERE id=${id}`
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
    updatePostPin: async function (id, flag) {
        const sql = `UPDATE posts SET pin=${flag} WHERE id=${id}`
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
    updateBlockUser: async function (id, flag) {
        const sql = `UPDATE tb_user SET block=${flag} WHERE id=${id}`
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
    updateRule: async function (id, flag) {
        const sql = `UPDATE tb_user SET rule=${flag} WHERE id=${id}`
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
    updateAdminUser: async function (id, flag) {
        const sql = `UPDATE tb_user SET admin=${flag} WHERE id=${id}`
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
    updatePostToUser: async function (id, title,description,detail) {
        const sql = `UPDATE posts SET title="${title}", description = "${description}",detail ="${detail}" WHERE id=${id}`
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
    updatePostComment: async function (id, flag) {
        const sql = `UPDATE posts SET comment=${flag} WHERE id=${id}`
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
        const sql = `UPDATE comments SET reply_to=reply_to+1 WHERE id=${id}`
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
    updateVoteLibrary: async function (id, id_vote) {
        const sql = `UPDATE libary SET id_vote="${id_vote}",vote=vote+1 WHERE id=${id}`
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
    updateVotePost: async function (id, id_vote) {
        const sql = `UPDATE posts SET id_vote="${id_vote}",vote=vote+1 WHERE id=${id}`
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
    updateVote: async function (id, id_vote) {
        const sql = `UPDATE comments SET id_vote="${id_vote}",vote=vote+1 WHERE id=${id}`
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
    updateReplyLibrary: async function (id, avatar) {
        const sql = `UPDATE libary SET reply_to=reply_to+1 WHERE id=${id}`
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
    updateWallet: async function (id, amount) {
        const sql = `UPDATE wallet_admin SET value="${amount}" WHERE wallet="${id}"`
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
    updateBalance: async function (id, amount) {
        const sql = `UPDATE tb_user SET token_balance=${amount} WHERE id=${id}`
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
    updateConfig: async function (id, amount) {
        const sql = `UPDATE config SET amount=${amount} WHERE name="${id}"`
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
    updateReply: async function (id, avatar) {
        const sql = `UPDATE posts SET reply_to=reply_to+1 WHERE id=${id}`
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
    updateWidthdraw: async function (id, status) {
        const sql = `UPDATE widthdraw SET status=${status} WHERE id=${id}`
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
    connectWallet: async function (id, address_wallet, password, nonce) {
        const sql = `UPDATE tb_user SET address_wallet="${address_wallet}" ,password="${password}",nonce="${nonce}" WHERE id=${id}`
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
    deleteBankingUserToIdUser: async function (id, userid) {
        var sql = `DELETE FROM  tb_banking_user WHERE id=${id} AND userid=${userid}`
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    status: false,
                    message: "Lỗi hệ thống ",
                    err
                });
                resolve({
                    message: "detele success !",
                    status: true
                });
            });

        });
    },
    deleteLibary: async function (id, userid) {
        var sql = `DELETE FROM  libary WHERE id=${id} `
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    status: false,
                    message: "Lỗi hệ thống ",
                    err
                });
                resolve({
                    message: "detele success !",
                    status: true
                });
            });

        });
    },
    deletePosts: async function (id, userid) {
        var sql = `DELETE FROM  posts WHERE id=${id} `
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    status: false,
                    message: "Lỗi hệ thống ",
                    err
                });
                resolve({
                    message: "detele success !",
                    status: true
                });
            });

        });
    },
    deleteTransactionPost: async function (id, userid) {
        var sql = `DELETE FROM  transaction WHERE id_post=${id} `
        return new Promise((resolve, reject) => {
            connect.connect.query(sql, (err, rows) => {
                if (err) return reject({
                    status: false,
                    message: "Lỗi hệ thống ",
                    err
                });
                resolve({
                    message: "detele success !",
                    status: true
                });
            });

        });
    },
    getCountry: async function () {
        var query = `SELECT * FROM country`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getAllTransaction: async function (id) {
        var query = `SELECT * FROM transaction `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getWidthdrawToId: async function (id) {
        var query = `SELECT * FROM widthdraw WHERE userid=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getWidthdrawToIdWD: async function (id) {
        var query = `SELECT * FROM widthdraw WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getTransactionToId: async function (id) {
        var query = `SELECT * FROM transaction WHERE userid=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getBonusToId: async function (id) {
        var query = `SELECT * FROM bonus_vote WHERE userid=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostsToId: async function (id) {
        var query = `SELECT * FROM posts WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getLibraryToId: async function (id) {
        var query = `SELECT * FROM libary WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getMenuToId: async function (id) {
        var query = `SELECT * FROM menu WHERE id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getMenu: async function () {
        var query = `SELECT * FROM menu `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getComments: async function (limit, page, id) {
        var query = `SELECT * FROM comments WHERE id_post=${id} AND id_comment is NULL ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getCommentToIdComment: async function (limit, page, id) {
        var query = `SELECT * FROM comments WHERE id=${id}  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getSubCommentsPagination: async function (id) {
        var query = `SELECT id FROM sub_comment WHERE id_comment=${id} `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getSubComments: async function (limit, page, id) {
        var query = `SELECT * FROM sub_comment WHERE id_comment=${id}  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getlibary: async function (limit, page) {
        var query = `SELECT * FROM libary  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostsToIdUserProfile: async function (idUser) {
        var query = `SELECT * FROM posts WHERE userid=${idUser}  ORDER by id DESC`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostsToIdUser: async function (limit, page, idUser) {
        var query = `SELECT * FROM posts WHERE userid=${idUser}  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getRooms: async function (id) {
        var query = `SELECT * FROM rooms_message`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getRoomsToId: async function (id) {
        var query = `SELECT * FROM rooms_message where id="${id}"`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getCommentToId: async function (id) {
        var query = `SELECT * FROM comments where id=${id}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostsPin: async function (limit, page) {
        var query = `SELECT * FROM posts WHERE pin=1  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPosts: async function (limit, page) {
        var query = `SELECT * FROM posts WHERE pin!=1  ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostsToIdMenu: async function (limit, page,idMenu) {
        var query = `SELECT * FROM posts WHERE id_menu=${idMenu}  ORDER by pin DESC, id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    addSubComments: async function (username, userid, description, id_post, id_comment, id_vote) {
        const sqlNotification = `INSERT INTO sub_comment set ?`
        const cusObj = {
            username, description, userid, id_post, id_comment, id_vote
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
    addComments: async function (username, userid, description, id_post, sub_comment, id_vote) {
        const sqlNotification = `INSERT INTO comments set ?`
        const cusObj = {
            username, description, userid, id_post, sub_comment, id_vote,
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
    addMessage: async function (username, userid, room, message) {
        const sqlNotification = `INSERT INTO messages set ?`
        const cusObj = {
            username, userid, room, message
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
    addBonus: async function (title, id_post,username,amount,userid) {
        const sqlNotification = `INSERT INTO bonus_vote set ?`
        const cusObj = {
            title, id_post,username,amount,userid
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
    addRoom: async function (id, people) {
        const sqlNotification = `INSERT INTO rooms_message set ?`
        const cusObj = {
            id, people
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
    addCommentsLibrary: async function (username, userid, description, id_library, id_vote) {
        const sqlNotification = `INSERT INTO comments set ?`
        const cusObj = {
            username, description, userid, id_library, id_vote,
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
    addWidthDraw: async function (username, userid, amount, fee, wallet,receive) {
        const sqlNotification = `INSERT INTO widthdraw set ?`
        const cusObj = {
            username, userid, amount, fee, wallet,receive
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
    addVoteTransactionPost: async function (username, userid, hash, id_post, amount, contract, chain) {
        const sqlNotification = `INSERT INTO transaction set ?`
        const cusObj = {
            username, userid, hash, id_post, amount, contract, chain
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
    addVoteTransactionLibrary: async function (username, userid, hash, id_library, amount, contract, chain) {
        const sqlNotification = `INSERT INTO transaction set ?`
        const cusObj = {
            username, userid, hash, id_library, amount, contract, chain
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
    addPrentComments: async function (username, userid, description, id_post, sub_comment, id_comment, id_vote) {
        const sqlNotification = `INSERT INTO comments set ?`
        const cusObj = {
            username, description, userid, id_post, sub_comment, id_comment, id_vote
        }
        console.log(cusObj, "XZxzzx");
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
    addLibary: async function (username, title, description, userid, detail, images, id_vote) {
        const sqlNotification = `INSERT INTO libary set ?`
        const cusObj = {
            username, title, description, userid, detail, images, id_vote
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
    addPost: async function (username, title, description, userid, detail, id_vote,id_menu,title_menu) {
        const sqlNotification = `INSERT INTO posts set ?`
        const cusObj = {
            username, title, description, userid, detail, id_vote,id_menu,title_menu
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
    addUserEmail: async function (username, email, password) {
        const sqlNotification = `INSERT INTO tb_user set ?`
        const cusObj = {
            username, email, password
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
    addUser: async function (username, nonce, address_wallet, password, rooms) {
        const sqlNotification = `INSERT INTO tb_user set ?`
        const cusObj = {
            username, nonce, address_wallet, password, active: 1, rooms
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

    getUserToUserName: async function (username) {
        var query = `SELECT * FROM tb_user WHERE username='${username}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getUserToUseNamePagination: async function (username) {
        var query = `SELECT * FROM tb_user WHERE POSITION('${username}' IN username)`
        console.log(query);
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getWidthDrawAll: async function (id) {
        var query = `SELECT * FROM widthdraw `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getUserAll: async function (id) {
        var query = `SELECT * FROM tb_user `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
 
    getMessageToRoomTotal: async function (userid,room) {
        var query = `SELECT * FROM messages WHERE userid=${userid} AND room='${room}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getMessageToRoom: async function (room,limit,page) {
        var query = `SELECT * FROM messages WHERE  room='${room}' ORDER by id DESC LIMIT ${limit * (page - 1)},${limit}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getUserToUserNameAndAddwallet: async function (username, address_wallet) {
        var query = `SELECT * FROM tb_user WHERE username='${username}' OR address_wallet='${address_wallet}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getCommentToIdCommentPagination: async function (id) {
        var query = `SELECT * FROM comments WHERE id=${id} `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getCommentsPost: async function (id) {
        var query = `SELECT id FROM comments WHERE id=${id} AND id_comment is null `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getLibaryLength: async function () {
        var query = `SELECT id FROM posts `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostToIdUserLength: async function (idUser) {
        var query = `SELECT id FROM posts WHERE userid=${idUser}`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostPinLength: async function () {
        var query = `SELECT id FROM posts WHERE pin=1 `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    
    getPostToIdMenuLength: async function (idMenu) {
        var query = `SELECT id FROM posts WHERE pin!=1 AND id_menu=${idMenu} `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getPostLength: async function () {
        var query = `SELECT id FROM posts WHERE pin!=1 `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getUserLength: async function () {
        var query = `SELECT id FROM tb_user `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getContractToSymbol: async function (name) {
        var query = `SELECT * FROM token WHERE symbol='${name}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getWalletConfig: async function (name) {
        var query = `SELECT * FROM wallet_admin WHERE wallet='${name}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getConfig: async function (name) {
        var query = `SELECT * FROM config WHERE name='${name}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getWalletMetaMask: async function (walletMetamask) {
        var query = `SELECT * FROM tb_user WHERE address_wallet='${walletMetamask}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    getUserToWallet: async function (address_wallet) {
        var query = `SELECT * FROM tb_user WHERE address_wallet='${address_wallet}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    loginMetaMask: async function (address_wallet, password) {
        var query = `SELECT * FROM tb_user WHERE address_wallet='${address_wallet}' AND password='${password}'`
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
    loginUser: async function (email, password) {
        var query = `SELECT * FROM tb_user WHERE   password_email='${password}' AND email='${email}' OR username="${email}"  `
        return new Promise((resolve, reject) => {
            connect.connect.query(query, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            });
        });
    },
}