import React, { useEffect, useState } from 'react';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import styled from 'styled-components';


export default function ChatInput({ handleSendMsg }) {
    const [showEmojiPicker, setshowEmojiPicker] = useState(false);
    const [msg, setmsg] = useState("");
    const handleEmojiPicker = () => {
        setshowEmojiPicker(!showEmojiPicker);
    }
    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += emoji.emoji;
        setmsg(message);
    }
    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setmsg('');
        }
    }
    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPicker} />
                    {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <form className="input-container">
                <input type="text" placeholder='Type your message here' value={msg} onChange={(e) => { setmsg(e.target.value) }} />
                <button onClick={(e) => { sendChat(e) }} className="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
display:grid;
grid-template-columns:5% 95%;
background-color:#080429;
padding 0 2rem;
@media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
.button-container{
    display:flex;
    align-items:center;
    color:white;
    gap:1rem;
    .emoji{
        position:relative;
        svg{
            font-size:1.5rem;
            color:#ffff00c8;
            cursor:pointer;
        }
        .emoji-picker-react{
            position:absolute;
            top:-350px;
            background-color:#080420;
            box-shadow:0 5px 10px #9a86f3;
            border-color:#9a86f3;
            .emoji-scroll-wrapper::-webkit-scrollbar{
                background-color:#080420;
                width:5px;
                &-thumb{
                    background-color:#9186f3;
                }
            }
            .emoji-categories{
                button{
                    filter:contrast(0);
                }
            }
            .emoji-search{
                background-color:transparent;
                border-color:#9a86f3;
            }
            .emoji-search:before{
                background-color:#080420;
            }
            .emoji-group:before{
                background-color: #080420;
            }
        }
    }
}
.input-container{
    width : 100%;
    height:77%;
    border-radius:2rem;
    display:flex;
    align-items:center;
    gap:2rem;
    background-color:#ffffff34;
    margin-top:0.4rem;
    @media screen and (min-width: 720px) and (max-width: 1080px){
        height:42%;
        margin-top:1.1rem;
    }
    input{
        width:90%;
        height:60%;
        background-color:transparent;
        color:white;
        border:none;
        outline:none;
        padding-left:1rem;
        font-size:1rem;
        &::selection{
            background-color:#9186f3;
            border:none;
        }
        &::focus{
            outline:none;
        }
    }
    button{
        padding:0.3rem 2rem;
        border-radius:2rem;
        display:flex;
        align-items:center;
        justify:content:center;
        background-color:#9a86f3;
        border:none;
        font-size:2rem;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
            padding: 0.3rem 1rem;
            svg {
              font-size: 1rem;
            }
          }
        }
        svg {
            font-size: 2rem;
            color: white;
          }
    }
`;