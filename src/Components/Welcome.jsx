import React from 'react';
import styled from 'styled-components';
import  shinchan  from '../Assests/shinchan.gif';
export default function Welcome({ currentuser }) {
    return (
        <Container>
            <img src={shinchan} alt="" />
            <h1>Welcome,<span>{currentuser.name}</span></h1>
            <h3>Please select a chat to start messaging.</h3>
        </Container>
    )
}
const Container=styled.div`
padding-top:5rem;
display:flex;
justify:content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:15rem;
}
span{
    color:#4e00ff;
}
@media screen and (min-width: 720px) and (max-width: 1080px){
    img{
        height:10rem;
    }
    h3{
        font-size:0.9rem;
    }
    span{
        font-size:1.3rem;
    }
}
`;