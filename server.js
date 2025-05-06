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

// GET list with all cards
app.get('/api/v3/lists/:id' , async (req , res) => {
    try {
        const list_id = parseInt(req.params.id);
        const myList = await prisma.list.findUnique(
            {
                where: { id: list_id },
                include: {
                    cards : true
                }
            });
        if (!myList) return res.status(404).send('Not found');
        res.json(myList);
    } catch (err) {
        res.status(500).send('Error fetching lists ');
    }
});

// GET get cards of spec list
app.get('/api/v3/lists/:id/cards' , async (req , res) => {
    try {
        const list_id = parseInt(req.params.id);
        const myList = await prisma.list.findUnique(
            {
                where: { id: list_id },
                include: {
                    cards : true
                }
            });
        if (!myList) return res.status(404).send('Not found');

        res.json(myList.cards);
    } catch (err) {
        res.status(500).send('Error fetching lists ');
    }
});

app.get('/api/v3/cards' , async (req , res) => {
    try {
        const allCards = await prisma.card.findMany({});
        res.json(allCards);
    } catch (err) {
        res.status(500).send('Error fetching lists ');
    }
});

app.get('/api/v3/cards/:id' , async (req , res) => {
    try {
        const allCards = await prisma.card.findUnique({
            where : {
                id : parseInt(req.params.id)
            }
        });
        if (!allCards) return res.status(404).send('Not found');
        res.json(allCards);
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

app.patch('/api/v3/lists/:id' ,  async (req, res) => {
    try {
        const list_id = parseInt(req.params.id);
        const name = req.body.name


        const myList = await prisma.list.findUnique(
            {
                where: { id: list_id },
            });
        if (!myList) return res.status(404).send('Not found');

        const updatedList = await prisma.list.update({
            where : {
                id : list_id
            },
            data : {
                name
            }
        })

        res.json(updatedList);
    } catch (err) {
        res.status(500).send('Error fetching lists');
    }
})
app.patch('/api/v3/lists/:id/cards/:card_id' ,  async (req, res) => {
    try {
        const list_id = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);
        const newName = req.body.name


        const myCard = await prisma.card.findUnique(
            {
                where: { id: cardId , listId : list_id },
            });
        if (!myCard) return res.status(404).send('Not found');

        const updatedCard = await prisma.card.update(
            {
                where: {
                    id: cardId ,
                    listId : list_id
                }, data : {
                    name : newName
                }
            });

        // const result = await prisma.$executeRaw`UPDATE Card SET name = ${newName} WHERE id = ${cardId} AND listId = ${list_id}`;

        res.json(updatedCard);

    } catch (err) {
        res.status(500).send(err);
    }
})


app.delete('/api/v3/lists/:id' ,  async (req, res) => {

    try {
        const list_id = parseInt(req.params.id);

        const myList = await prisma.list.findUnique(
            {
                where: { id: list_id },
            });
        if (!myList) return res.status(404).send('Not found');
        const deletedList = await prisma.list.delete({
            where: {
                id: list_id,
            }
        });
        res.json(deletedList);
    } catch (err) {
        res.status(500).send('Error fetching lists');
    }
})

app.delete('/api/v3/lists/:id/cards/:card_id' ,  async (req, res) => {
    try {
        const list_id = parseInt(req.params.id);
        const cardId = parseInt(req.params.card_id);



        const myCard = await prisma.card.findUnique(
            {
                where: { id: cardId , listId : list_id },
            });
        if (!myCard) return res.status(404).send('Not found');

        const deletedCard = await prisma.card.delete(
            {
                where: {
                    id: cardId ,
                    listId : list_id
                }
            });

        res.json(deletedCard);

    } catch (err) {
        res.status(500).send(err);
    }
})

app.delete('/api/v3/cards/:id/' ,  async (req, res) => {
    try {

        const cardId = parseInt(req.params.id);



        const myCard = await prisma.card.findUnique(
            {
                where: { id: cardId , listId : list_id },
            });
        if (!myCard) return res.status(404).send('Not found');

        const deletedCard = await prisma.card.delete(
            {
                where: {
                    id: cardId ,
                }
            });

        res.json(deletedCard);

    } catch (err) {
        res.status(500).send(err);
    }
})



app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});