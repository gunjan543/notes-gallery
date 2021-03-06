import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import {isAuth} from "../../helpers/auth";
import axios from 'axios';
import {Redirect} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import Navbar from '../../components/navbar'

const Register = (history) => {

    const [formData, setFormData] = useState({

        name:"",
        email:"",
        password1:"",
        password2:"",
    });
    const {email,name,password1, password2} = formData

    const handleChange = text => e => {
        
        setFormData({ ...formData, [text]: e.target.value });
      };
   
    const handleSubmit = e => {
        e.preventDefault();
        if (name && email && password1) {
          if (password1 === password2) {
            setFormData({ ...formData });
            axios
              .post( `/api/register`, {
                name,
                email,
                password: password1
              })
              .then(res => {
                setFormData({
                  ...formData,
                  name: '',
                  email: '',
                  password1: '',
                  password2: ''
                  
                }
                );
                
                toast.success(res.data.message);
                
              })
              .catch(err => {
                setFormData({
                  ...formData,
                  name: '',
                  email: '',
                  password1: '',
                  password2: ''
                  
                });
                console.log(err);
                toast.error(err.response.data.errors);
              });
          } else {
            toast.error("Passwords don't match");
           
          }
        } else {
          toast.error('Please fill all fields');
        }
      };

    return ( 
     
        <div className="Signup">
        { isAuth()?<Redirect to = '/profile' />:null }
        <Navbar></Navbar>
        <ToastContainer/>
            
            <h1>Sign Up to Notes Gallery</h1>
            <p>Already have an account? <a href="/login">Log In</a></p>
            
            <div className="wrap">
            <div className="box">
            <form onSubmit={handleSubmit}>
                 <div>
                    <input type="text" 
                    onChange = {handleChange('name')} 
                    value={name}
                    required/>
                    <label>Name</label>
                </div>
                <div>
                    <input type="email" 
                    onChange = {handleChange('email')} 
                    value={email}
                    required/>
                    <label>Email</label>
                </div>
                <div>
                    <input type="password" required 
                    onChange = {handleChange('password1')} 
                    value={password1}                    
                    />
                    <label>Password</label>
                </div>
                <div>
                    <input type="password" 
                    onChange = {handleChange('password2')} 
                    value={password2}                 
                    required />
                    <label>Confirm Password</label>
                </div>
                <input type="submit" name="Signup" value="submit" />
            </form>
            </div>
            
        </div>
        </div>
     );
}
 
export default Register;