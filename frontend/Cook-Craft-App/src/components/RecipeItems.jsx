import React, { useState } from 'react'; // Import useState

export default function RecipeItems() {
  const [allRecipes, setAllRecipes] = useState([]);

  return (
    <div>
      <h2>Recipe Items</h2>
      {/* Render the recipe items */}
      <ul>
        {allRecipes.length > 0 ? (
          allRecipes.map((recipe, index) => (
            <li key={index}>{recipe.name}</li> // Adjust this to match your recipe structure
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </ul>
    </div>
  );
}
