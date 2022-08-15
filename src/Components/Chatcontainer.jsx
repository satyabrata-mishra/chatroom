import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChatInput from './ChatInput';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Chatcontainer({ currentChat, currentUser, socket }) {
    const host = "https://chatroombe.herokuapp.com";
    const [messages, setmessages] = useState([]);
    const [arrivalMessage, setarrivalMessage] = useState(null);
    const scrollRef = useRef();
    const toastoption = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    useEffect(() => {
        scrollRef.current?.scrollIntoView();
    }, [messages]);

    useEffect(() => {
        async function change() {
            try {
                const response = await fetch(`${host}/chat/getmsg`, {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ from: currentUser._id, to: currentChat._id })
                }).then(async function (response) {
                    if (response.status !== 200) {
                        toast.error("Message not displayed", toastoption);
                    }
                    else {
                        const json = await response.json();
                        setmessages(json);
                    }
                });
            } catch (error) {
                console.log(error.message);
                toast.error("Some internal error occured.", toastoption);
            }
        }
        change();
    }, [currentChat])

    const handleSendMsg = async (msg) => {
        try {
            const response = await fetch(`${host}/chat/addmsg`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ from: currentUser._id, to: currentChat._id, message: msg })
            }).then(async function (response) {
                if (response.status !== 200) {
                    toast.error("Mesage not added", toastoption);
                }
                else {
                    const json = await response.json();
                }
            });
        } catch (error) {
            toast.error("Some internal error occured.", toastoption);
        }
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setmessages(msgs);
    };
    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve",(msg)=>{
                setarrivalMessage({fromSelf:false,message:msg});
            });
        }
    }, [])
    useEffect(() => {
        arrivalMessage && setmessages((prev)=>[...prev,arrivalMessage]);
    }, [arrivalMessage])
    
    return (
        <Container>
            <div className="chat-header">
                <div className="user-details">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentChat.image}`} alt="" />
                    </div>
                    <div className="username">
                        <h3>{currentChat.name}</h3>
                    </div>
                </div>
            </div>
            <div className="chat-messages">
                {
                    messages.map((message, index) => {
                        return (
                            <div ref={scrollRef} key={index}
                                className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                                <div className="content ">
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
            <ToastContainer />
        </Container>
    )
}
const Container = styled.div`
padding-top:1rem;
display:grid;
grid-template-rows:10% 78% 12%;
overflow:hidden;
@media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
.chat-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details{
        display:flex;
        align-items:center;
        gap:1rem;
        .avatar{
            img{
                height:3rem;
            }
        }
        .username{
            h3{
                color:white;
            }
        }
    }
}
.chat-messages{
    padding:1rem 2rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    overflow:auto;
    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width:0.1rem;
            border-radius:1rem;
        }
    }
    .message{
        display:flex;
        align-items:center;
        .content{
            max-width:40%;
            overflow-wrap:break-word;
            padding:1rem;
            font-size:1.1rem;
            border-radius:1rem;
            color:#d1d1d1;
            @media screen and (min-width: 720px) and (max-width: 1080px) {
                max-width: 70%;
              }
        }
    }
}
.sended {
    justify-content: flex-end;
    .content {
      background-color: #4f04ff21;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: #9900ff20;
    }
  }
`;