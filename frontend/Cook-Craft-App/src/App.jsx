import React from 'react'
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./pages/Home";
import MainNavigation from './components/MainNavigation';
import axios from 'axios';

const getAllRecipes=async()=>{
  let allRecipes=[]
  await axios.get()
}

const router=createBrowserRouter([
    {path:"/",element:<MainNavigation/>,children:[
      {path:"/",element:<Home/>},
    ]}
    
   
  ]
 
)

export default function App() {
  return (
   <>
   <RouterProvider router={router}></RouterProvider>
   </>
  )
}





