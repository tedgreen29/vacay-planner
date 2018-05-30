import React from 'react';
import NavLink from 'react-router-dom/NavLink'
import { Menu } from 'semantic-ui-react';

const NavBar = () => {
  return (
    <Menu borderless>
      <Menu.Item position="left">
        <NavLink to='/mytrips' activeClassName='active'>
          My Trips
        </NavLink>
      </Menu.Item>
      <Menu.Item position="right">
        <NavLink to='/login' activeClassName='active'>
          Login
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <NavLink to='/signup' activeClassName='active'>
          Sign Up
        </NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default NavBar;