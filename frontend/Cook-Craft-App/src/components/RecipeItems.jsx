import React, { useState } from 'react'; // Import useState
import foodImg from '../assets/download.jpeg'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
export default function RecipeItems() {
  const [allRecipes, setAllRecipes] = useState([]);

  return (
    <>
        <div className='card-container'>
            {
                allRecipes?.map((item, index) => {
                    return (
                        <div key={index} className='card'>
                            <img src={foodImg} width="120px" height="100px"></img>
                            <div className='card-body'>
                                <div className='title'>{item.title}</div>
                                <div className='icons'>
                                    <div className='timer'><BsStopwatchFill/>30min</div>
                                    <FaHeart/>
                                       
                        
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
);
}
