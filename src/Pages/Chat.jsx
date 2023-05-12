import React from 'react'
import styled from 'styled-components'
import { useState, useEffect,useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contacts from '../Components/Contacts';
import Welcome from '../Components/Welcome';
import Chatcontainer from '../Components/Chatcontainer';
import {io} from 'socket.io-client';
import { host } from '../constants';


export default function Chat() {
  const socket = useRef();
  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const navigate = useNavigate();
  const toastoption = {
    position: 'bottom-right',
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  };
  useEffect(() => {
    async function getcurrent() {
      if (localStorage.getItem("chat-app-user") === null) {
        navigate("/");
      }
      else {
        setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    getcurrent();
  }, [])

useEffect(() => {
  if(currentUser){
    socket.current=io(host);
    socket.current.emit("add-user", currentUser._id);
  }
}, [currentUser])


  useEffect(() => {
    async function getcontacts() {
      if (currentUser) {
        if (currentUser.isimageset === true) {
          try {
            const response = await fetch(`${host}/auth/getusers/${currentUser.email}`, {
              method: 'GET',
              mode: 'cors',
              headers: {
              },
              body: JSON.stringify()
            }).then(async function (response) {
              if (response.status !== 200) {
                toast.error("Internal error occured.", toastoption);
              }
              else {
                const json = await response.json();
                setcontacts(json);
              }
            });
          } catch (error) {
            toast.error("Some internal error occured.", toastoption);
            console.log(error.message);
          }
        } else {
          navigate("/setavatar");
        }
      }
    }
    getcontacts();
  }, [currentUser])
  const handleChatChange = (chat) => {
    setcurrentChat(chat);
  }
  return (
    <Container>
      <div className="container">
        {
          currentUser !== undefined ? <Contacts contacts={contacts} currentuser={currentUser} changeChat={handleChatChange} /> : ""
        }
        {
          currentChat === undefined ? currentUser !== undefined ? <Welcome currentuser={currentUser} /> : "" : <Chatcontainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        }
      </div>
      <ToastContainer />
    </Container>
  )
}

const Container = styled.div`
height:100vh;
width:100vw;
display:flex;
flex-dirction:column;
justify-content:center;
align-items:center;
gap:1rem;
background-color:#131324;
.container{
  height:85vh;
  width:85vw;
  background-color:#00000076;
  display:grid;
  grid-template-columns:25% 75%;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
}
`;