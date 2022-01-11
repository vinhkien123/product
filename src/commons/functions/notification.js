const funcQuery = require("../../queries/funcQuery")

module.exports = {
    addNotificationToIdUser: async (userid, title, detail) => {
        let images = `images/logo.jpg`
        const obj = {
            userid,
            title,
            detail,
            thumnail: images
        }
        await funcQuery.addRowToTable(`tb_notification`, obj)
    }
}