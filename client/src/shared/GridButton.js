import React from 'react'
import { Button } from 'react-md'

export const GridButton = ({ children, width, style, onClick }) => (
  <Button
    onClick={onClick}
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      margin: '1em',
      minHeight: width,
      minWidth: width,
      ...style
    }}
  >
    {children}
  </Button>
)
