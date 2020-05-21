import React, { useState } from 'react'
import ListItem from '../components/ListItem'
import '../assets/styles/components/Notes.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'react-bootstrap'
import ApiServices from '../services/apiServices'

library.add(faTrash)

const Notes = (props) => {
  const { type, priority } = props
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState({
    name: '',
    date: '',
    status: 'active',
    priority: priority,
    type: type
  })
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
    // console.log(JSON.stringify(items))
    setCurrentItem({
      ...currentItem,
      name: e.target.value,
      date: Date.now()
    })
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    const newItem = currentItem
    if (newItem.name !== '') {
      const newItems = [...items, newItem]
      setItems(newItems)
      setCurrentItem({
        name: '',
        date: '',
        status: 'active',
        priority: priority,
        type: type
      })
    }
  }

  const completedTask = (date) => {
    const newItems = items.map(item => {
      if (item.date === date) {
        return {
          ...item,
          status: item.status === 'completed' ? 'active' : 'completed'
        }
      }
      return item
    })
    console.log(newItems)
    setItems(newItems)
    console.log('after' + JSON.stringify(items))
  }

  const updateItem = (text, date) => {
    const newItems = items.map(item => {
      if (item.date === date) {
        item.name = text
      }
      return item
    })
    // API SERVICE UPDATE
    setItems(newItems)
  }

  const deleteItem = (date) => {
    // API SERVICE -> DELETE
    const filteredItems = items.filter(item => item.date !== date)
    setItems(filteredItems)
  }

  return (
    <Container fluid>
      <div className='app'>
        <header className='header'>
          <div className='title'>
            <h2>{HandleType(type)}</h2>
          </div>
          <form id='to-do-form' onSubmit={handleAddItem}>
            <input
              type='text'
              placeholder='Enter task'
              value={currentItem.name || ''}
              onChange={handleInput}
            />
            <button type='submit'>Add</button>
          </form>
        </header>
        <ListItem
          items={items}
          deleteItem={deleteItem}
          updateItem={updateItem}
          completedTask={completedTask}
        />
      </div>
    </Container>
  )
}
export default Notes
