export function renderArticleTile(articleJSON) {
    let htmlString = '';

    htmlString += '<div class="article">';
    htmlString += `<a class="click-link" href="#" onclick="openV(this.id)" id=${articleJSON.article_version_id}>`;
    htmlString += `<p class="article__title">${articleJSON.title}</p>`;
    htmlString += '</a>';

    htmlString += `<p class="article__info">Author:${articleJSON.author_id}</p>`;
    htmlString += `<p class="article__info">Published: ${articleJSON.last_change}</p>`;

    htmlString += `<p class="article__body">${articleJSON.text}</p>`;
    htmlString += '</div>';
    return htmlString;
}

export function renderFullArticle(articleJSON) {
    let htmlString = '';

    htmlString += '<div class="article">';
    htmlString += `<a href="article_demo.html" id=${articleJSON.article_id}>`;
    htmlString += `<p class="article__title">${articleJSON.title}</p>`;
    htmlString += '</a>';

    htmlString += `<p class="article__info">Author:${articleJSON.author_id}</p>`;
    if (articleJSON.moderator_id !== null) {
        htmlString += `<p class="article__info">Moderator:${articleJSON.moderator_id}</p>`;
    }
    htmlString += `<p class="article__info">Published: ${articleJSON.last_change}</p>`;
    htmlString += `<p class="article__info">Current state: ${articleJSON.status}</p>`;

    htmlString += `<p class="article__info" id="rating-info">Rating ${Math.round(articleJSON.rating * 100) / 100} average based on ${articleJSON.rates_cnt} reviews.</p>`;

    htmlString += `<p class="article__body">${articleJSON.text}</p>`;
    htmlString += '</div>';
    return htmlString;
}

export function renderVersion(articleJSON) {
    let htmlString = '';

    htmlString += '<div class="article">';

    htmlString += `<a href="#" onclick="openV(this.id)" id=${articleJSON.article_version_id}>`;
    htmlString += `<p class="article__title">${articleJSON.title}</p>`;
    htmlString += '</a>';

    htmlString += `<p class="article__body">${articleJSON.text}</p>`;
    htmlString += '</div>';
    return htmlString;
}
