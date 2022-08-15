import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logout from '../Components/Logout'


export default function Contacts({ contacts, currentuser, changeChat }) {
    const [currentUserName, setcurrentUserName] = useState(undefined);
    const [currentUserImage, setcurrentUserImage] = useState(undefined);
    const [currentSelected, setcurrentSelected] = useState(undefined);
    useEffect(() => {
        setcurrentUserImage(currentuser.image);
        setcurrentUserName(currentuser.name);
    }, [])
    const changeCurrentChat = (index, contact) => {
        setcurrentSelected(index);
        changeChat(contact);
    };
    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <Logout />
                            <h3>CHATROOM MEMBERS</h3>
                        </div>
                        <div className="contacts">
                            {contacts.map((contact, index) => {
                                return (
                                    <div onClick={() => { changeCurrentChat(index, contact) }} className={`contact ${index === currentSelected ? "selected" : ""}`} key={contact._id}>
                                        <img src={`data:image/svg+xml;base64,${contact.image}`} alt="" />
                                        <div className="username">
                                            <h3>{contact.name}</h3>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="currentuser">
                            <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="" />
                            <div className="username">
                                <h3>{currentUserName}</h3>
                            </div>
                        </div>
                    </Container>
                )
            }</>
    )
}
const Container = styled.div`
display:grid;
grid-template-rows:10% 75% 15%;
overflow:hidden;
background-color:#080420;
.brand{
    @media screen and (min-width: 720px) and (max-width: 1080px){
        font-size:0.75rem;
    }
    display:flex;
    align-items:center;
    justify-contenet:center;
    h3{
        color:white;
        text-transform:uppercase;

    }
}
.contacts{
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:auto;
    gap:0.8rem;
    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width:0.1rem;
            border-radius:1rem;
        }
    }
    .contact{
        background-color:#ffffff39;
        min-height:4.4rem;
        width:90%;
        cursor:pointer;
        border-radius:0.2rem;
        padding:0.4rem;
        gap:1rem;
        display:flex;
        align-items:center;
        font-size:0.9rem;
        transition: 0.5s ease-in-out;
        img{
            height:3rem;
        }
        h3{
            color:white;
        }
    }
    .selected{
        background-color:#9a86f3;
    }
}
.currentuser{
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img {
        height: 4rem;
    }
    .username {
      h3 {
        color: white;
      }
    }
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        gap: 0.5rem;
        .username {
          h3 {
            font-size: 1rem;
          }
        }
      }
 `;