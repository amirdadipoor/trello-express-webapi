const express = require('express');
const router = express.Router();
const listController = require('./../app/controllers/listController')

// GET get all lists (With cards)
router.get('/' , listController.getAllLists());

// POST create new list
router.post('/' , listController.createList());

// GET get list by id (With Cards)
router.get('/:id', listController.getListById());

// PUT update list name by id
router.put('/:id' , listController.updateList());

// DELETE delete list with all cards
router.delete('/:id' , listController.deleteList());
