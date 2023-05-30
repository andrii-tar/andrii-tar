import React from 'react';
import { render, screen } from '@testing-library/react';
import { ArticleVersionList } from '../../components/articleversionlist';
import { AxClient } from '../../client';
import { ErrorHandler } from '../../api_v2.js';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { createMemoryRouter } from 'react-router-dom';

import { ListItem } from '../../components/listitem';
import { mockArticleData } from '../../data';

import { createMemoryHistory } from 'history';

import * as ReactRouterDom from 'react-router-dom';



  /*  jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: jest.fn(),
      }));
*/
/*
  test('navigates to home page if location state is null', () => {
    const navigate = jest.fn();
    //useNavigate.mockReturnValue(navigate);
    const nav = jest.mock(ReactRouterDom, useNavigate);
    render(
      <MemoryRouter initialEntries={[{ pathname: '/article-version-list', state: null }]}>
        <ArticleVersionList />
      </MemoryRouter>
    );
    expect(nav).toHaveBeenCalled();
    expect(useNavigate).toHaveBeenCalledWith('/');
  });
});*/
/*
describe('ArticleVersionList2', () => {
  test('navigates to home page if location state is null', () => {
    const navigate = jest.fn();
    jest.spyOn(ReactRouterDom, 'useNavigate').mockReturnValue(navigate);

    render(
      <MemoryRouter initialEntries={[{ pathname: '/article-version-list', state: null }]}>
        <ArticleVersionList />
      </MemoryRouter>
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
*/

describe('ArticleVersionList', () => {
  test('renders list of articles', () => {
    render(
      <MemoryRouter>
        <ArticleVersionList />
      </MemoryRouter>
    );
    expect(screen.getByTestId("version-list")).toBeInTheDocument();
    //expect(screen.getByText(mockArticleData.title)).toBeInTheDocument();
  });
  /*
    test('navigates to home page if location state is null', () => {
  
  
      render(
          <MemoryRouter initialEntries={[{  state: null }]}>
          <ArticleVersionList />
        </MemoryRouter>
      );
      // Get the current location
         const mockNavigate = jest.spyOn(ArticleVersionList, 'useNavigate');
      expect(mockNavigate).toHaveBeenCalled();  
      //  expect(location.pathname).toBe('/');
  
    });
  */

    /*
  test('navigates to home page if location state is null', () => {
    const navigate = jest.spyOn(ReactRouterDom, 'useNavigate');

    render(
      <MemoryRouter initialEntries={[{ pathname: '/article-version-list', state: null }]}>
        <ArticleVersionList />
      </MemoryRouter>
    );

    expect(navigate).toHaveBeenCalledWith('/');
  });*/

/*
  test('fetches article versions if versionId is not null', async () => {
    const history = createMemoryHistory();
    history.push('/article-version-list', { articleData: mockArticleData });
    render(
      <MemoryRouter initialEntries={history}>
        <ArticleVersionList />
      </MemoryRouter>
    );
    expect(await screen.findByText(mockArticleData.title)).toBeInTheDocument();
  });*/
});

/*
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            articleData: mockArticleData
        }
    }),
}));

describe('ArticleVersionList',  () => {
  test('renders list of articles', async () => {
    await render(
      <MemoryRouter>
        <ArticleVersionList />
      </MemoryRouter>
    );

        const lst = screen.getByTestId("version-list");
        expect(lst).toBeInTheDocument();
    //expect(screen.getByText(mockArticleData.title)).toBeInTheDocument();
  });

  test('navigates to home page if location state is null', () => {
    // TODO: implement this test
  });

  test('fetches article versions if versionId is not null', () => {
    // TODO: implement this test
  });
});

*/


/*
jest.mock('../../client');
jest.mock('../../api_v2.js');

describe('ArticleVersionList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    
      test('renders correctly', () => {
        render(<MemoryRouter>
        <ArticleVersionList />
        </MemoryRouter>);
    
    //getAllVersions
        expect(screen.getByText('article-version-list')).toBeInTheDocument();
      });
    
    test('calls getAllVersions on mount if versionId is not null', async () => {
        const mockGet = jest.fn().mockResolvedValue({ data: [] });
        AxClient.get.mockImplementation(mockGet);

        const test2 = jest.fn();
        getAllVersions.mockImplementation(test2);

        render(
            <MemoryRouter initialEntries={[
                {
                    state: {
                        articleData: mockArticleData
                    }
                }]}>
                <ArticleVersionList />
            </MemoryRouter>);

        expect(test2).toHaveBeenCalled();
        expect(mockGet).toHaveBeenCalledWith(`/article/version/${mockArticleData.article_version_id}`, {});
    });

    test('calls ErrorHandler if there is an error in the GET request', async () => {
        const mockGet = jest.fn().mockRejectedValue(new Error('Network Error'));
        AxClient.get.mockImplementation(mockGet);

        render(<ArticleVersionList />, {
            initialState: {
                location: {
                    state: {
                        articleData: {
                            article_version_id: 1,
                        },
                    },
                },
            },
        });

        expect(ErrorHandler).toHaveBeenCalledWith(new Error('Network Error'));
    });

    test('renders ListItem with correct props', async () => {
        const mockGet = jest.fn().mockResolvedValue({ data: [{ id: 1 }] });
        AxClient.get.mockImplementation(mockGet);

        render(
            <MemoryRouter
                initialEntries={[
                    {
                        state: {
                            articleData: {
                                article_version_id: 1,
                            },
                        }
                    }]}>
                <ArticleVersionList />
            </MemoryRouter>);


        expect(screen.getByTestId('list-item')).toHaveProp('aList', [{ id: 1 }]);

    });
});

*/