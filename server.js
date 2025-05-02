
const express = require('express')
const app = express()
const port = 4070
const sequelize = require('./db');
const List = require('./models/List');
const Card = require('./models/Card');



// Sync all models
sequelize.sync({ alter: true }).then(() => {
    console.log('All tables created and relationships established!');
});

// Middleware to parse JSON
app.use(express.json());

// simple list
let simpleList = [
    {id : 1 , name: "برنامه ریزی شده" , cards : []} ,
    {id : 2 , name: "در حال انجام" , cards : [{id : 1 , name : "گزارش" } , {id : 2 , name : "کد نویسی"} , {id : 3 , name : "دیباگ"} , {id:4 , name : "دیپلوی"}]} ,
];

// get all items
app.get('/api/lists', (req, res) => {
    res.json(simpleList);
})

app.get('/api/v2/lists', async (req, res) => {
    const itemList = await List.findAll({
        include: {
            model: Card
        }
    });
    res.json(itemList);
})

// GET item by ID
app.get('/api/list/:id', (req, res) => {
    const item = simpleList.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Not found');
    res.json(item);
});

// Get Card by item and id
app.get('/api/list/:list_id/card/:card_id', (req, res) => {
    const list = simpleList.find(i => i.id === parseInt(req.params.list_id));
    if (!list) return res.status(404).send('Not found');
    const card = list.cards.find(i => i.id === parseInt(req.params.card_id));
    if (!card) return res.status(404).send('Not found');
    res.json(card);
})

// Post Add New Card Over spec list
app.post('/api/list/:list_id/card/', (req, res) => {
    const index = simpleList.findIndex(list => list.id === parseInt(req.params.list_id))
    if (index < 0) return res.status(404).send('Not found');

    const newCard = {
        id: simpleList[index].cards.length + 1,
        name: req.body.card_name,
    };
    simpleList[index].cards.push(newCard)  ;
    res.json(newCard);
})

// POST create new list
app.post('/api/lists', (req, res) => {
    if(!req.body.name) return res.status(404).send('Not found');
    const newItem = {
        id: simpleList.length + 1,
        name: req.body.name,
        cards: []
    };
    simpleList.push(newItem);
    res.status(201).json(newItem);
});

// PUT update list
app.put('/api/list/:id', (req, res) => {
    const index = simpleList.findIndex(list => list.id === parseInt(req.params.id))
    if (index < 0) return res.status(404).send('Not found');

    simpleList[index].name = req.body.name;
    res.json(simpleList[index]);
});

app.put('/api/list/:list_id/card/:card_id', (req, res) => {
    const list_index = simpleList.findIndex(list => list.id === parseInt(req.params.list_id ));
    if (list_index < 0) return res.status(404).send('Not found');

    const card_index = simpleList[list_index].cards.findIndex(card => card.id === parseInt(req.params.card_id ));
    if (card_index < 0) return res.status(404).send('Not found');

    simpleList[list_index].cards[card_index].name = req.body.name;
    res.json(simpleList[list_index].cards[card_index]);
})

// DELETE list
app.delete('/api/list/:id', (req, res) => {
    simpleList = simpleList.filter(i => i.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.delete('/api/list/:list_id/card/:card_id', (req, res) => {
    const list_index = simpleList.findIndex(list => list.id === parseInt(req.params.list_id ));
    if (list_index < 0) return res.status(404).send('Not found');

    const card_index = simpleList[list_index].cards.findIndex(card => card.id === parseInt(req.params.card_id ));
    if (card_index < 0) return res.status(404).send('Not found');

    simpleList[list_index].cards.splice(card_index, 1);

    res.json(simpleList).status(204).send();
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})