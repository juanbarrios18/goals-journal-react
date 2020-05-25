import React, { useState, useEffect } from 'react'
import '../assets/styles/components/listItem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move'
import classNames from 'classnames'
import apiServices from '../services/apiServices'

function ListItem (props) {
  const { items, type } = props
  const [listItems, setListItems] = useState([])

  // console.log(items.length, update, countItems)
  useEffect(() => {
    setListItems([...items])
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
    console.log(newItem)
    apiServices.updateBullet(id, newItem)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const completedClass = (x) => {
    return classNames({ completed: x })
  }

  const handleChange = (e, id) => {
    const data = e.target.value
    const newItems = listItems.map(item => {
      if (item._id === id) {
        item.name = data
      }
      return item
    })
    setListItems(newItems)
  }

  const updateChange = (e, id) => {
    const name = e.target.value
    const newItem = items.filter(item => {
      if (item._id === id) {
        item.name = name
        return item
      }
    })
    apiServices.updateBullet(id, newItem[0])
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    apiServices.deleteBullet(id)
    const newItems = items.map(item => {
      if (item._id === id) {
        item.status.selected = 'deleted'
        return item
      } else {
        return item
      }
    })
    setListItems(newItems)
  }

  const ListItems = listItems.map(item => {
    if (item.type.selected === type && item.status.selected !== 'deleted') {
      return (
        <div className='list' key={item._id}>
          <div className='round'>
            <input
              type='checkbox'
              id={item._id}
              onChange={(e) => toggleCompleted(e, item._id)}
              checked={item.status.selected === 'completed'}
            />
            <label htmlFor={item._id} />
          </div>
          <p>
            <input
              className={completedClass(item.status.selected === 'completed')}
              type='text'
              id={item._id}
              value={item.name}
              onChange={(e) => handleChange(e, item._id)}
              onBlur={(e) => updateChange(e, item._id)}
            />
            <span>
              <FontAwesomeIcon
                className='faicons'
                icon='times'
                onClick={() => deleteItem(item._id)}
              />
            </span>
          </p>
        </div>
      )
    }
  })
  return (
    <div>
      <FlipMove duration={400} easing='ease-in-out'>
        {ListItems}
      </FlipMove>
    </div>
  )
}

export default ListItem
