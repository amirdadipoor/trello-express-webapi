const express = require('express')
const prisma = require('./mydb');
const app = express()
const port = 80

app.use(express.json());

// GET all items
app.get('/api/v3/lists' , async (req , res) => {
    try {

        const itemList = await prisma.list.findMany({
            include: {
                Cards : true
            }
        })
        res.json(itemList);

    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching lists ');
    }
})



app.get('/items/:id/children', async (req, res) => {
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
});

app.listen(port, () => {
    console.log('Server running at http://localhost:3000');
});