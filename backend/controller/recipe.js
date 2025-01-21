const Recipes = require("../models/recipe");

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipes.find();
    return res.json(recipes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching recipes", error: error.message });
  }
};

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

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  if (!title || !ingredients || !instructions) {
    return res.status(400).json({ message: "Required fields can't be empty" });
  }

  try {
    const newRecipe = await Recipes.create({
      title,
      ingredients,
      instructions,
      time
    });
    return res.status(201).json(newRecipe); // Send back the created recipe
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating recipe", error: error.message });
  }
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;

  try {
    let recipe = await Recipes.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Update the recipe with new data
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions, time },
      { new: true }
    );
    
    return res.json(updatedRecipe);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error updating recipe", error: err.message });
  }
};

const deleteRecipe = (req, res) => {
  res.json({ message: "hello" });
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe };
