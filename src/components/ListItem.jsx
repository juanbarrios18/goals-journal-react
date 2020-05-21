import React, { useState } from 'react'
import '../assets/styles/components/listItem.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add()
function ListItem (props) {
  const { items } = props
  const handleChange = (date) => {
    props.completedTask(date)
  }
  const listItems = items.map(item => {
    return (
      <div className='list' key={item.date}>
        <div className='round'>
          <input
            type='checkbox'
            id={item.date}
            onChange={() => handleChange(item.date)}
            checked={item.status === 'completed'}
          />
          <label htmlFor={item.date} />
        </div>
        <p>
          <input
            className={item.status === 'completed' ? 'completed' : ''}
            type='text'
            id={item.date}
            value={item.name}
            onChange={(e) => props.updateItem(e.target.value, item.date)}
          />
          <span>
            <FontAwesomeIcon
              className='faicons'
              icon='trash'
              onClick={() => {
                props.deleteItem(item.date)
              }}
            />
          </span>
        </p>
      </div>
    )
  })
  return (
    <div>
      <FlipMove duration={400} easing='ease-in-out'>
        {listItems}
      </FlipMove>
    </div>
  )
}

export default ListItem
