import { renderArticleTile } from './article_module.js';
import { getArticleList, searchArticle } from './apiList.js';

async function renderIndexPage() {
    let allArticlesList = [];

    allArticlesList = await getArticleList();

    // console.log('rendering', allArticlesList);
    let htmlString = '';
    const mainAL = document.getElementById('main-article-list');
    allArticlesList.forEach((element) => {
        htmlString += renderArticleTile(element);
    });
    mainAL.insertAdjacentHTML('beforeend', htmlString);
}

async function search(title) {
    let searchArticlesList = [];
    searchArticlesList = await searchArticle(title);
    let htmlString = '';
    const mainAL = document.getElementById('main-article-list');
    searchArticlesList.forEach((element) => {
        htmlString += renderArticleTile(element);
    });
    mainAL.innerHTML = '';
    mainAL.insertAdjacentHTML('beforeend', htmlString);
}

const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const t = formData.get('title');
    // console.log(t);
    search(t);
});
renderIndexPage();
