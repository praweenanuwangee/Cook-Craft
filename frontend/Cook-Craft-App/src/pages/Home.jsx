import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure this is imported
import foodRecipe from '../assets/Recipes.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeItems from '../components/RecipeItems';


export default function Home() {
    const navigate = useNavigate(); // Initialize navigate here
    const [isOpen, setIsOpen] = useState(false);

    const addRecipe = () => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate("/addRecipe"); // Navigate to the add recipe page
        } else {
            setIsOpen(true); // Open a modal or display an alert
        }
    };

    return (
        <>
            
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h4>Welcome to CookCraft! Your one-stop destination for exploring, creating, and sharing delicious recipes. Whether you're a seasoned chef or a home cook, CookCraft helps you discover new dishes, organize your favorite recipes, and bring out the best in your cooking journey. </h4>
                    
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} alt="Food Recipe" width="320px" height="300px" />
                </div>
            </section>
            <div className='bg'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#d4f6e8" fillOpacity="1" d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
                </svg>
            </div>
            

            <div className='recipe'>
                <RecipeItems/>
            </div>
        </>
    );
}
