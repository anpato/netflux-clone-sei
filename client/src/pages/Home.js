import React, { useState } from 'react'
import { Button, TextField } from 'react-md'

const Home = ({ history }) => {
  const [email, setEmail] = useState('')
  return (
    <div
      style={{
        width: '90%',
        margin: 'auto',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className="hero">
        <h3 style={{ textAlign: 'center' }}>Welcome</h3>
        <div>
          <form style={{ display: 'flex' }}>
            <TextField
              id="email-start"
              type="email"
              value={email}
              required
              label="Your Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              theme="primary"
              themeType="contained"
              onClick={() => history.push(`/signup/${email}`)}
            >
              Get Started
            </Button>
          </form>
        </div>
      </div>
      <article style={{ lineHeight: '1.5' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Id eu nisl
          nunc mi ipsum faucibus vitae aliquet. At augue eget arcu dictum
          varius. Egestas sed tempus urna et pharetra. Rhoncus urna neque
          viverra justo nec ultrices. Facilisis gravida neque convallis a cras
          semper. Volutpat commodo sed egestas egestas fringilla. Eget mi proin
          sed libero enim sed faucibus turpis in. Proin sed libero enim sed
          faucibus turpis in. A erat nam at lectus urna duis convallis convallis
          tellus. Eget dolor morbi non arcu risus quis varius quam quisque. Orci
          dapibus ultrices in iaculis nunc sed.
        </p>
      </article>
      <footer
        style={{
          background: 'rgba(0,0,0,0.3)',
          bottom: 0,
          position: 'absolute',
          width: '100%',
          padding: '1em 0',
          textAlign: 'center'
        }}
      >
        Netflux LTD
      </footer>
    </div>
  )
}
export default Home
