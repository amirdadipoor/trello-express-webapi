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
        const id = parseInt(req.params.id)
        const itemList = await listActions.getListById(id)
        if (!itemList) return res.status(404).json({error: 'Failed to find list.' });
        res.json(itemList);
    } catch (error) {
        res.status(500).json({error: 'Failed to create list.' });
    }
}

exports.updateList = async (req , req) => {
    try {
        const id = parseInt(req.params.id)
        const data = {name : req.body.name};
        const result = await listActions.updateList(id , data);
        if (!result) return res.status(404).json({error: 'Failed to update list.' });

        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Failed to create list.' });
    }
}

exports.deleteList = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await listActions.deleteList(id);
        if (!result) return res.status(404).json({error: 'Failed to delete list.' });
        res.json(result);
    } catch (error) {
        res.status(500).json({error: 'Failed to create list.' });
    }
}