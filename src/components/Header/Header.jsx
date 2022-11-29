import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';

export function Header() {
  return (
    <div className='header'>
      <Link
        to='/'
      /* to='/dev/beforeSaleMainPage/' */
      >
        <img className='header__logo' src="https://crm.centralnoe.ru/dealincom/assets/logo_can.jpg" alt="logo" />
      </Link>
    </div>
  )
}
