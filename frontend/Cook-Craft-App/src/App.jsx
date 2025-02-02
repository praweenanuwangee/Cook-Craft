import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home";
import MainNavigation from './components/MainNavigation';
import AddFoodRecipe from "./pages/AddFoodRecipe"; // Import the missing component
import axios from 'axios';

// Function to get all recipes (Fixed)
const getAllRecipes = async () => {
  try {
    const res = await axios.get('http://localhost:5000/recipe');
    return res.data; // Ensure this returns the response data
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return []; // Return an empty array in case of an error
  }
};

// Define Router (Fixed structure)
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />, // Ensure MainNavigation contains <Outlet />
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home /> },
      { path: "/favRecipe", element: <Home /> },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
    ]
  }
]);

// App Component
export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
