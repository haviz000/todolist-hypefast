import React, { useState } from 'react'
import '../styles/AddTodo.css'
import { useDispatch } from 'react-redux'
import { addTodo } from '../slice/TodoSlice'
import DeleteModal from './DeleteModal'

const AddTodo = () => {
  const [isShowInput, setIsShowInput] = useState(false)
  const [isTitleEmpty, setIsTitleEmpty] = useState(false)
  const [isTitleTooLong, setisTitleTooLong] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsTitleEmpty(false)
    setisTitleTooLong(false)
    if (title === '') {
      setIsTitleEmpty(true)
      return;
    }
    if (title.length > 100) {
      setisTitleTooLong(true)
      return;
    }
    if (title && title.length <= 100) {
      let date = new Date();
      let time = date.getTime();
      dispatch(addTodo({
        id: time,
        title,
        time: new Date().toLocaleString(),
      }))
      setIsTitleEmpty(false)
      setisTitleTooLong(false)
      setIsShowInput(false)
      setTitle('')
    }
  }

  const handleCancel = () => {
    setIsShowInput(false)
    setIsTitleEmpty(false)
    setisTitleTooLong(false)
  }

  return (
    <>
      <div className='add__todo'>
        <p className='title'>Things you should be doing today...</p>
        <div className='add__todo__button'>
          {
            isShowInput === false && <button className='add__new__button' onClick={() => setIsShowInput(true)}>Add New</button>
          }
          <button className='delete__button' onClick={() => setDeleteModal(true)}>Clear</button>
        </div>
      </div>
      {
        deleteModal && <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} />
      }
      {
        isShowInput && (
          <>
            <form className='type__todo' onSubmit={(e) => handleSubmit(e)}>
              <input
                className='input__todo'
                placeholder='Add new to-do title...'
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoComplete='off'
              />
              <div className='add__todo__button'>
                <button className='cancel__button' onClick={handleCancel}>Cancel</button>
                <button className='create__todo__button' type='submit'>Create</button>
              </div>
            </form>
            {
              isTitleEmpty && (
                <div className='empty__alert'>
                  <p>Title is empty</p>
                </div>
              )
            }
            {
              isTitleTooLong && (
                <div className='empty__alert'>
                  <p>Title must be shorter than or equal to 100 characters</p>
                </div>
              )
            }
          </>
        )
      }
    </>
  )
}

export default AddTodo