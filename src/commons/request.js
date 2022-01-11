const { convertArrayCreated_at } = require(".")
const funcQuery = require("../queries/funcQuery")

module.exports={
    getListLimitPage: async (table,limit,page,where) => {
        const listQuery = await funcQuery.getLimitPageToTable(table,limit, page,where)
        const lengthQuery = await funcQuery.getCountToTable(table,where)
        const [list,length] = await Promise.all([listQuery,lengthQuery])
        if (list.length > 0) convertArrayCreated_at(list)
        const obj = {
            array: list,
            total: length[0][`COUNT(*)`]
        }
        return obj
    },
}