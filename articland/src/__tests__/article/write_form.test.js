import React from 'react';
import { useNavigate } from "react-router-dom";

import { render, fireEvent } from '@testing-library/react';
import WriteForm from '../../components/article/writeform';
import { TestContext } from '../../context_store';
import { AxClient } from '../../client';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../../client');

describe('WriteForm', () => {
    const mockNavigate = jest.fn();
    const mockUserCreds = 'mockUserCreds';
    
    //  beforeEach(() => {
    //    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => mockNavigate);
    //  });
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>

                <TestContext.Provider value={{ userCreds: mockUserCreds }}>
                    <WriteForm />
                </TestContext.Provider>
            </MemoryRouter>

        );

        expect(getByPlaceholderText('Title')).toBeInTheDocument();
        expect(getByText('First paragraph of the potential article')).toBeInTheDocument();
        expect(getByText('Save')).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        AxClient.post.mockResolvedValueOnce({ data: {} });

        const { getByPlaceholderText, getByText } = render(
            <MemoryRouter>

                <TestContext.Provider value={{ userCreds: mockUserCreds }}>
                    <WriteForm />
                </TestContext.Provider>
            </MemoryRouter>

        );

        fireEvent.change(getByPlaceholderText('Title'), { target: { value: 'Test Title' } });
        fireEvent.change(getByText('First paragraph of the potential article'), { target: { value: 'Test Text' } });
        fireEvent.click(getByText('Save'));

        expect(AxClient.post).toHaveBeenCalledWith(
            '/article',
            {
                title: 'Test Title',
                text: 'Test Text'
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
