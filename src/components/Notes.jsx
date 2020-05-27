import React, { useState, useEffect } from 'react'
import ListItem from '../components/ListItem'
import apiServices from '../services/apiServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import classNames from 'classnames'
import '../assets/styles/components/Notes.scss'

library.add(faTimes, faAngleDown)

const Notes = (props) => {
  const { type, priority, dateFilter } = props
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
    setCurrentItem({
      ...currentItem,
      date: dateFilter
    })
    getBullets()
  }, [dateFilter])

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
      default:
        noteTitle = ''
    }
    return noteTitle
  }
  const handleInput = (e) => {
    setCurrentItem({
      ...currentItem,
      name: e.target.value,
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
          dateFilter={dateFilter}
        />
      </div>
    </>
  )
}
export default Notes
