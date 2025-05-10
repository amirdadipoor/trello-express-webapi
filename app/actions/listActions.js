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

export const updateList = async (id , data) => {
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

export const deleteList = async (id) => {
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