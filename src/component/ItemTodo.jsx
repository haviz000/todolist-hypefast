import React, { useState } from 'react'
import '../styles/ItemTodo.css'
import { BsDashCircle } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { deleteTodo } from '../slice/TodoSlice'

const ItemTodo = ({ todo }) => {
  const [isChecked, setIsChecked] = useState(false)
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id))
  }

  return (
    <div className={isChecked ? 'content__todo__checked' : 'content__todo'}>
      <label className='checkbox__todo'>
        <input
          type='checkbox'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <span className='checkmark'></span>
      </label>
      <p className='title__todo'>{todo.title}</p>
      <BsDashCircle className='delete__todo' onClick={handleDelete} data-testid="delete-todo"/>
    </div>
  )
}

export default ItemTodo