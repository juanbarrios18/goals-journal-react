import React, { useState, useEffect } from 'react'
import '../assets/styles/components/ListGoals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move'
import classNames from 'classnames'
import { Row, Col, Container } from 'react-bootstrap'
import apiServices from '../services/apiServices'

function ListItem (props) {
  const { items } = props
  const [listItems, setListItems] = useState([])

  useEffect(() => {
    setListItems(items)
  }, [items])

  const toggleCompleted = (e, id) => {
    let newItem = []
    const newItems = items.map(item => {
      if (item._id === id) {
        if (item.status.selected === 'active') {
          item.status.selected = 'completed'
        } else {
          item.status.selected = 'active'
        }
        newItem = item
        return item
      }
      return item
    })
    setListItems(newItems)
    apiServices.updateGoal(id, newItem)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const completedClass = (x) => {
    return classNames({ completed: x })
  }

  const handleChange = (e, id) => {
    const name = e.target.name
    const value = e.target.value
    const newItems = listItems.map(item => {
      if (item._id === id) {
        item[name] = value
      }
      return item
    })
    setListItems(newItems)
  }

  const updateChange = (e, id) => {
    const name = e.target.name
    const value = e.target.value
    const newItem = items.filter(item => {
      if (item._id === id) {
        item[name] = value
        return item
      }
    })
    apiServices.updateGoal(id, newItem[0])
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    apiServices.deleteGoal(id)
    const newItems = items.map(item => {
      if (item._id === id) {
        item.status.selected = 'deleted'
        return item
      } else {
        return item
      }
    })
    console.log(newItems)
    setListItems(newItems)
  }

  const ListItems = listItems.map(item => {
    console.log(item)
    if (item.status.selected !== 'deleted') {
      return (
        <div className='goallist' key={item._id}>
          <div className='goalRound'>
            <input
              type='checkbox'
              id={item._id}
              name={item.id}
              onChange={(e) => toggleCompleted(e, item._id)}
              checked={item.status.selected === 'completed'}
            />
            <label htmlFor={item._id} />
          </div>
          <div className='goalsItem'>
            <Container fluid>
              <Row>
                <Col lg={8}>
                  <input
                    className={completedClass(item.status.selected === 'completed')}
                    name='name'
                    type='text'
                    id={item._id}
                    value={item.name}
                    onChange={(e) => handleChange(e, item._id)}
                    onBlur={(e) => updateChange(e, item._id)}
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type='text'
                    name='deadline'
                    value='90 Days until deadline'
                  />
                </Col>
              </Row>
              <Row>
                <input
                  className={completedClass(item.status.selected === 'completed')}
                  type='text'
                  name='description'
                  value={item.description}
                  onChange={(e) => handleChange(e, item._id)}
                  onBlur={(e) => updateChange(e, item._id)}
                />
              </Row>

            </Container>
          </div>
          <span>
            <FontAwesomeIcon
              className='faicons'
              icon='times'
              onClick={() => deleteItem(item._id)}
            />
          </span>
          <hr />
        </div>
      )
    }
  })

  return (
    <div className='goal-ul'>
      <FlipMove duration={400} easing='ease-in-out'>
        {ListItems}
      </FlipMove>
    </div>
  )
}

export default ListItem
