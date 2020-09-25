import React from 'react'
import classes from './landingpage.module.css'
import ZipcodeForm from '../../containers/zipcodeForm'
import Footer from '../../containers/footer_k'
import About from '../../containers/About/about_k'
import StoresNearbyContainer from '../../containers/StoresNearby/storesNearby_k'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <section className={classes.background_image}>
        <Button
          id='login'
          variant='contained'
          style={{
            minHeight: '40px',
            maxHeight: '46px',
            left: '42.5%',
            backgroundColor: 'gold'
          }}
          href='/login'
        >
          Log In
        </Button>
        <ZipcodeForm />
        <StoresNearbyContainer />
      </section>

      <section
        className={[classes.background_white, classes.full_width].join(' ')}
      >
        <About />
      </section>
      <Footer />
    </div>
  )
}
export default LandingPage

// ouluxx@0.1.0 start /mnt/d/Users/2kenchill/Desktop/work/Ouluxx
// > react-scripts start
