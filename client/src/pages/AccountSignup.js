import React, { useState } from 'react'
import { Button, Grid, Select, TextField } from 'react-md'
import { RegisterUser } from '../services/UserServices'

const AccountSignup = ({ history, match }) => {
  const [form, setForm] = useState({
    name: '',
    email: match.params.email,
    password: ''
  })
  const [accountType, setAccountType] = useState('')

  const accountOptions = ['Premium', 'Advanced', 'Basic']

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleSubmit = async () => {
    try {
      const res = await RegisterUser(form, accountType)
      if (res.status === 200) {
        history.push('/signin')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Grid columns={1}>
      <TextField
        id="email"
        onChange={handleChange}
        label="Your Email"
        value={form.email}
        name="email"
        type="email"
      />
      <TextField
        onChange={handleChange}
        label="Your Name"
        id="name"
        value={form.name}
        type="text"
        name="name"
      />
      <TextField
        onChange={handleChange}
        label="Password"
        id="password"
        value={form.password}
        name="password"
        type="password"
      />
      <Select
        onChange={(v) => setAccountType(v)}
        placeholder="Premium"
        label="Select Account Tier"
        options={accountOptions}
        value={accountType}
      />
      <Button
        theme="primary"
        themeType="contained"
        onClick={handleSubmit}
        disabled={
          form.email && form.name && form.password && accountType ? false : true
        }
      >
        Sign Up
      </Button>
    </Grid>
  )
}

export default AccountSignup
