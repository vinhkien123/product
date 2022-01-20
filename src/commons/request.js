const { convertArrayCreated_at } = require(".")
const funcQuery = require("../queries/funcQuery")

module.exports={
    getListLimitPage: async (table,limit,page,where,flag) => {
        const listQuery = await funcQuery.getLimitPageToTable(table,limit, page,where)
        const lengthQuery = await funcQuery.getCountToTable(table,where)
        const [list,length] = await Promise.all([listQuery,lengthQuery])
        if (list.length > 0) await convertArrayCreated_at(list, flag)
        const obj = {
            array: list,
            total: length[0][`COUNT(*)`]
        }
        return obj
    },
}