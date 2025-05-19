const express = require('express');
const cors = require('cors');
const listRouter = require('./routes/listRouter')
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/api/v3/lists', listRouter);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});