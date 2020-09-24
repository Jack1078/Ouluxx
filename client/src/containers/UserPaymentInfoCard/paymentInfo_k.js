/*
Email sign up box container
Contains: email signup textfield, sign up button,
    continue with facebook button, continue with google button
*/

import React, { useState } from 'react'
import classes from './paymentInfo_k.module.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { Row, Col, Container, Card } from 'react-bootstrap'

const UserPaymentInfoCard = () => {
  return (
    <Card bg='dark' text='light'>
      <Card.Body>
        <Card.Title>
          <strong>Payment Method</strong>
        </Card.Title>
        <ul className={classes.infolist}>
          <li>Name: </li>
          <li>Address: </li>
          <li>State: </li>
          <li>Zip Code: </li>
          <li>Country: </li>
        </ul>
      </Card.Body>
    </Card>
  )
}

export default UserPaymentInfoCard
