import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({})
    const [error, setError] = useState("")  // Added to store error messages
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        let val = (e.target.name === "ingredients") ? e.target.value.split(",") : (e.target.name === "file") ? e.target.files[0] : e.target.value
        setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
    }

    const validateForm = () => {
        // Check if any required fields are empty
        if (!recipeData.title || !recipeData.time || !recipeData.ingredients.length || !recipeData.instructions || !recipeData.file) {
            setError("Please fill all the fields including the recipe image.")
            return false
        }

        // Time validation (e.g., it should not be empty and must match a basic time format like "30 minutes" or "1 hour")
        const timePattern = /^(\d+\s*(minute|hour)s?)$/i;
        if (!timePattern.test(recipeData.time)) {
            setError("Please enter a valid time format (e.g., '30 minutes' or '1 hour').")
            return false
        }

        // Reset error message if validation passes
        setError("")
        return true
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()

        // Validate the form before submitting
        if (!validateForm()) {
            return
        }

        console.log(recipeData)
        await axios.post("http://localhost:5000/recipe", recipeData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        })
            .then(() => navigate("/"))
            .catch((err) => setError("Error adding recipe: " + err.message))
    }

    return (
        <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="file" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Add Recipe</button>
                    {error && <div className="error-message">{error}</div>}  {/* Display error message */}
                </form>
            </div>
        </>
    )
}
