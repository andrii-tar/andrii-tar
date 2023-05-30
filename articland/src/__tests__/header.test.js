import { render, screen } from '@testing-library/react';
import App from '../App';
import React from 'react';
import { useState, createContext, useContext } from "react";

import { BrowserRouter } from 'react-router-dom';
import Header from '../components/header/header';


import UserMenu from '../components/header/usermenu';
import GuestMenu from '../components/header/guestmenu';
import { TestContext } from '../context_store';


describe('Header component', () => {
  test('renders logo and home link', () => {
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const logo = screen.getByAltText(/logo/i);
    expect(logo).toBeInTheDocument();
    const homeLink = screen.getByRole('link', { name: /articland/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('renders GuestMenu when userCreds is an empty string', () => {
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const loginLink = screen.getByTestId('login-link');
    expect(loginLink).toBeInTheDocument();
    const signupLink = screen.getByTestId('signup-link');
    expect(signupLink).toBeInTheDocument();
  });

  test('renders UserMenu when userCreds is not an empty string', () => {
    render(
      <TestContext.Provider value={{ userCreds: 'test' }}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const writeLink = screen.getByTestId('write-link', { name: /write/i });
    expect(writeLink).toBeInTheDocument();
    const profileLink = screen.getByTestId('profile-link', { name: /profile/i });
    expect(profileLink).toBeInTheDocument();
  });
});


describe('GuestMenu component', () => {
  test('renders Login and Sign up links', () => {
    render(
      <TestContext.Provider value={{ userCreds: '' }}>
        <BrowserRouter>
          <GuestMenu />
        </BrowserRouter>
      </TestContext.Provider>
    );
    const loginLink = screen.getByTestId('login-link');
    expect(loginLink).toBeInTheDocument();
    const signupLink = screen.getByTestId('signup-link');
    expect(signupLink).toBeInTheDocument();
  });
});
