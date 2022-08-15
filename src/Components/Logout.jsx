import React, { useState } from 'react';
import styled from 'styled-components';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


export default function Logout() {
    const [areYouSure, setareYouSure] = useState(false);
    const navigate = useNavigate();
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            height: '10rem',
            width: '30rem',
            borderRadius: '20px',
            fontSize: '1.5rem',
            backgroundColor: '#9a86f9',
            color: 'white',
            fontWeight: 'bold',
            display: 'inline',
            padding: '4rem 0 0 4rem',
            transition: '0.5s ease-in-out'
        },
    };
    const handleClick = () => {
        setareYouSure(!areYouSure);

    }
    const handleYesClick = () => {
        setareYouSure(false);
        localStorage.clear();
        navigate("/");
    }
    return (
        <>
            <Button onClick={handleClick}>
                <BiPowerOff />
            </Button>
            <Modal
                ariaHideApp={false}
                isOpen={areYouSure}
                onRequestClose={handleClick}
                style={customStyles}>
                Are you sure you want to logout?
                <CloseButton>
                    <button className='modalCloseButton' onClick={handleYesClick}>Logout</button>
                </CloseButton>
            </Modal>
        </>
    )
}

const Button = styled.button`
display:flex;
justify-content:center;
align-items:center;
padding:0.2rem;
border-radius:0.4rem;
background-color:#9a86f3;
border:none;
cursor:pointer;
svg{
    font-size:1.3rem;
    color:#ebe7ff;
}
@media screen and (min-width: 720px) and (max-width: 1080px){
    svg{
        font-size:0.9rem;
    }
}
`;

const CloseButton = styled.button`
position:relative;
top:1.7rem;
left:17.6rem;
border:none;
display:flex;
flex-direction:row;
gap:2rem;
background-color:transparent;
.modalCloseButton{
    background-color:#131324;
    color:white;
    padding:0.4rem 1rem;
    border:none;
    border-radius:4px;
    cursor:pointer;
    font-size:1.2rem;
}
`;