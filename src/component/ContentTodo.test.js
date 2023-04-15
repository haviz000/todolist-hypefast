import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ContentTodo from './ContentTodo';
import '@testing-library/jest-dom/extend-expect';


const mockStore = configureStore([]);

describe('ContentTodo', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      todo: {
        todoList: [
          {
            id: 1,
            title: 'Todo 1',
            time: '2022-04-18T05:00:00.000Z',
          },
          {
            id: 2,
            title: 'Todo 2',
            time: '2022-04-17T05:00:00.000Z',
          },
        ],
      },
    });
  });

  it('should render a list of todos', () => {
    render(
      <Provider store={store}>
        <ContentTodo />
      </Provider>
    );

    const todo1 = screen.getByText('Todo 1');
    const todo2 = screen.getByText('Todo 2');

    expect(todo1).toBeInTheDocument();
    expect(todo2).toBeInTheDocument();
  });

  it('should render "Nothing to-do yet." when there is no todo', () => {
    store = mockStore({
      todo: {
        todoList: [],
      },
    });

    render(
      <Provider store={store}>
        <ContentTodo />
      </Provider>
    );

    const emptyMessage = screen.getByText('Nothing to-do yet.');

    expect(emptyMessage).toBeInTheDocument();
  });
});
