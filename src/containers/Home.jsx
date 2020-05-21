import React from 'react'
import '../assets/styles/app.scss'
import Notes from '../components/Notes'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'react-bootstrap'
import ApiServices from '../services/apiServices'

const Home = ({ myList, trends, originals }) => {

  const getBullets = (e) => {
    const userid = window.localStorage.userId || ''
    ApiServices.getBullets(userid)
 
  }

  return (
    <Container fluid='md'>
      <Row>
        <Col lg={6}>
          <button onClick={getBullets}>Get Bullets</button>
          <Notes type='primary' priority='primary' />
          <Notes type='secondary' priority='secondary' />
          <Notes type='aditional' priority='aditional' />
        </Col>

        <Col lg={6}>
          <Notes type='event' />
          <Notes type='notes' />
          <Notes type='review' />
        </Col>
      </Row>

    </Container>
  )
}

export default Home
