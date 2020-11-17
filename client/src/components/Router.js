import React, { useCallback, useEffect, useState } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import AccountSignup from '../pages/AccountSignup'
import AccountLogin from '../pages/AccountLogin'
import CreateProfile from '../pages/CreateProfile'
import Home from '../pages/Home'
import NavBar from './NavBar'
import ProtectedRoute from './ProtectedRoute'
import Profiles from '../pages/Profiles'
import { CheckSession } from '../services/UserServices'
import { GetProfiles } from '../services/AccountServices'
import { CircularProgress } from 'react-md'

const Router = ({ history }) => {
  const [auth, handleAuth] = useState({ authenticated: false, user: null })
  const [sessionStatus, toggleSession] = useState('')
  const [profiles, setProfiles] = useState([])

  const handleAccountFetch = useCallback(async () => {
    try {
      toggleSession('SESSION_LOADING')
      const token = localStorage.getItem('token')
      if (token) {
        const session = await CheckSession()

        if (session.status === 200) {
          const account = await GetProfiles(session.data.accountId)
          handleAuth({ authenticated: true, user: session.data })
          toggleSession('SESSION_LOADED')
          setProfiles(account.Profiles)
          return history.push('/profiles')
        }
      }

      return handleAuth({ authenticated: false, user: null })
    } catch (error) {
      console.log(error)
    } finally {
      toggleSession('SESSION_LOADED')
    }
  }, [history])

  useEffect(() => {
    handleAccountFetch()
  }, [handleAccountFetch])

  const loadSession = () => {
    switch (sessionStatus) {
      case 'SESSION_LOADING':
        return <CircularProgress id="primary-loader" />
      case 'SESSION_LOADED':
        return (
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup/:email" component={AccountSignup} />
              <Route
                path="/signin"
                component={(props) => (
                  <AccountLogin
                    {...props}
                    handleAuth={handleAuth}
                    setProfiles={setProfiles}
                  />
                )}
              />
              <ProtectedRoute
                exact
                path="/profiles"
                authenticated={auth.authenticated}
                user={auth.user}
                component={(props) => (
                  <Profiles
                    {...props}
                    profiles={profiles}
                    account={auth.user.accountId}
                  />
                )}
              />
              <ProtectedRoute
                path="/profiles/create"
                authenticated={auth.authenticated}
                user={auth.user}
                component={(props) => (
                  <CreateProfile
                    {...props}
                    profiles={profiles}
                    setProfiles={setProfiles}
                  />
                )}
              />
            </Switch>
          </main>
        )
      default:
        return <CircularProgress id="default" />
    }
  }

  return (
    <div>
      <NavBar authenticated={auth.authenticated} handleAuth={handleAuth} />
      {loadSession()}
    </div>
  )
}

export default withRouter(Router)
