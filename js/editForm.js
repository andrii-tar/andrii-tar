import { editArticle, getArticleVersion } from './apiList.js';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('article_version_id');

    const articleVersion = await getArticleVersion(id);
    /// /console.log('cur version', articleVersion);
    document.getElementById('edit-text').insertAdjacentHTML('afterbegin', articleVersion.text);
    document.getElementById('edit-title').value = articleVersion.title;
});

const eForm = document.getElementById('edit-form');
eForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('article_version_id');

    const articleVersionData = new FormData(eForm);
    articleVersionData.append('article_version_id', id);
    // ////console.log(articleVersionData);
    const value = JSON.stringify(Object.fromEntries(articleVersionData.entries()));
    // ////console.log(userData);

    /// /console.log(value);
    await editArticle(value);
    window.history.back();
});
