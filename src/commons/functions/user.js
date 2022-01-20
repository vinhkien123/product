const customerQuery = require("../../queries/customerQuery")
const userQuery = require("../../queries/userQuery")


async function getProfileUser(userid)  {
    const user = await customerQuery.getUserToId(userid)
    if (user.length <= 0) return fasle
    delete user[0].password
    return user[0]
}
module.exports = {
    getProfileUserToIdArray: async (arrayId) => {
        let array = []
        for await (userid of arrayId) {
            const user = await getProfileUser(userid)
            array.push(user)
        }
        return array
    }
}