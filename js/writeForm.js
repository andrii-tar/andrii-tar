import { postArticle } from './apiList.js';

const wForm = document.getElementById('write-form');
wForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const articleData = new FormData(wForm);

    const value = JSON.stringify(Object.fromEntries(articleData.entries()));
    // //console.log(userData);

    // console.log(value);
    await postArticle(value);
    window.location.href = './index.html';
});
