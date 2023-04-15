import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ItemTodo from './ItemTodo';
import { deleteTodo } from '../slice/TodoSlice';
import '@testing-library/jest-dom/extend-expect';


const mockStore = configureStore([]);

describe('ItemTodo component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      todo: {
        todoList: [
          {
            id: 1,
            title: 'Buy groceries',
            time: '2022-01-01T00:00:00.000Z'
          }
        ]
      }
    });

    component = render(
      <Provider store={store}>
        <ItemTodo todo={store.getState().todo.todoList[0]} />
      </Provider>
    );
  });

  it('should render the todo item', () => {
    const todoTitle = component.getByText('Buy groceries');
    expect(todoTitle).toBeInTheDocument();
  });

  it('should toggle the checkbox when clicked', () => {
    const checkbox = component.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });
});
