const cardActions = require('./../actions/cardActions')

exports.getAllCardsByListId = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const myCards = await cardActions.fetchAllCardsOfList(id);
        if (!myCards) return res.status(404).json({error: 'Failed to get cards.' });
        res.json(myCards);

    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve cards.' });
    }
}

exports.getCardById = (req , res) => {

}

exports.createCard = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const data = {name: req.body.name , listId : id }
        const myCard = await cardActions.createCardForList(id , data);
        if(!myCard) return myCard;
        res.json(myCard);

    } catch (error) {
        res.status(500).json({error: 'Failed to creating cards.' });
    }
}

exports.updateCard = async (req , res) => {
    try {
        const listId = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);
        const cardName = req.body.name
    } catch (error) {
        res.status(500).json({error: 'Failed to update cards.' });
    }
}

exports.deleteCard = async(req , res) => {
    try {
        const listId = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);
    } catch (error) {
        res.status(500).json({error: 'Failed to delete cards.' });
    }
}

