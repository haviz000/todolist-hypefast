import { createSlice } from "@reduxjs/toolkit";

const getInitialTask = () => {
  const localTodoList = window.localStorage.getItem('todoList');

  if (localTodoList) {
    return JSON.parse(localTodoList);    
  }
  window.localStorage.setItem('todoList',[]);
  return [];
}

const initialState = {
  todoList : getInitialTask(),
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr))
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([
            {
              ...action.payload
            },
          ])
        )
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((task, index) => {
          if (task.id === action.payload) {
            todoListArr.splice(index,1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArr));
        state.todoList = todoListArr;
      }
    },
    deleteAllTodo: (state) => {
     window.localStorage.clear('todoList');
     state.todoList = [];
    },
  }
})

export const {addTodo, deleteTodo, deleteAllTodo} = todoSlice.actions;
export default todoSlice.reducer;