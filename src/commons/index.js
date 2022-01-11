const customerQuery = require('../queries/customerQuery')
const jwt = require('jsonwebtoken');
const userQuery = require('../queries/userQuery');
module.exports = {
    resListLimitPage: (array,total) => {
        return {array,total}
    },
    convertCreated_at: (created_at) => {
        let day = created_at.getDate();
        let month = created_at.getMonth() + 1;
        let year = created_at.getFullYear();
        var hours = created_at.getHours();
        var minutes = created_at.getMinutes();
        var seconds = created_at.getSeconds();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    },
    getAvatarItemToArray: async (array) => {
        try {
            if (array.length > 0) {
                for await (pack of array) {
                    const user = await userQuery.getUserToId(pack.userid)
                    pack.avatar = user[0].avatar
                }
                return array
            }
        } catch (error) {
            console.log(error);
        }
    },
    convertArrayCreated_at: (array) => {
        for (item of array) {
            let day = item.created_at.getDate();
            let month = item.created_at.getMonth() + 1;
            let year = item.created_at.getFullYear();
            var hours = item.created_at.getHours();
            var minutes = item.created_at.getMinutes();
            var seconds = item.created_at.getSeconds();
            item.created_at = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
        }
    },
    validationBody: (obj) => {
        const arrayKey = Object.keys(obj)
        let arrayError = []
        for (key of arrayKey)
            if (!obj[key]) arrayError.push(`${key} is not empty`)
        if (arrayError.length > 0) return arrayError
        return true
    },
    convertTimeToString: (time) => {
        let day = time.getDate();
        let month = time.getMonth() + 1;
        let year = time.getFullYear();
        var hours = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    },
    getTokenUser: (cusObj) => {
        delete cusObj.password
        return jwt.sign({
            cusObj
        }, "app_steam", {
            expiresIn: 60 * 518400
        });
    },
    removeItemArray: (item, array) => {
        const index = array.indexOf(item);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array
    },
    getProfileUser: async (userid) => {
        const user = await customerQuery.getUserToId(userid)
        if (user.length <= 0) return fasle
        delete user[0].password
        return user[0]
    },
    checkCommentPost: async (id) => {
        var flag = true
        const user = await customerQuery.getPostsToId(id)
        if (user.length > 0) {
            if (user[0].comment == 1) {
                flag = false
            }
        } else {
            flag = false
        }
        return flag
    },
    checkBlock: async (id) => {
        var flag = true
        const user = await customerQuery.getUserToId(id)
        if (user.length > 0) {
            if (user[0].block == 1) {
                flag = false
            }
        } else {
            flag = false
        }
        return flag
    },
    checkRule: async (id) => {
        var flag = true
        const user = await customerQuery.getUserToId(id)
        if (user.length > 0) {
            if (user[0].rule != 1) {
                flag = false
            }
        } else {
            flag = false
        }
        return flag
    },
    checkAdmin: async (id) => {
        var flag = true
        const user = await customerQuery.getUserToId(id)
        if (user.length > 0) {
            if (user[0].admin != 1) {
                flag = false
            }
        } else {
            flag = false
        }
        return flag
    },
    getHistory: async (id) => {
        var flag = true
        const user = await customerQuery.getUserToId(id)
        if (user.length > 0) {
            if (user[0].admin != 1) {
                flag = false
            }
        } else {
            flag = false
        }
        return flag
    },
    removeBalanceToken: async (userid, amount) => {
        try {
            const user = await customerQuery.getUserToId(userid)
            const balanceUpdate = user[0].token_balance - amount
            await customerQuery.updateBalance(userid, balanceUpdate)
        } catch (error) {
            console.log(error);
        }
    },
    addBalanceToken: async (userid, amount) => {
        try {
            const user = await customerQuery.getUserToId(userid)
            const balanceUpdate = user[0].token_balance + amount
            await customerQuery.updateBalance(userid, balanceUpdate)
        } catch (error) {
            console.log(error);
        }
    }
}