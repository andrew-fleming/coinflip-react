import React, { Component } from 'react'
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

class Navbar extends Component {

  render() {
    return (
        <Nav>
            <Account>
            <small>Account: {this.props.account}</small>
            </Account>
        </Nav>
    );
  }
}

export default Navbar;