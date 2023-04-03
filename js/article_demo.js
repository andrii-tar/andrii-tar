import { renderFullArticle, renderVersion } from './article_module.js';
import {
    approveArticle, getArticleVersion, getArticleVersionListByVersion, rateArticle,
} from './apiList.js';
/*
async function openArticle(articleID) {
    const allArticlesList = await getArticleList();

    const cur = allArticlesList.find((element) => element.article_id === articleID);

    const article = document.getElementById('full-article');
    article.insertAdjacentHTML('afterbegin', renderFullArticle(cur));
} */

async function openArticleVersion(articleVersionID) {
    // console.log('test2');
    const articleVersion = await getArticleVersion(articleVersionID);
    const article = document.getElementById('full-article');
    article.insertAdjacentHTML('afterbegin', renderFullArticle(articleVersion));
}

async function loadVersions(articleVersionID) {
    const allVersionsList = await getArticleVersionListByVersion(articleVersionID);

    // console.log(allVersionsList);
    const versionList = document.getElementById('article-version-list');
    let htmlString = '';
    allVersionsList.forEach((element) => {
        // console.log(element);
        htmlString += renderVersion(element);
    });
    // console.log(htmlString);
    versionList.insertAdjacentHTML('afterbegin', htmlString);
}

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    // if (!urlParams.has('article_id')) redirectMain();
    const id = urlParams.get('article_version_id');
    await openArticleVersion(id);
    // console.log('hello', id);
    await loadVersions(id);
});

async function updateRating(rateVal) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('article_version_id');

    console.log('put sent');
    await rateArticle(rateVal, id);
    const info = await getArticleVersion(id);
    // console.log(info);

    const rInfo = document.getElementById('rating-info');
    // console.log(rInfo.innerHTML);
    rInfo.innerHTML = `Rating ${Math.round(info.rating * 100) / 100} average based on ${info.rates_cnt} reviews.`;
}

const ratingForm = document.getElementById('rating-form');
const { radios } = ratingForm.elements;
for (let i = 0, max = radios.length; i < max; i += 1) {
    radios[i].onclick = function() {
        updateRating(this.value);
    } 
}


const aButton = document.getElementById('approve-button');
aButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('article_version_id');
    await approveArticle(id);
    window.location.reload();
});

const eButton = document.getElementById('edit-button');
eButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('article_version_id');

    window.location.href = `./edit.html?article_version_id=${id}`;
});
