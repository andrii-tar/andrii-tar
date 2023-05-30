import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/searchbar';
import { SearchContext } from '../pages';
import { AxClient } from '../client';

describe('SearchBar component', () => {
  test('renders search form', () => {
    render(
      <SearchContext.Provider value={{ setAList: jest.fn() }}>
        <SearchBar />
      </SearchContext.Provider>
    );
    const searchForm = screen.getByTestId('search-form', { name: /search/i });
    expect(searchForm).toBeInTheDocument();
    const searchLabel = screen.getByText(/search article by title/i);
    expect(searchLabel).toBeInTheDocument();
    const searchInput = screen.getByTestId('searchbox');
    expect(searchInput).toBeInTheDocument();
    const searchButton = screen.getByRole('button', { name: /go/i });
    expect(searchButton).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <SearchContext.Provider value={{ setAList: jest.fn() }}>
        <SearchBar />
      </SearchContext.Provider>
    );
    const searchInput = screen.getByTestId('searchbox');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    expect(searchInput.value).toBe('test');
  });
/*
  test('calls searchByTitle on form submit', async () => {
    const mockSetAList = jest.fn();
    render(
      <SearchContext.Provider value={{ setAList: mockSetAList }}>
        <SearchBar />
      </SearchContext.Provider>
    );
    const searchBtn = screen.getByTestId ('submit-search');
    await fireEvent.click(searchBtn);
    expect(mockSetAList).toHaveBeenCalled();
  });
*/
  test('calls searchByTitle on form submit', async () => {
    const getSpy = jest.spyOn(AxClient, 'get');
    render(
      <SearchContext.Provider value={{ setAList: jest.fn() }}>
        <SearchBar />
      </SearchContext.Provider>
    );
    const searchBtn = screen.getByTestId('submit-search');
    await fireEvent.click(searchBtn);
    expect(getSpy).toHaveBeenCalled();
    getSpy.mockRestore();
  });
/*
  test('calls searchByTitle on form submit', async () => {
    const mockSetAList = jest.fn();
    render(
      <SearchContext.Provider value={{ setAList: mockSetAList }}>
        <SearchBar />
      </SearchContext.Provider>
    );
    const searchBtn = screen.getByTestId ('submit-search');
    await fireEvent.click(searchBtn);
    expect(mockSetAList).toHaveBeenCalled();
  });*/
});
