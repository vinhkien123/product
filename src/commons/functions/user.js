const { getProfileUser } = require("..")
const userQuery = require("../../queries/userQuery")

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