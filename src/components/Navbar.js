import React from 'react'
import styled from 'styled-components'

const Nav = styled.nav`
    background-color: black;
    color: pink;
    text-shadow: .5px .5px #cccccc;
    height: 1.5rem;
    padding: .7rem 2.5rem .7rem 0;
`;

const Account = styled.div`
    text-align: right;    
`;

export default function Navbar(props) {
    return (
        <Nav>
            <Account>
            <small>Account: {props.account}</small>
            </Account>
        </Nav>
    );
  }