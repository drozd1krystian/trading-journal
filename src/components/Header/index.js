import React from 'react'
import './style.scss';
import Navbar from '../Navbar';

const Header = (props) => {

  return (
    <header className="header">
      <h2 className="logo">TradeJournal</h2>
      <Navbar />
    </header>
  )
}

export default Header;