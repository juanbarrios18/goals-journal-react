import React, { useState, useEffect } from 'react'
import ListGoals from './ListGoal'
import '../assets/styles/components/Goals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faAngleDown, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { Spinner } from 'react-bootstrap'
import apiServices from '../services/apiServices'
import classNames from 'classnames'

library.add(faTimes, faAngleDown, faPlus, faMinus)

const Notes = (props) => {
  const { type, priority, dateFilter } = props
  const [update, setUpdate] = useState(true)
  const [items, setItems] = useState([])
  const [toggleForm, setToggleForm] = useState(true)
  const [currentItem, setCurrentItem] = useState({
    name: '',
    creationDate: '',
    deadline: '',
    status: { selected: 'active' },
    description: '',
    userId: window.localStorage.userId,
    _id: ''
  })

  useEffect(() => {
    getGoals()
  }, [])

  useEffect(() => {
    if (update) {
      getGoals()
      setTimeout(() => setUpdate(false), 800)
    }
  }, [update])

  const getGoals = () => {
    const userid = window.localStorage.userId || ''
    apiServices.getGoals(userid)
      .then(res => {
        setItems(res)
      })
      .catch(err => console.log(err))
  }

  const handleInput = (e) => {
    console.log(JSON.stringify(currentItem))
    console.log(e.target)
    setCurrentItem({
      ...currentItem,
      [e.target.name]: e.target.value,
      creationDate: Date.now(),
      userId: window.localStorage.userId
    })
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    console.log('HOME - addItem -> CurrentItem' + JSON.stringify(currentItem))
    apiServices.newGoal(currentItem)
      .then(res => setUpdate(true))
      .catch(err => console.log(err))

    setCurrentItem({
      name: '',
      date: '',
      status: { selected: 'active' },
      priority: { selected: priority },
      type: { selected: type },
      userId: '',
      _id: ''
    })
  }

  const updateItem = (id, data) => {
    setUpdate(true)
  }

  const toggleInput = (e) => {
    e.preventDefault()
    console.log('hola')
  }

  const noteClass = classNames('note', type)
  return (
    <>
      <div className={noteClass}>
        <header className='header'>
          <div className='title'>
            <h2>Your Goals</h2>
            <Spinner
              animation='grow'
              variant='warning'
              hidden={!update}
            />
            <span onClick={(e) => toggleInput(e)}>
              <FontAwesomeIcon
                className='faiconsAD'
                icon={toggleForm ? 'plus' : 'minus' }
                onClick={(e) => setToggleForm(!toggleForm)}
              />
            </span>
          </div>
          <form
            className='goals-form'
            name='todoform'
            onSubmit={handleAddItem}
            hidden={toggleForm}
          >
            <input
              name='name'
              type='text'
              placeholder='Name . . .'
              value={currentItem.name || ''}
              onChange={handleInput}
              required
            />
            <input
              name='description'
              type='text'
              placeholder='Description . . .'
              value={currentItem.description || ''}
              onChange={handleInput}
              required
            />
            <div className="deadline">
              <input
                name="deadline"
                type='date'
                value={currentItem.deadline || ''}
                onChange={handleInput}
                required
              />
              <button type='submit'>
                <span>
                  <FontAwesomeIcon
                    className='faiconsGOALS'
                    icon='plus'
                  />
                </span>
              </button>

            </div>
          </form>
        </header>
        <ListGoals
          items={items}
          type={type}
          priority={priority}
          update={update}
          updateItem={updateItem}
          dateFilter={dateFilter}
        />
      </div>
    </>
  )
}
export default Notes
