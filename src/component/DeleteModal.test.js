import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import DeleteModal from './DeleteModal';
import '@testing-library/jest-dom/extend-expect';


const mockStore = configureMockStore();
const store = mockStore({});

describe('DeleteModal component', () => {
  it('should render the component', () => {
    const { getByText } = render(
      <Provider store={store}>
        <DeleteModal setDeleteModal={() => { }} />
      </Provider>
    );

    expect(getByText('Confirm to clear all todos')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('should close the modal when Cancel button is clicked', () => {
    const setDeleteModal = jest.fn();
    const { getByText } = render(
      <Provider store={store}>
        <DeleteModal setDeleteModal={setDeleteModal} />
      </Provider>
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);
    expect(setDeleteModal).toHaveBeenCalledWith(false);
  });
});
