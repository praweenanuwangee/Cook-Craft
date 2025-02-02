const Recipes = require("../models/recipe");
const multer = require('multer');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images'); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname; // Use the original file name
    cb(null, filename);
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Get all recipes
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

// Get a single recipe by ID
const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching recipe", error: error.message });
  }
};

// Add a new recipe (with optional image upload)
const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  try {
    const newRecipe = new Recipes({
      title,
      ingredients,
      instructions,
      time,
      image: req.file ? req.file.filename : null // Store the image filename if uploaded
    });

    await newRecipe.save();
    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating recipe", error: error.message });
  }
};

// Edit a recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  try {
    let recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update the recipe with new data
    recipe.title = title || recipe.title;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;
    recipe.time = time || recipe.time;

    if (req.file) {
      recipe.image = req.file.filename; // Update image if a new one is uploaded
    }

    await recipe.save();
    return res.json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating recipe", error: err.message });
  }
};

// Delete a recipe
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    await Recipes.findByIdAndDelete(req.params.id);
    return res.json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error deleting recipe", error: error.message });
  }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload };
