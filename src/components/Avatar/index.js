import React from 'react'
import './style.scss';
import {ReactComponent as DefaultUser} from '../../assets/user.svg';

const Avatar = ({data}) => {
  return (
    <div className="user">
      <DefaultUser className="user-photo" />
      <p className="user-name">{data.name}</p>
    </div>
  )
}

export default Avatar;