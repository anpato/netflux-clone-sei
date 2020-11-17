import React from 'react'
import { AddCircleSVGIcon, Card, GridList, GridListCell, Text } from 'react-md'
import { GridButton } from '../shared'

const Profiles = ({ profiles, selectProfile, history, account }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '90vh'
      }}
    >
      <h2>Who's Watching</h2>
      <GridList maxCellSize={200} cellMargin="50">
        {profiles.map((profile) => (
          <GridListCell
            key={profile.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <GridButton width={150}>
              <Card
                fullWidth
                style={{
                  minHeight: 150,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <img
                  src={profile.avatar}
                  style={{ width: 100, height: 100, margin: 0 }}
                />
              </Card>
            </GridButton>
            <Text>{profile.name}</Text>
          </GridListCell>
        ))}
        <GridListCell
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <GridButton
            width={150}
            onClick={() => history.push(`/profiles/create?account=${account}`)}
          >
            <Card
              fullWidth
              style={{
                minHeight: 150,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <AddCircleSVGIcon style={{ height: 50, width: 50 }} />
            </Card>
          </GridButton>
          <Text>Create Profile</Text>
        </GridListCell>
      </GridList>
    </div>
  )
}

export default Profiles
