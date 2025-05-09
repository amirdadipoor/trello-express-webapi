const listActions = require('./../actions/listActions')

exports.getAllLists = async (req , res ) => {
    try {
        const lists = await listActions.fetchAllLists();
        res.json(lists);
    } catch (error) {
        res.status(500).json({error: 'Failed to retrieve lists.' });
    }
}

exports.createList = async (req , res) => {
    try {
        const data = { name : req.body.name};
        const newList = await listActions.createList(data);
        res.json(newList);
    } catch (error) {
        res.status(500).json({error: 'Failed to create list.' });
    }
}

exports.getListById = async (req , res) => {
    try {
        const data = { id: req.params.id };
        //const itemList = await
        if (!itemList) return res.status(404).send({error: 'Failed to find list.' });
    } catch (error) {
        res.status(500).json({error: 'Failed to create list.' });
    }
}

exports.updateList = (req , req) => {

}

exports.deleteList = (req , res) => {

}