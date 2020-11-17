import React, { useState } from 'react'
import { Button, Card, CardContent, TextField } from 'react-md'
import { SignIn } from '../services/UserServices'

const AccountLogin = ({ history, handleAuth, setProfiles }) => {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = ({ target }) =>
    setForm({ ...form, [target.name]: target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await SignIn(form)
      handleAuth({ authenticated: true, user: res.payload })
      setProfiles(res.account.Profiles.length ? res.account.Profiles : [])
      history.push(`/profiles?account=${res.account.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const fieldStyles = { margin: '1em auto', width: '80%' }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <Card style={{ padding: '1em', width: '40vw' }}>
        <CardContent>
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column'
            }}
          >
            <TextField
              style={fieldStyles}
              id="email"
              name="email"
              type="email"
              value={form.email}
              label="Email"
              placeholder="jane@mail.com"
              onChange={handleChange}
            />
            <TextField
              style={fieldStyles}
              id="password"
              name="password"
              type="password"
              value={form.password}
              label="Password"
              onChange={handleChange}
            />
            <Button
              style={{ margin: '1em auto' }}
              theme="primary"
              type="submit"
              themeType="contained"
              disabled={form.email && form.password ? false : true}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default AccountLogin
