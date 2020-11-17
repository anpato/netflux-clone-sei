import React from 'react'
import { AppBar, AppBarAction, AppBarTitle, Link } from 'react-md'
import { NavLink } from 'react-router-dom'

const NavBar = ({ authenticated, handleAuth }) => {
  const linkStyles = {
    textDecoration: 'none',
    color: authenticated && !window.location.path === '/' ? '#fff' : '#000'
  }
  return (
    <AppBar
      theme={
        authenticated && !window.location.path === '/' ? 'clear' : 'primary'
      }
    >
      <AppBarTitle>Netflux</AppBarTitle>
      <AppBarAction buttonType="text" first>
        {authenticated ? (
          <Link
            style={linkStyles}
            component={NavLink}
            to="/"
            onClick={() => {
              localStorage.clear()
              handleAuth({ authenticated: false, user: null })
            }}
          >
            Sign Out
          </Link>
        ) : (
          <Link style={linkStyles} component={NavLink} to="/signin">
            Login
          </Link>
        )}
      </AppBarAction>
    </AppBar>
  )
}
export default NavBar
