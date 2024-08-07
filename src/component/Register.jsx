
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"

const Register = () => {

    const initialValues = {
        name : "",
        email : "",
        address : "",
        state : "",
        country : "",
        dateofbirth : "",
        phonenumber : "",
        password : "",
      }
    
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
     const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
        // console.log(formValues)
    }
    const url = "http://localhost:5001/api/v1/signup"

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
  
      try {
        const vals = {
          fullName: formValues.name,
          address: formValues.address,
          state: formValues.state,
          country: formValues.country,
          DOB: formValues.dateofbirth,
          password: formValues.password,
          email: formValues.email,
          phoneNumber: formValues.phonenumber,
        }
        const response = await axios.post(url, vals);
  
        if (response?.data?.message){
            const emma = response?.data?.message
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

    const validate = (values)=>{
        const errors = {};
        const corremail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const correname = /^[a-z ,.'-]+$/i
        const correaddress = /^[a-zA-Z0-9\s,'-]*$/
        
        if ( !values.name ) {
          errors.name = "Name is required!"
        }else if (!correname.test(values.name)) {
            errors.name = "invalid name format"
        }
        if ( !values.email ) {
          errors.email = "email is required!"
        } else if (!corremail.test(values.email)) {
          errors.email = "This is not a valid email format!"
        }
        if ( !values.address ) {
          errors.address = "address is required!"
        }else if (!correaddress.test(values.address)) {
            errors.address = "invalid address format"
        }
        if ( !values.state ) {
          errors.state = "state is required!"
        }
        if ( !values.country ) {
          errors.country = "country is required!"
        }
        if ( !values.dateofbirth ) {
          errors.dateofbirth = "dateofbirth is required!"
        }
        if ( !values.phonenumber ) {
          errors.phonenumber = "phonenumber is required!"
        }
        if ( !values.password ) {
          errors.password = "password is required!"
        } else if ( values.password.length < 8) {
            errors.password = "password should not be less than 8 characters!"
          } 
    
        return errors;
      }
    

  return (
    <>
        <div className='Register'>
            <form >
                <h1>Register</h1>
                <div className='divider'></div>

                <div className='theform'>
                    <div className="field">
                        <label>Name</label>
                        <input 
                        type='text' 
                        name='name' 
                        placeholder='name'
                        value={ formValues.name }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.name}</p>
                    </div>
                    
                    <div className="field">
                        <label>Email</label>
                        <input 
                        type='email' 
                        name='email' 
                        placeholder='email' 
                        value={ formValues.email }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.email}</p>

                    </div>
                    
                    <div className="field">
                        <label>Address</label>
                        <input 
                        type='address' 
                        name='address' 
                        placeholder='address' 
                        value={ formValues.address }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.address}</p>

                    </div>
                    <div className="field">
                        <label>State</label>
                        <input 
                        type='state' 
                        name='state' 
                        placeholder='state' 
                        value={ formValues.state }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.state}</p>

                    </div>
                    <div className="field">
                        <label>Country</label>
                        <input 
                        type='country' 
                        name='country' 
                        placeholder='country'
                        value={ formValues.country }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.country}</p>

                    </div>
                    <div className="field">
                        <label>date of birth</label>
                        <input 
                        type='date' 
                        name='dateofbirth'  
                        placeholder='date of birth'
                        value={ formValues.dateofbirth }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.dateofbirth}</p>

                    </div>
                    <div className="field">
                        <label>phone number</label>
                        <input  
                        name='phonenumber' 
                        type='text'
                        placeholder='phone number' 
                        value={ formValues.phonenumber }
                        onChange={ handleChange } 
                        />
                        <p>{ formErrors.phonenumber}</p>

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
                        {formErrors?<p>{ formErrors.password}</p>: null}

                    </div>
                    
                    <button className='submitbtn' onClick={handleSubmit}>Submit</button>
                </div>
                <p>Already have an Account?<Link to="/Login" className='thelink'>Login</Link></p>
            </form>
        </div>
    </>
  )
}

export default Register
