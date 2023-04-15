import React from 'react'
import '../styles/ContentTodo.css'
import { useSelector } from 'react-redux'
import ItemTodo from './ItemTodo'

const ContentTodo = () => {
  const todoList = useSelector((state) => state.todo.todoList)
  const sortedTodoList = [...todoList]
  sortedTodoList.sort((a,b) => new Date(b.time) - new Date(a.time))
  return (
    <>
      {
        sortedTodoList && sortedTodoList.length > 0 ? (
          sortedTodoList.map((todo) => (
          <ItemTodo todo={todo}/>
          ))
        ) : (
          <div className='empty__content__todo'>
            <p className='nothing__text'>Nothing to-do yet.</p>
          </div>
        )
      }
    </>
  )
}

export default ContentTodo