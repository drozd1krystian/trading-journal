import React from 'react'
import './style.scss';
import {ReactComponent as SettingsIcon} from '../../assets/settings.svg';
import Avatar from '../Avatar';

const Header = (props) => {

  const data = {
    name: 'User',
  }

  return (
    <header className="header">
      <h2 className="logo">TradeJournal</h2>
      <aside className="side_menu">
        <SettingsIcon className="side_menu-icon" />
        <Avatar data={data}/>
      </aside>
    </header>
  )
}

export default Header;