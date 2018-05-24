import React from 'react';
import NavLink from 'react-router-dom/NavLink'

const NavBar = () => {
  return (
    <ul className='nav'>
      <li>
        <NavLink to='/login' activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to='/signup' activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
    </ul>
  )
}

export default NavBar;