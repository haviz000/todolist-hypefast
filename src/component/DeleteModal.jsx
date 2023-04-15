import React from 'react'
import '../styles/DeleteModal.css'
import { useDispatch } from 'react-redux'
import { deleteAllTodo } from '../slice/TodoSlice';

const DeleteModal = ({ setDeleteModal }) => {
  const dispatch = useDispatch();

  const createHandle = () => {
    dispatch(deleteAllTodo());
    setDeleteModal(false)
  }
  return (
    <div className='delete__wrapper'>
      <div className='delete__container'>
        <div className='delete__popup'>
          <p className='delete__title'>Confirm to clear all todos</p>
          <div className='delete__button'>
            <button className='delete__button__cancel' onClick={() => setDeleteModal(false)}>Cancel</button>
            <button className='delete__button__create' onClick={createHandle}>Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal