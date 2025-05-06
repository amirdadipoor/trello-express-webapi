const express = require('express')
const prisma = require('./db');
const app = express()
const PORT = process.env.PORT || 80;

app.use(express.json());

// GET all items
app.get('/api/v3/lists' , async (req , res) => {
    try {

        const itemList = await prisma.list.findMany({
            include: {
                cards : true
            }
        })
        res.json(itemList);

    } catch (err) {

        res.status(500).send('Error fetching lists ');
    }
})

// POST add new list
app.post('/api/v3/lists' , async (req , res) => {
    try {
        const list = await prisma.list.create({
            data : {
                name : req.body.name
            }
        });
        res.json(list);
    } catch (err) {
        res.status(500).send('Error fetching lists ');
    }
})

// POST add new card to list
app.post('/api/v3/lists/:id/cards', async (req, res) => {

    try {
        const list_id = parseInt(req.params.id);
        const myList = await prisma.list.findUnique(
            {
                where: { id: list_id },
            });
        if (!myList) return res.status(404).send('Not found');

        const myCard = await prisma.card.create({
            data : {
                name : req.body.name ,
                listId : list_id
            }
        })

        res.json(myCard);

    } catch (err) {
        res.status(500).send('Error fetching lists ');
    }
});


/*app.get('/items/:id/children', async (req, res) => {
    const children = await prisma.child.findMany({
        where: { itemId: parseInt(req.params.id) },
        include: {
            subchildren: true
        }
    });
    res.json(children);
});

// POST Create an item
app.post('/items', async (req, res) => {
    const item = await prisma.item.create({
        data: { name: req.body.name }
    });
    res.json(item);
});*/


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});