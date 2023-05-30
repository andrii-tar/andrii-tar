import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProfileInput from '../../components/user/profileinput';
import { ProfileContext } from '../../context_store';

describe('ProfileInput', () => {
  let mockContextValue;

  beforeEach(() => {
    mockContextValue = {
      email: '',
      setEmail: jest.fn(),
      username: '',
      setUsername: jest.fn(),
      password: '',
      setPassword: jest.fn(),
      confpassword: '',
      setConfPassword: jest.fn(),
      role: '',
      setRole: jest.fn()
    };
  });

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    expect(getByPlaceholderText('Email')).toBeInTheDocument();
    expect(getByPlaceholderText('Username')).toBeInTheDocument();
    expect(getByPlaceholderText('Password')).toBeInTheDocument();
    expect(getByPlaceholderText('Confirm password')).toBeInTheDocument();
  });

  it('updates email value on change', () => {
    const { getByPlaceholderText } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
    expect(mockContextValue.setEmail).toHaveBeenCalledWith('test@test.com');
  });

  it('updates username value on change', () => {
    const { getByPlaceholderText } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    expect(mockContextValue.setUsername).toHaveBeenCalledWith('testuser');
  });

  it('updates password value on change', () => {
    const { getByPlaceholderText } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
    expect(mockContextValue.setPassword).toHaveBeenCalledWith('testpassword');
  });

  it('updates confirm password value on change', () => {
    const { getByPlaceholderText } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByPlaceholderText('Confirm password'), { target: { value: 'testconfpassword' } });
    expect(mockContextValue.setConfPassword).toHaveBeenCalledWith('testconfpassword');
  });

  it('updates role value on change', () => {
    const { getByDisplayValue } = render(
      <ProfileContext.Provider value={mockContextValue}>
        <ProfileInput />
      </ProfileContext.Provider>
    );
    fireEvent.change(getByDisplayValue('User'), { target: { value: '2' } });
    expect(mockContextValue.setRole).toHaveBeenCalledWith('2');
  });
});
