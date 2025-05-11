const prisma = require('./../../db');

exports.fetchAllLists = async () => {
    const itemLists = await prisma.list.findMany({
        include: {
            cards : true
        }
    })
    return itemLists;
}

exports.createList = async (data) => {
    const list = await prisma.list.create({
        data
    });
    return list;
}

exports.getListById = async (id) => {
    const itemList = await prisma.list.findUnique(
        {
            where: { id: id },
            include: {
                cards : true
            }
        });
    return itemList;
}

exports.updateList = async (id , data) => {
    const myList = await prisma.list.findUnique(
    {
        where: { id },
    });
    if(!myList) return myList;
    const updatedList = await prisma.list.update({
        where : {
            id
        },
        data
    })
    return updatedList;
}

exports.deleteList = async (id) => {
    const myList = await prisma.list.findUnique(
        {
            where: { id },
        });
    if(!myList) return myList;
    const deletedList = await prisma.list.delete({
        where: {
            id,
        }
    });
    return deletedList;
}