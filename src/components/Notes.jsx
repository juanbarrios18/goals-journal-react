import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import '../assets/styles/components/Notes.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import apiServices from '../services/apiServices'
import classNames from 'classnames'

library.add(faTimes, faAngleDown)

const Notes = (props) => {
  const { type, priority } = props
  const [update, setUpdate] = useState(true)
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState({
    name: '',
    date: '',
    status: { selected: 'active' },
    priority: { selected: priority },
    type: { selected: type },
    userId: window.localStorage.userId,
    _id: 'currentItem'
  })
  useEffect(() => {
    getBullets()
  }, [])

  useEffect(() => {
    if (update) {
      getBullets()
      setTimeout(() => setUpdate(false), 800)
    }
  }, [update])

  const getBullets = () => {
    const userid = window.localStorage.userId || ''
    apiServices.getBullets(userid)
      .then(res => {
        setItems(res)
      })
      .catch(err => console.log(err))
  }
  const HandleType = type => {
    let noteTitle = ''
    switch (type) {
      case 'primary':
        noteTitle = 'Primary Tasks'
        break
      case 'secondary':
        noteTitle = 'Secondary Tasks'
        break
      case 'aditional':
        noteTitle = 'Aditional Tasks'
        break
      case 'event':
        noteTitle = 'Events'
        break
      case 'notes':
        noteTitle = 'Notes'
        break
      case 'review':
        noteTitle = 'Daily Review'
        break
      case 'goal':
        noteTitle = 'Your Goals'
        break
      default:
        noteTitle = ''
    }
    return noteTitle
  }
  const handleInput = (e) => {
    // console.log(JSON.stringify(currentItem))
    setCurrentItem({
      ...currentItem,
      name: e.target.value,
      date: Date.now(),
      userId: window.localStorage.userId
    })
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    apiServices.newBullet(currentItem)
      .then(res => setUpdate(true))
      .catch(err => console.log(err))

    setCurrentItem({
      name: '',
      date: '',
      status: { selected: 'active' },
      priority: { selected: priority },
      type: { selected: type },
      userId: '',
      _id: 'currentItem'
    })
  }

  const completedTask = (id) => {
    const item = items.filter(item => {
      if (item._id === id) {
        if (item.status.selected === 'completed') {
          item.status.selected = 'active'
          return item
        }
        item.status.selected = 'completed'
        return item
      }
    })
    apiServices.updateBullet(id, item[0])
  }

  const updateItem = (id, data) => {
    setUpdate(true)
  }
  const noteClass = classNames('note', type)
  return (
    <>
      <div className={noteClass}>
        <header className='header'>
          <div className='title'>
            <h2>{HandleType(type)}</h2>
            <Spinner
              animation='grow'
              variant='warning'
              hidden={!update}
            />
          </div>
          <form className='to-do-form' name='todoform' onSubmit={handleAddItem}>
            <input
              type='text'
              placeholder={(type === 'goal') ? 'Enter goal . . .' : 'Enter task . . .'}
              value={currentItem.name || ''}
              onChange={handleInput}
            />
            <button type='submit'>
              <span>
                <FontAwesomeIcon
                  className='faiconsAD-notes'
                  icon='angle-down'
                />
              </span>
            </button>
          </form>
        </header>
        <ListItem
          items={items}
          type={type}
          priority={priority}
          update={update}
        />
      </div>
    </>
  )
}
export default Notes
