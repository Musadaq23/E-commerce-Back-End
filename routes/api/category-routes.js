const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories and include their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: { model: Product }
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single category by ID and include its associated products
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: { model: Product }
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with that ID.' });
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(201).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a category by ID
router.put('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'No category found with that ID.' });
    } else {
      const updatedCategory = await category.update(req.body);
      res.status(200).json(updatedCategory);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      res.status(404).json({ message: 'No category found with that ID.' });
    } else {
      await category.destroy();
      res.status(200).json({ message: 'Category deleted.' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;