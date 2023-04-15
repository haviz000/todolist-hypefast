import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';
import { addTodo } from '../slice/TodoSlice';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('AddTodo component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      todos: [],
    });

    component = render(
      <Provider store={store}>
        <AddTodo />
      </Provider>
    );
  });

  it('renders the component', () => {
    expect(component).toBeDefined();
  });
  it('renders the Add New button', () => {
    expect(screen.getByText('Add New')).toBeInTheDocument();
  });

  it('opens the input form when the Add New button is clicked', () => {
    fireEvent.click(screen.getByText('Add New'));
    expect(screen.getByPlaceholderText('Add new to-do title...')).toBeInTheDocument();
  });

  it('displays an error message when the form is submitted with an empty title', () => {
    fireEvent.click(screen.getByText('Add New'));
    fireEvent.click(screen.getByText('Create'));
    expect(screen.getByText('Title is empty')).toBeInTheDocument();
  });

  it('displays an error message when the form is submitted with a title that is too long', () => {
    fireEvent.click(screen.getByText('Add New'));
    const input = screen.getByPlaceholderText('Add new to-do title...');
    fireEvent.change(input, { target: { value: 'a'.repeat(101) } });
    fireEvent.click(screen.getByText('Create'));
    expect(screen.getByText('Title must be shorter than or equal to 100 characters')).toBeInTheDocument();
  });

  it('dispatches an action to add a new todo when the form is submitted with a valid title', () => {
    fireEvent.click(screen.getByText('Add New'));
    const input = screen.getByPlaceholderText('Add new to-do title...');
    fireEvent.change(input, { target: { value: 'Do something' } });
    fireEvent.click(screen.getByText('Create'));
    expect(store.getActions()).toContainEqual(addTodo({
      id: expect.any(Number),
      title: 'Do something',
      time: expect.any(String),
    }));
  });
});
