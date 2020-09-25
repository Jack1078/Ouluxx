import React from 'react'
import Logo from '../images/ouluxxLogo.png'
import classes from './footer_k.module.css'
import { Row, Col, Container, Dropdown, Button, Input } from 'react-bootstrap'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'

function Footer() {
  return (
    <>
      <div className={classes.footer}>
        <div className={classes.items}>
          <span className={classes.subitemslogo}>
            <Row>
              <Col sm={12}>
                <span className={classes.logobox}>
                  <span className={classes.logo}>
                    OULU<span className={classes.xlogo}>X</span>X Inc.
                  </span>
                </span>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <p className={classes.subitemscopyright}>&#169;2020-2021</p>
              </Col>
            </Row>
          </span>
          <span className={classes.subitems}>
            <Row>
              <Col className={classes.subitemslink} sm={5}>
                About Us
              </Col>
            </Row>
            <div className={classes.verticalspace}></div>
            <Row>
              <Col className={classes.subitemslink} sm={4}>
                Locations
              </Col>
            </Row>
            <div className={classes.verticalspace}></div>
            <Row>
              <Col className={classes.subitemslink} sm={4}>
                Contact
              </Col>
            </Row>
          </span>
          <span className={classes.subitems}>
            <Row>
              <Col className={classes.subitemslink} sm={12}>
                Get Updates!
              </Col>
            </Row>
            <div className={classes.verticalspace}></div>
            <Row>
              <Col className={classes.subitemslink} sm={4}>
                Privacy
              </Col>
            </Row>
            <div className={classes.verticalspace}></div>
            <Row>
              <Col className={classes.subitemslink} sm={4}>
                Terms
              </Col>
            </Row>
          </span>
          <span className={classes.subitems}>
            <Row>
              <Col sm={10}>
                <Button size='sm' variant='outline-light'>
                  submit your store
                </Button>
              </Col>
            </Row>
          </span>
        </div>
        <div className={classes.itemssocial}>
          <Row>
            <Col sm={2}>
              <FacebookIcon
                className={classes.socialicons}
                fontSize='large'
                style={{ color: 'rgb(255, 225, 56)' }}
              />
            </Col>
            <Col sm={2}>
              <InstagramIcon
                className={classes.socialicons}
                fontSize='large'
                style={{ color: 'rgb(255, 225, 56)' }}
              />
            </Col>
            <Col sm={2}>
              <LinkedInIcon
                className={classes.socialicons}
                fontSize='large'
                style={{ color: 'rgb(255, 225, 56)' }}
              />
            </Col>
            <Col sm={2}>
              <TwitterIcon
                className={classes.socialicons}
                fontSize='large'
                style={{ color: 'rgb(255, 225, 56)' }}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className={classes.border}></div>
    </>
  )
}

export default Footer
