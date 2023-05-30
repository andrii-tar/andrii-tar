import { render, screen } from '@testing-library/react';

import { ArticleList } from '../components/articlelist';
import React, { createContext, useState } from "react";
import { ListItem } from '../components/listitem';
import { mockArticleListData } from '../data';
import { BrowserRouter } from 'react-router-dom';
describe('article list section', () => {



    test('renders articles', () => {
        render(
            <BrowserRouter>
                <ListItem aList={mockArticleListData} />
            </BrowserRouter>
        );

        const title = screen.getByText(/new/i);
        expect(title).toBeInTheDocument();
    });


});