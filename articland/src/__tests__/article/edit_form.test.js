import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditForm from '../../components/article/editform';
import { TestContext } from '../../context_store';
import { AxClient } from '../../client';
import { MemoryRouter } from 'react-router-dom';
import { mockArticleData } from '../../data';
jest.mock('../../client');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: () => ({
        state: {
            articleData: mockArticleData
        }
    }),
}));
describe('EditForm', () => {
    const mockNavigate = jest.fn();
    const mockUserCreds = 'mockUserCreds';
    /*const mockLocationState = {
        articleData: {
            title: 'Test Title',
            text: 'Test Text',
            article_version_id: 'testId'
        }
    };*/
    /*
      beforeEach(() => {
       // jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
       // jest.spyOn(require('react-router-dom'), 'useLocation').mockImplementation(() => ({ state: mockLocationState }));
      });
    */
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByDisplayValue } = render(
            <MemoryRouter initialEntries={[
                { state: { articleData: mockArticleData } }]}>

                <TestContext.Provider value={{ userCreds: mockUserCreds }}>
                    <EditForm />
                </TestContext.Provider>
            </MemoryRouter>
        );

        expect(getByDisplayValue(mockArticleData.title)).toBeInTheDocument();
        expect(getByDisplayValue(mockArticleData.text)).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        AxClient.post.mockResolvedValueOnce({ data: {} });

        const { getByDisplayValue, getByText } = render(

            <MemoryRouter initialEntries={[
                { state: { articleData: mockArticleData } }]}>
                <TestContext.Provider value={{ userCreds: mockUserCreds }}>
                    <EditForm />
                </TestContext.Provider>
            </MemoryRouter>
        );

        fireEvent.change(getByDisplayValue(mockArticleData.title), { target: { value: 'New Test Title' } });
        fireEvent.change(getByDisplayValue(mockArticleData.text), { target: { value: 'New Test Text' } });
        fireEvent.click(getByText('Save'));

        expect(AxClient.post).toHaveBeenCalledWith(
            '/article/version',
            {
                title: 'New Test Title',
                text: 'New Test Text',
                article_version_id: mockArticleData.article_version_id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: mockUserCreds
                }
            }
        );
    });
});
