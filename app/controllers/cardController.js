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
        if(!myCard) res.status(404).json({error: 'Failed to find card.'});
        else res.json(myCard);

    } catch (error) {
        res.status(500).json({error: 'Failed to creating cards.' });
    }
}

exports.updateCard = async (req , res) => {
    try {
        const listId = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);
        const cardName = req.body.name

        const updatedCard = await cardActions.updateCardOfList(listId,cardId,cardName);
        if(!updatedCard) res.status(404).json({error: 'Failed to update card.'});
        else res.json(updatedCard);

    } catch (error) {
        res.status(500).json({error: 'Failed to update cards.' });
    }
}

exports.deleteCard = async(req , res) => {
    try {
        const listId = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);
        const deletedCard = await cardActions.deleteCardOfList(listId, cardId);
        if(!deletedCard) res.status(404).json({error: 'Failed to update card.'});
        else res.json(deletedCard);
    } catch (error) {
        res.status(500).json({error: 'Failed to delete cards.' });
    }
}

