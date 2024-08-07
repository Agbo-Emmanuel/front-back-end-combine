import React from 'react';
import Register from './Register';
import Login from './Login';


import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


  const router = createBrowserRouter([

        {
            path: "/",
            element:  <Register/>
        },
        {
            path: "/Login",
            element: <Login/>
        },

      ]);




const Mypage = () => {
   
  return (
    
    <>
    
        <RouterProvider router={router} />
    
    </>
  )
}


export default Mypage