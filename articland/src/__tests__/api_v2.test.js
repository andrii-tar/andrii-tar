import { ErrorHandler, loginUser } from '../api_v2';
import { renderHook } from '@testing-library/react-hooks';
import { useNavigate } from 'react-router-dom';
import { AxClient } from '../client';
import { act } from 'react-dom/test-utils';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('../client');

beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });
  });
  

describe('ErrorHandler', () => {
    it('should handle 400 error', () => {
        const error = {
            response: {
                status: 400,
            },
        };
        global.alert = jest.fn();
        ErrorHandler(error);
        expect(global.alert).toHaveBeenCalledWith(
            'Bad request, check if input data is corect'
        );
    });

    it('should handle 401 error', () => {
        const error = {
            response: {
                status: 401,
            },
        };
        global.alert = jest.fn();
        ErrorHandler(error);
        expect(global.alert).toHaveBeenCalledWith(
            'Log into your account to perform this action'
        );
    });

    it('should handle 403 error', () => {
        const error = {
            response: {
                status: 403,
            },
        };
        global.alert = jest.fn();
        ErrorHandler(error);
        expect(global.alert).toHaveBeenCalledWith(
            'Moderator role required to perform this action'
        );
    });

    it('should handle 404 error', () => {
        const navigate = jest.fn();
        useNavigate.mockReturnValue(navigate);
        const error = {
            response: {
                status: 404,
            },
        };
        global.alert = jest.fn();
        ErrorHandler(error);
        expect(global.alert).toHaveBeenCalledWith('Page not found');
        expect(navigate).toHaveBeenCalledWith('/');
    });

    it('should handle 500 error', () => {
        const error = {
            response: {
                status: 500,
            },
        };
        global.alert = jest.fn();
        ErrorHandler(error);
        expect(global.alert).toHaveBeenCalledWith(
            'Internal Server Error, try again later'
        );
    });
});
/*
describe('loginUser', () => {
    it('should login user successfully', async () => {
        const token = 'testToken';
        const authCtx = { setUserCreds: jest.fn() };
        const userData = { name: 'test' };

        AxClient.get.mockResolvedValueOnce({ data: userData });

        const result = await loginUser(token, authCtx);

        expect(localStorage.setItem).toHaveBeenCalledWith('basicAuth', token);
        expect(authCtx.setUserCreds).toHaveBeenCalledWith(token);
        expect(result).toEqual(userData);
    });

    it('should handle login failure with wrong credentials', async () => {
        const token = 'testToken';
        const authCtx = { setUserCreds: jest.fn() };
        const error = { response: { status: 401 }, message: 'testError' };
        AxClient.get.mockRejectedValueOnce(error);
        global.alert = jest.fn();

        await loginUser(token, authCtx);

        expect(localStorage.setItem).toHaveBeenCalledWith('basicAuth', '');
        expect(authCtx.setUserCreds).toHaveBeenCalledWith('');
        expect(global.alert).toHaveBeenCalledWith('Wrong credentials');
    });

    it('should handle login failure with other errors', async () => {
        const token = 'testToken';
        const authCtx = { setUserCreds: jest.fn() };
        const error = { response: { status: 500 }, message: 'testError' };
        AxClient.get.mockRejectedValueOnce(error);
        global.alert = jest.fn();

        await loginUser(token, authCtx);

        expect(localStorage.setItem).toHaveBeenCalledWith('basicAuth', '');
        expect(authCtx.setUserCreds).toHaveBeenCalledWith('');
        expect(global.alert).toHaveBeenCalledWith(
            'Internal Server Error, try again later'
        );
    });
});
*/