import React, { useEffect, useState } from 'react'
import {
  ArrowBackSVGIcon,
  Button,
  CheckSVGIcon,
  Divider,
  Grid,
  GridCell,
  TextField
} from 'react-md'
import { GetAvatars, CreateProfiles } from '../services/AccountServices'

const CreateProfile = ({ history, profiles, setProfiles }) => {
  const [status, setStatus] = useState('')
  const [avatars, setAvatars] = useState([])
  const [selectedAvatar, selectAvatar] = useState('')
  const [name, setName] = useState('')

  const getAvatars = async () => {
    try {
      const avatars = await GetAvatars()
      setAvatars(avatars)
    } catch (error) {
      console.log(error)
      setStatus('LOADING_ERROR')
    } finally {
      setStatus('LOADED')
    }
  }

  const submitProfile = async () => {
    try {
      let accountId = history.location.search.split('=')[1]
      const profile = await CreateProfiles(accountId, {
        name,
        avatar: selectedAvatar
      })
      setProfiles([...profiles, profile])
      history.push(`/profiles?account=${accountId}`)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setStatus('LOADING')
    getAvatars()
  }, [])
  return (
    <div
      style={{
        padding: '1em 0',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Button
          buttonType="icon"
          style={{ marginRight: '2em' }}
          theme="primary"
          themeType="contained"
          onClick={() => history.goBack()}
        >
          <ArrowBackSVGIcon />
        </Button>
        <TextField
          id="profile_name"
          label="Profile Name"
          style={{ marginRight: '.5em' }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          onClick={submitProfile}
          theme="primary"
          buttonType="icon"
          disabled={name && selectedAvatar ? false : true}
          themeType="outline"
        >
          <CheckSVGIcon />
        </Button>
      </div>
      <div>
        <h3 style={{ textAlign: 'center' }}>Select An Avatar</h3>
        <Divider />
        <Grid style={{ margin: 'auto' }} columns={5}>
          {avatars.map((avatar, i) => (
            <GridCell key={i} style={{ width: '100%' }}>
              <Button
                theme={selectedAvatar === avatar ? 'primary' : 'clear'}
                onClick={() =>
                  selectedAvatar === avatar
                    ? selectAvatar('')
                    : selectAvatar(avatar)
                }
                themeType={selectedAvatar === avatar ? 'outline' : 'flat'}
                style={{
                  width: 150,
                  height: 150
                }}
                buttonType="icon"
              >
                <img
                  src={avatar}
                  alt="icon"
                  style={{ width: 140, height: 140 }}
                />
              </Button>
            </GridCell>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default CreateProfile
