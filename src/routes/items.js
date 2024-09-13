const express = require('express');
const Item = require('../config/database');

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find({});
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, text } = req.body;
    const newItem = new Item({ title, text });
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/update/:id", async (req, res) => {
  try {
    const { text } = req.body;
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, { text }, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
