import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import SignUpForm from '../../components/user/signupform';
import { MemoryRouter } from 'react-router-dom';
import { ProfileContext } from '../../context_store';
import { AxClient } from '../../client';

jest.mock('../../client');

describe('SignUpForm', () => {
    let mockContextValue;

    beforeAll(() => {
        mockContextValue = {
            username: '',
            setUsername: jest.fn(),
            password: '',
            setPassword: jest.fn(),
            email: '',
            setEmail: jest.fn(),
            confpassword: '',
            setConfPassword: jest.fn(),
            role: 1,
            setRole: jest.fn()
        };
    });

    it('renders correctly', () => {
        render(
            <MemoryRouter>
                <ProfileContext.Provider value={mockContextValue}>
                    <SignUpForm />
                </ProfileContext.Provider>
            </MemoryRouter>
        );
        expect(screen.getByText('Sign Up')).toBeInTheDocument();
        expect(screen.getByText(/Already have an account?/i)).toBeInTheDocument();
        expect(screen.getByText('Log in')).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        AxClient.post.mockResolvedValueOnce({ data: {} });
        render(
            <MemoryRouter>
                <ProfileContext.Provider value={mockContextValue}>
                    <SignUpForm />
                </ProfileContext.Provider>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign up'));
        await screen.findByText('Log in');
        expect(AxClient.post).toHaveBeenCalledWith('/user', {
            "user_name": 'testuser',
            "password": 'password',
            "role_id": 1,
            "email": 'test@example.com'
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
    });

    it('shows an alert if passwords do not match', () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(
            <MemoryRouter>
                <ProfileContext.Provider value={mockContextValue}>
                    <SignUpForm />
                </ProfileContext.Provider>
            </MemoryRouter>
        );
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'differentpassword' } });
        fireEvent.click(screen.getByText('Sign up'));
        expect(window.alert).toHaveBeenCalledWith("Passwords are different");
    });

    // Add more tests for error handling and other scenarios


    it('shows an alert if the API returns a 400 error', async () => {
        // Mock the AxClient.post function to simulate a failed API call with a status code of 400
        AxClient.post.mockRejectedValueOnce({ response: { status: 400, data: 'Error message' } });
      
        // Mock the global window.alert function
        window.alert = jest.fn();
      
        // Render the SignUpForm component
        render(
          <MemoryRouter>
            <ProfileContext.Provider value={mockContextValue}>
              <SignUpForm />
            </ProfileContext.Provider>
          </MemoryRouter>
        );
      
        // Fill in the form and submit it
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign up'));
      
        // Wait for the API call to fail and the alert to be shown
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Error message'));
    });
      
     /*
    it('shows an alert if the API returns a 500 error', async () => {
        // Mock the AxClient.post function to simulate a failed API call with a status code of 500
        AxClient.post.mockRejectedValueOnce({ response: { status: 500 } });
      
        // Mock the global window.alert function
        const mockAlert = jest.fn();
        window.alert.mockImplementation(mockAlert);
       // window.alert = jest.fn();
      
        // Render the SignUpForm component
        render(
          <MemoryRouter>
            <ProfileContext.Provider value={mockContextValue}>
              <SignUpForm />
            </ProfileContext.Provider>
          </MemoryRouter>
        );
      
        // Fill in the form and submit it
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'password' } });
        fireEvent.click(screen.getByText('Sign up'));
      
        // Wait for the API call to fail and the alert to be shown
        await waitFor(() => expect(mockAlert).toHaveBeenCalledWith('Internal Server Error, try again later'));
      });
      */
});
 


