import React, { useEffect, useState } from 'react'
import '../assets/styles/app.scss'
import '../assets/styles/components/Home.scss'
import Notes from '../components/Notes'
import Goals from '../components/Goals'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Row, Col } from 'react-bootstrap'
import Layout from '../components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

library.add(faAngleRight, faAngleLeft)

const Home = ({ myList, trends, originals }) => {
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0])

  useEffect(() => {
    window.localStorage.setItem('dateFilter', dateFilter)
  }, [dateFilter])

  const handleSetDate = (e) => {
    console.log(e.target.value)
    setDateFilter(e.target.value)
    window.localStorage.setItem('dateFilter', dateFilter)
  }

  const handlePlusDay = () => {
    const m = moment(dateFilter, 'YYYY-MM-DD')
    const plus = m.add(1, 'day').format('YYYY-MM-DD')
    setDateFilter(plus)
  }

  const handleMinusDay = () => {
    const m = moment(dateFilter, 'YYYY-MM-DD')
    const minus = m.subtract(1, 'day').format('YYYY-MM-DD')
    setDateFilter(minus)
  }

  const handleToday = () => {
    const m = moment().format('YYYY-MM-DD')
    setDateFilter(m)
  }
  return (
    <Layout>
      <Row>
        <Col lg={12}>
          <div className='date-controls'>
            <span className='angles'>
              <FontAwesomeIcon
                className='faiconsAD-nav'
                icon='angle-left'
                onClick={(e) => handleMinusDay(e)}
              />
            </span>
            <input
              id='maindate'
              name='maindate'
              type='date'
              value={dateFilter}
              onChange={(e) => handleSetDate(e)}
            />
            <span className='angles'>
              <FontAwesomeIcon
                className='faiconsAD-nav'
                icon='angle-right'
                onClick={(e) => handlePlusDay(e)}
              />
            </span>
          </div>
          <div>
            <p id='today' onClick={handleToday}>Today</p>
          </div>
          <Goals type='goal' priority='goal' dateFilter={dateFilter} />
        </Col>
        <Col lg={6}>
          <Notes type='primary' priority='primary' dateFilter={dateFilter} />
          <Notes type='secondary' priority='secondary' dateFilter={dateFilter} />
          <Notes type='aditional' priority='aditional' dateFilter={dateFilter} />
        </Col>

        <Col lg={4}>
          <Notes type='event' priority='aditional' dateFilter={dateFilter} />
          <Notes type='notes' priority='aditional' dateFilter={dateFilter} />
          <Notes type='review' priority='aditional' dateFilter={dateFilter} />
        </Col>
      </Row>

    </Layout>
  )
}

export default Home
