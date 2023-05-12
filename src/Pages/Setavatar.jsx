import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loader from '../Assests/loader.gif';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Buffer } from "buffer";
import { host } from '../constants';


export default function Setavatar() {
  const navigate = useNavigate();
  const api = "https://api.multiavatar.com/SV6GdPaMpYzWCw";
  const [avatars, setavatars] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const toastoption = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  const setprofilepicture = async (e) => {
    e.preventDefault();
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar.", toastoption);
    }
    else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      try {
        const response = await fetch(`${host}/auth/updateuser/${user.email}`, {
          method: 'PATCH',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ "isimageset": true, "image": avatars[selectedAvatar] })
        }).then(async function (response) {
          if (response.status !== 200) {
            toast.error("Some internal error occured.", toastoption);
          }
          else {
            const json = await response.json();
            navigate('/chat');
            localStorage.setItem("chat-app-user", JSON.stringify(json));
            toast.success("Avatar updated.", toastoption);
          }
        });
      } catch (error) {
        toast.error("Some internal error occured.", toastoption);
      }
    }
  };


  useEffect(() => {
    async function fetchAPI() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setavatars(data);
      setisLoading(false);
    }
    fetchAPI();
  }, []);
  return (
    <div>
      {
        isLoading ? <FormContainer>
          <img className='loader' src={loader} alt="Loader" />
        </FormContainer> :
          <FormContainer>
            <div className="title-container">
              <h1>Pick an avatar as your profile picture.</h1>
            </div>
            <div className="avatars">
              {avatars.map((ava, ind) => {
                return (<div key={ind} className={`avatar ${selectedAvatar === ind ? "selected" : ""}`}>
                  <img src={`data:image/svg+xml;base64,${ava}`} alt="" onClick={() => setselectedAvatar(ind)} />
                </div>);
              })}
            </div>
            <button className='submit-btn' onClick={setprofilepicture}>Set as profile picture.</button>
          </FormContainer>
      }
      <ToastContainer />
    </div>
  )
}

const FormContainer = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
gap:3rem;
background-color:#131324;
height:100vh;
width:100vw;
.loader {
  max-inline-size: 100%;
}
.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;
  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 0.5s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: lightpink;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;
}
  .submit-btn:hover{
    background-color: #4e0eff;
  }
`;