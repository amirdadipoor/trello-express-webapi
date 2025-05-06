const prisma = require('./../../db');

exports.fetchAllLists = async () => {
    const itemList = await prisma.list.findMany({
        include: {
            cards : true
        }
    })
    return itemList;
}

exports.createList = async (data) => {
    const list = await prisma.list.create({
        data
    });
}

exports.getListById = async