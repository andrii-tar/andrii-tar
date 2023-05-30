import React from 'react';
import { render, screen,  fireEvent } from '@testing-library/react';
import LoginForm from '../components/user/loginform';
import { TestContext } from '../context_store';
import { loginUser } from '../api_v2';
import { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../api_v2', () => ({
    loginUser: jest.fn(),
}));

describe('LoginForm', () => {
    const mockSetAuth = jest.fn();
    const mockAuthCtx = {
        setAuth: mockSetAuth,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders the form', () => {
        const { getByPlaceholderText, getByText, getByTestId } = render(
            <TestContext.Provider value={mockAuthCtx}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </TestContext.Provider>
        );
        expect(getByPlaceholderText('Username')).toBeInTheDocument();
        expect(getByPlaceholderText('Password')).toBeInTheDocument();
        expect(getByTestId('submit_login')).toBeInTheDocument();
    });

    test('handles form submission', async () => {
        const {getByTestId} = render(
            <TestContext.Provider value={mockAuthCtx}>
                <BrowserRouter>
                    <LoginForm />
                </BrowserRouter>
            </TestContext.Provider>
        );
        fireEvent.change(getByTestId('username-input'), { target: { value: 'user' } });
        fireEvent.change(getByTestId('password-input'), { target: { value: 'password' } });
        fireEvent.click(getByTestId('submit_login'));
        expect(loginUser).toHaveBeenCalledWith(`Basic ${btoa('user:password')}`, mockAuthCtx);
    });

/*
    test('submit login', () => {
        render(
        <BrowserRouter>
            <LoginForm />
        </BrowserRouter>
        );
        const un_input = screen.getByTestId('username-input');
        const pwd_input = screen.getByTestId('password-input');
        const login_btn = screen.getByTestId('submit_login');


        fireEvent.change(un_input, { target: { value: 'user' } });
        expect(un_input.value).toBe('user');
        fireEvent.change(pwd_input, { target: { value: 'password' } });
        expect(pwd_input.value).toBe('password');

        const handler = jest.fn(event);
        fireEvent.change(login_btn, { target: { onclick: handler } });

        fireEvent.click(login_btn);
        expect(handler).toHaveBeenCalledTimes(1);
    });
    */
});
