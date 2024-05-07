// src/controllers/itemController.js

const connection = require('../config/db');

// Récupérer tous les éléments
exports.getAllItems = async (req, res) => {
    try {
        const results = await connection.query('SELECT * FROM items');
        res.json(results[0]);
    } catch (error) {
        console.error('Error fetching all items:', error);
        res.status(500).json({ error: 'An error occurred while fetching items' });
    }
};

// Récupérer un élément par son ID
exports.getItemById = async (req, res) => {
    const itemId = req.params.id;
    try {
        const results = await connection.query('SELECT * FROM items WHERE id = ?', [itemId]);
        res.json(results[0][0]);
    } catch (error) {
        console.error('Error fetching item by ID:', error);
        res.status(500).json({ error: 'An error occurred while fetching item by ID' });
    }
};

// Créer un nouvel élément
exports.createItem = async (req, res) => {
    const newItem = req.body;
    try {
        await connection.query('INSERT INTO items SET ?', newItem);
        res.status(201).send('Item added successfully.');
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'An error occurred while creating item' });
    }
};

// Mettre à jour un élément existant
exports.updateItem = async (req, res) => {
    const itemId = req.params.id;
    const updatedItem = req.body;
    try {
        await connection.query('UPDATE items SET ? WHERE id = ?', [updatedItem, itemId]);
        res.send('Item updated successfully.');
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ error: 'An error occurred while updating item' });
    }
};

// Supprimer un élément existant
exports.deleteItem = async (req, res) => {
    const itemId = req.params.id;
    try {
        await connection.query('DELETE FROM items WHERE id = ?', [itemId]);
        res.send('Item deleted successfully.');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ error: 'An error occurred while deleting item' });
    }
};
