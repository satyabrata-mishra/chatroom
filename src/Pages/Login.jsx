import * as EmailValidator from 'email-validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import logo from '../Assests/logo.png';

export default function Login() {
  const host = "https://chatroombe.herokuapp.com";
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate('/chat');
    }
  }, []);
  const [values, setvalues] = useState({
    email: "",
    password: ""
  });
  const toastoption = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  const handlevalidations = () => {
    if (values.email === "") {
      toast.error("Email cannot be blank.", toastoption);
      return false;
    } else if (!EmailValidator.validate(values.email)) {
      toast.error("Enter a valid email.", toastoption);
      return false;
    }
    return true;
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (handlevalidations()) {
      try {
        const response = await fetch(`${host}/auth/login`, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: values.email, password: values.password })
        }).then(async function (response) {
          if (response.status !== 200) {
            toast.error("Wrong credentials.", toastoption);
          }
          else {
            const json = await response.json();
            toast.success("Login sucessful.", toastoption);
            navigate('/chat');
            localStorage.setItem("chat-app-user", JSON.stringify(json));
          }
        });
      } catch (error) {
        toast.error("Some internal error occured..", toastoption);
      }
    }
  }
  const handlechange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  }
  return (
    <div>
      <FormContainer>
        <form onSubmit={handlesubmit} >
          <div className="brand">
            <img src={logo} alt="" />
            <h1>CHATROOM</h1>
          </div>
          <input autoComplete='true' type="email" placeholder="Email" name="email" onChange={handlechange} />
          <input autoComplete='true' type="password" placeholder="Password" name="password" onChange={handlechange} />
          <button type='submit'>Login</button>
          <span>New to CHATROOM ? <Link to="/register">Create Account</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </div>
  )
}

const FormContainer = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
background-color:#131324;
min-height:100vh;
.brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }
.brand img{
    height: 7rem;
    width:7rem;
  }
  h1{
    position:relative;
    right:1.5rem;
    color:white;
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #00000076;
    padding: 1.43rem 3rem;
    border-radius:1rem;
  }
  input{
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
  }
  input:focus{
    border: 0.1rem solid #997af0;
    outline: none;
  }
  button{
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight:bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
  }
  button:hover{
    background-color: #4e0eff;
  }
  span{
    color: white;
    text-transform: uppercase;
  }
  a{
    color: #4e0eff;
    text-decoration: none;
    font-weight: bold;
  }
`;