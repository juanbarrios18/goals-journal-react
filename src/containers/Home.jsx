import React from 'react'
import '../assets/styles/app.scss'
import Notes from '../components/Notes'
import Goals from '../components/Goals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'
import Layout from '../components/Layout'

const Home = ({ myList, trends, originals }) => {
  return (
    <Layout>
      <Row>
        <Col lg={12}>
          <Goals type='goal' priority='goal' />
        </Col>
        <Col lg={6}>
          <Notes type='primary' priority='primary' />
          <Notes type='secondary' priority='secondary' />
          <Notes type='aditional' priority='aditional' />
        </Col>

        <Col lg={4}>
          <Notes type='event' priority='aditional' />
          <Notes type='notes' priority='aditional' />
          <Notes type='review' priority='aditional' />
        </Col>
      </Row>

    </Layout>
  )
}

export default Home
