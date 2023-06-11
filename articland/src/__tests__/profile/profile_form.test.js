import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ProfileForm from '../../components/user/profileform';
import { TestContext } from '../../context_store';
import { MemoryRouter } from 'react-router-dom';
import { AxClient } from '../../client';
import { BrowserRouter } from 'react-router-dom';

//jest.mock('../../client');

/*
describe('ProfileForm component', () => {
  test('renders form with inputs and buttons', () => {
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <ProfileForm />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const formTitle = screen.getByRole('heading', { name: /user info/i });
    expect(formTitle).toBeInTheDocument();
    const usernameInput = screen.getByTestId('username-input');
    expect(usernameInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const roleInput = screen.getByTestId('role_id');
    expect(roleInput).toBeInTheDocument();
    const saveButton = screen.getByRole('button', { name: /save/i });
    expect(saveButton).toBeInTheDocument();
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    expect(deleteButton).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <ProfileForm />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const usernameInput = screen.getByTestId('username-input');
    fireEvent.change(usernameInput, { target: { value: 'test' } });
    expect(usernameInput.value).toBe('test');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.change(passwordInput, { target: { value: 'test' } });
    expect(passwordInput.value).toBe('test');
    const emailInput = screen.getByTestId('email-input');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput.value).toBe('test@test.com');
  });

  test('calls AxClient.put on form submit', async () => {
    const putSpy = jest.spyOn(AxClient, 'put');
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <ProfileForm />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const submitBtn = screen.getByTestId('submit-form');
    await fireEvent.click(submitBtn);
    expect(putSpy).toHaveBeenCalled();
    putSpy.mockRestore();
  });

  test('calls AxClient.delete on delete button click', async () => {
    const deleteSpy = jest.spyOn(AxClient, 'delete');
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <ProfileForm />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await fireEvent.click(deleteButton);
    expect(deleteSpy).toHaveBeenCalled();
    deleteSpy.mockRestore();
  });

});
*/

describe('ProfileForm', () => {
    let mockContextValue;

    beforeAll(() => {
        mockContextValue = {
            userCreds: '',
            setUserCreds: jest.fn()
        };
    });

    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <TestContext.Provider value={mockContextValue}>
                    <ProfileForm />
                </TestContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('User Info')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();
        expect(screen.getByText('Want to delete account?')).toBeInTheDocument();
        expect(screen.getByText('DELETE')).toBeInTheDocument();
    });
/*
    it('navigates to home on Home button click', () => {
      render(
          <MemoryRouter>
              <TestContext.Provider value={mockContextValue}>
                  <ProfileForm />
              </TestContext.Provider>
          </MemoryRouter>
      );
      fireEvent.click(screen.getByText('Articland'));
      expect(window.location.pathname).toBe('/');
  });
*/
    it('sets the username correctly', () => {
        render(
            <MemoryRouter>
                <TestContext.Provider value={mockContextValue}>
                    <ProfileForm />
                </TestContext.Provider>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        expect(screen.getByPlaceholderText('Username').value).toBe('testuser');
    });

    it('sets the email correctly', () => {
        render(
            <MemoryRouter>
                <TestContext.Provider value={mockContextValue}>
                    <ProfileForm />
                </TestContext.Provider>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        expect(screen.getByPlaceholderText('Email').value).toBe('test@example.com');
    });

    it('sets the role correctly', () => {
        render(
            <MemoryRouter>
                <TestContext.Provider value={mockContextValue}>
                    <ProfileForm />
                </TestContext.Provider>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByTestId('role_id'), { target: { value: '2' } });
        expect(screen.getByTestId('role_id').value).toBe('2');
    });
});



