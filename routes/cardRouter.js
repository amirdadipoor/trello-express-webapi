const express = require('express');
const router = express.Router({ mergeParams: true });
const cardController = require('./../app/controllers/cardController');

// GET get all cards
router.get('/' , cardController.getAllCards);

// GET get card by id
router.get('/:card_id', cardController.getCardById);

// POST create new card for list
router.post('/', cardController.createCard);

// PUT update card
router.put('/:card_id', cardController.updateCard);

// DELETE delete card
router.delete('/:card_id', cardController.deleteCard);


module.exports = router;
