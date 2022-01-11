const menuQuery = require("../../queries/menuQuery")

module.exports = {
    getSubMenuToIdArray: async (arrayId) => {
        let array = []
        for await (id of arrayId) {
            const subMenu = await menuQuery.getSubMenuToId(id)
            array.push(subMenu)
        }
        return array
    }
}