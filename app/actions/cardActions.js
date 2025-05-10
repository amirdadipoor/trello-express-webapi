const prisma = require('./../../db');

exports.fetchAllCardsOfList = async (id) => {
    const myList = await prisma.list.findUnique(
        {
            where: { id },
            include: {
                cards : true
            }
        });
    if (!myList) return myList;

    return myList.cards;
}

exports.createCardForList = async (id , data) => {

    const myList = await prisma.list.findUnique(
        {
            where: { id },
        });
    if(!myList) return myList;

    const myCard = await prisma.card.create({
        data
    })
    return myCard;

}

exports.updateCardOfList = async (listId , cardId , cardName) => {
    const myCard = await prisma.card.findUnique(
        {
            where: { id: cardId , listId },
        });
    if (!myCard) return null;

    const updatedCard = await prisma.card.update(
        {
            where: {
                id: cardId ,
                listId
            }, data : {
                name : cardName
            }
        });

    return updatedCard
}

exports.deleteCardOfList = async (listId , cardId) => {
    const myCard = await prisma.card.findUnique(
        {
            where: { id: cardId , listId  },
        });
    if (!myCard) return null;

    const deletedCard = await prisma.card.delete(
        {
            where: {
                id: cardId ,
                listId
            }
        });

    return deletedCard;

}