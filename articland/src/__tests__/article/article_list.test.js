import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleList } from '../../components/articlelist';
import { SearchContext } from '../../pages';


import { BrowserRouter } from 'react-router-dom';


describe('ArticleList component', () => {
  test('renders list of articles', () => {
    const testArticles = [
      { id: 1, title: 'Test Article 1' },
      { id: 2, title: 'Test Article 2' },
    ];
    render(
      <SearchContext.Provider value={{ aList: testArticles }}>
        <BrowserRouter>
          <ArticleList />
        </BrowserRouter>
      </SearchContext.Provider>
    );
    expect(screen.getByText(/test article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test article 2/i)).toBeInTheDocument();
  });

  test('updates list when context value changes', () => {
    const testArticles = [
      { id: 1, title: 'Test Article 1' },
      { id: 2, title: 'Test Article 2' },
    ];
    const newTestArticles = [
      { id: 3, title: 'Test Article 3' },
      { id: 4, title: 'Test Article 4' },
    ];
    const { rerender } = render(
      <SearchContext.Provider value={{ aList: testArticles }}>
        <BrowserRouter>
          <ArticleList />
        </BrowserRouter>
      </SearchContext.Provider>
    );
    expect(screen.getByText(/test article 1/i)).toBeInTheDocument();
    expect(screen.getByText(/test article 2/i)).toBeInTheDocument();
    rerender(
      <SearchContext.Provider value={{ aList: newTestArticles }}>
        <BrowserRouter>
          <ArticleList />
        </BrowserRouter>
      </SearchContext.Provider>
    );
    expect(screen.getByText(/test article 3/i)).toBeInTheDocument();
    expect(screen.getByText(/test article 4/i)).toBeInTheDocument();
  });
});
