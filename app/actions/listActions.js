const prisma = require('./../../db');

export const fetchAllLists = async () => {
    const itemLists = await prisma.list.findMany({
        include: {
            cards : true
        }
    })
    return itemLists;
}

export const createList = async (data) => {
    const list = await prisma.list.create({
        data
    });
}

export const getListById = async (id) => {
    const itemList = await prisma.list.findUnique(
        {
            where: { id: id },
            include: {
                cards : true
            }
        });
    return itemList;

}