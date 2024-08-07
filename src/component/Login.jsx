import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Login = () => {

    const initialValues = {
        email : "",
        phonenumber : "",
        password : "",
      }
    
    const [formValues, setFormValues] = useState(initialValues);
     const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
        // console.log(formValues)
    }

    const url = "http://localhost:5001/api/v1/login"

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsSubmit(true);


        try {
          const response = await axios.post(url, {
          
          password: formValues.password,
            detail: formValues.email|| formValues.phonenumber,
           
          });
    
          if (response.data.message){
            const emma = response.data.message
        alert(emma);
        };
        
      } catch (error) {
        // console.log(({error: error.message}))
        // console.log('error', error?.message);
        if (error.response){
          alert( error.response.data.message);
          console.log( error.response.status);
        }
      }
      };
    

  return (
    <>
        <div className='Login'>
            <form >
                    <h1>Login</h1>
                    <div className='divider'></div>

                    <div className='theform'>
                        <div className="field">
                            <label>email or phone number</label>
                            <input 
                            type='text' 
                            name='phonenumber' 
                            placeholder='email or phone number'
                            value={ formValues.phonenumber }
                            onChange={ handleChange }  
                            />
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input 
                            type='password' 
                            name='password' 
                            placeholder='password'
                            value={ formValues.password }
                            onChange={ handleChange }  
                            />
                        </div>
                        
                        <button className='submitbtn' onClick={handleSubmit}>Submit</button>
                    </div>
                    <p>Don't have an Account?<Link to="/" className='thelink'>Register</Link></p>
                </form>

        </div>
    </>
  )
}

export default Login
