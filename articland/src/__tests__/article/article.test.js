import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { ArticleList } from '../../components/articlelist';
import React, { createContext, useState, useEffect } from "react";
import { ListItem } from '../../components/listitem';
import { mockArticleListData } from '../../data';
import { BrowserRouter, Routes, Route, useLocation, MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { Article } from '../../components/article/article';
import { mockArticleData, mockApprovedArticleData } from '../../data';
import { AxClient } from '../../client';
import { ErrorHandler } from '../../api_v2';

jest.mock('../../client');
function render_article(mockData) {
    return (
        <BrowserRouter initialEntries={[{ pathname: '/article_demo', state: { articleData: mockData } }]}>
            <Article />
        </BrowserRouter>
    );
}
describe('full article section', () => {
   

    it('renders the article data', async () => {
        const mockRatingInfo = {
            rating: 12,
            rates_cnt: 3
        };

        const mockGet = jest.fn().mockResolvedValueOnce({ status: 200, data: mockRatingInfo });
        AxClient.get.mockImplementation(mockGet);

        const { getByText } = await render(
            <MemoryRouter initialEntries={[{ 
                pathname: '/article_demo', 
                state: { articleData: mockArticleData } 
            }]}>
            <Article />
        </MemoryRouter>
        );

        expect(getByText(mockArticleData.title)).toBeInTheDocument();
        expect(getByText(`Author: ${mockArticleData.author_name}`)).toBeInTheDocument();
        expect(getByText(`Published:${mockArticleData.last_change}`)).toBeInTheDocument();
        expect(
                getByText(`Rating ${mockArticleData.rating} average based on ${mockArticleData.rates_cnt} reviews.`)
                ).toBeInTheDocument();
        expect(getByText(mockArticleData.text)).toBeInTheDocument();
    });
/*
    it('approves article', async () => {
        const mockRatingInfo = {
            rating: 12,
            rates_cnt: 3
        };

        const mockGet = jest.fn().mockResolvedValueOnce({ status: 200, data: mockRatingInfo });
        AxClient.get.mockImplementation(mockGet);

        const mockPut = jest.fn().mockResolvedValueOnce({ status: 200, data: mockApprovedArticleData });
        AxClient.put.mockImplementation(mockPut);

        const mockApprove = jest.fn();
        jest.mock('../../components/article/article', () => ({
            ...jest.requireActual('../../components/article/article'),
            loadRatingInfo: jest.fn(),
            loadVersionInfo: jest.fn(),
            approve: mockApprove,
        }));

        
        const mockGetItem = jest.fn().mockImplementation(() => {
            return(`Basic ${btoa('user:password')}`)
        });
        
        Object.defineProperty(window.localStorage, 'getItem', {
            value: mockGetItem
          });
        //Authorization: localStorage.getItem('basicAuth')

        //const { getByText } = await render(

        const { getByText } = await render(
            <MemoryRouter initialEntries={[{ 
                pathname: '/article_demo', 
                state: { articleData: mockArticleData } 
            }]}>
            <Article />
        </MemoryRouter>
        );

        const approveBtn = await screen.getByText('Approve');
        expect(approveBtn).toBeInTheDocument();
        expect(await getByText('Moderator: unrevised')).toBeInTheDocument();


        //console.log(localStorage.getItem('basicAuth'));
        fireEvent.click(approveBtn);
       // expect
        //const temp =  window.localStorage.getItem('basicAuth');
       // expect(getByText('Moderator: unrevised')).toBeInTheDocument();

        //expect(mockGetItem).toHaveBeenCalled();

    });
*/



/*
    it('approves article', async () => {
        const mockRatingInfo = {
            rating: 12,
            rates_cnt: 3
        };

        const mockGet = jest.fn().mockResolvedValueOnce({ status: 200, data: mockRatingInfo });
        AxClient.get.mockImplementation(mockGet);

        const mockPut = jest.fn().mockResolvedValueOnce({ status: 200, data: mockApprovedArticleData });
        AxClient.put.mockImplementation(mockPut);

       // jest.spyOn(Article, 'approve');
        
        const mockGetItem = jest.fn().mockImplementation(() => {
            return(`Basic ${btoa('user:password')}`)
        });
        
        Object.defineProperty(window.localStorage, 'getItem', {
            value: mockGetItem
          });
        //Authorization: localStorage.getItem('basicAuth')

        //const { getByText } = await render(

        const { getByText } = await render(
            <MemoryRouter initialEntries={[{ 
                pathname: '/article_demo', 
                state: { articleData: mockArticleData } 
            }]}>
            <Article />
        </MemoryRouter>
        );

        const approveBtn = screen.getByText('Approve');
        expect(approveBtn).toBeInTheDocument();
        expect(getByText('Moderator: unrevised')).toBeInTheDocument();


        //console.log(localStorage.getItem('basicAuth'));
        //fireEvent.click(approveBtn);

        const temp =  window.localStorage.getItem('basicAuth');
       // expect(getByText('Moderator: unrevised')).toBeInTheDocument();

        expect(mockGetItem).toHaveBeenCalled();

    });

*/
    
});

/*
    it('redirects to main if state is null', async () => {

        const { getByText } = await render(
            <BrowserRouter initialEntries={[{ pathname: '/article_demo', state: null }]}>
            <Article />
        </BrowserRouter>
        );

        await waitFor(() => {
            expect(window.location.pathname).toBe('/');
          });
      
    });
*/
/*
it('successfully loads rating info', async () => {

    //jest.mock('../../components/article/article');
    const mockLoadRating = jest.fn().mockResolvedValueOnce({
         status: 200, data: { token: 'testToken' } 
        });
   // Article.loadRatingInfo.mockImplementation(mockLoadRating);
    AxClient.get.mockImplementation(mockLoadRating);

    const { getByText } = await render(
        <BrowserRouter initialEntries={[{ 
            pathname: '/article_demo', 
            state: { articleData: mockArticleData } 
        }]}>
        <Article />
    </BrowserRouter>
    );
    expect(getByText(mockArticleData.title)).toBeInTheDocument();
    expect(getByText(`Author: ${mockArticleData.author_name}`)).toBeInTheDocument();
    expect(getByText(`Published:${mockArticleData.last_change}`)).toBeInTheDocument();
    expect(
        getByText(`Rating ${mockArticleData.rating} average based on ${mockArticleData.rates_cnt} reviews.`)
    });
    ).toBeInTheDocument();
    expect(getByText(mockArticleData.text)).toBeInTheDocument();
});
*/
/*
    test('Verify that handleChange is called when radio button is clicked', () => {
        const mockHandleChange = jest.fn();

        jest.mock('../client', () => ({
           // ...jest.requireActual('../components/article/article'),
            put: mockHandleChange,
        }));

        const { getByTestId } = render(
            <BrowserRouter initialEntries={[
                { pathname: '/article_demo', state: { articleData: mockArticleData } }]}>
                <Article />
            </BrowserRouter>);
        const radio = getByTestId('radio1');
        //  jest.spyOn(Article, 'handleChange').mockImplementationOnce(jest.fn());//() => [mockArticleData, setArticleData]);

        fireEvent.change(radio, { target: { onchange: mockHandleChange } });

        // expect(mockHandleChange).toHaveBeenCalled();

      
        fireEvent.click(radio);

        // mockHandleChange(newArticleData);
        expect(mockHandleChange).toHaveBeenCalled();

        //   expect(setArticleData).toHaveBeenCalled();

        //expect(setArticleData).toHaveBeenCalledWith(newArticleData);
    });
*/



    //del me
    /*
        test('Verify that handleChange is called when radio button is clicked', () => {
            const mockHandleChange = jest.fn();
            const { getByTestId } = render(
                <BrowserRouter initialEntries={[
                    { pathname: '/article_demo', state: { articleData: mockArticleData } }]}>
                    <Article />
                </BrowserRouter>);
            const radio = getByTestId('radio1');
    
            fireEvent.change(radio, { target: { onchange: mockHandleChange } });
    
    
            fireEvent.click(radio);
            expect(mockHandleChange).toHaveBeenCalled();
        });
    */
    //dell me
    /*
        test('Verify that user can select another version', () => {
            const { getByTestId } = render(
                <BrowserRouter initialEntries={[
                    { pathname: '/article_demo', state: { articleData: mockArticleData } }]}>
                    <Article />
                </BrowserRouter>);
            const radio = getByTestId('radio1');
            expect(radio).not.toBeChecked();
            fireEvent.click(radio);
            expect(radio).toBeChecked();
        });
    */
    /*
        test("should update rating", async() => {
        
                Article.handleChange = jest.fn();
                Article.handleChange.mockImplementation(() => {
                    Article.mock.setArticleData( {...mockArticleData, rates_cnt:3 });
                });
               const test_article = await render(
                    <BrowserRouter initialEntries={[
                        { pathname: '/article_demo', state: { articleData: mockArticleData } }]}>
                        <Article />
                    </BrowserRouter>
                );
        
        
             //   const handler = jest.fn().mockImplementation((() => {mockArticle.rates_cnt += 1}));
        
             //   console.log(mockArticle);
        
                const radio1 = screen.getByTestId("radio1");
                const cnt = mockArticleData.rates_cnt;
    
               // console.log("data:", Article.handleChange.mockImplementation);
    
                expect(screen.getByText(/Rating/i)).toHaveTextContent(cnt);
        
               // const cur_cnt = mockArticle.rates_cnt;
        
        
               fireEvent.change(radio1, { target: { onchange: Article.handleChange } });
        
               //fireEvent.click(radio1);
               expect(Article.handleChange).toHaveBeenCalledTimes(1);
        
              //  fireEvent(radio1);
              //  expect(radio1).toHaveTextContent(cnt+1);
             //   expect(screen.getByText(/Rating/i)).toHaveTextContent(cnt+3);
        
               // expect(mockArticle.rates_cnt).toEqual(cur_cnt+1);
                
        
        //handleChange
        
            });
        */
    /*
        test("If TopLevelComponent is passed the open prop Modal is rendered", () => {
    
                  jest.mock("../components/article/article", () => () => {
                      return <mock-article data-testid="modal"/>;
                    });
                
            const { queryByTestId } = render(<BrowserRouter initialEntries={[
                { pathname: '/article_demo', state: { articleData: mockArticleData } }]}>
                <Article />
            </BrowserRouter>);
    
            const handler = jest.fn().mockImplementation((() => { articleData.rates_cnt += 1 }));
            const radio = queryByTestId("radio1");
            fireEvent.change(radio1, { target: { onchange: handler } });
    
            expect(queryByTestId("radio1")).toBeInTheDocument();
        });
    */


