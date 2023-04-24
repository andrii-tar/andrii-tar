export const baseUrl = 'http://localhost:5000';
export const articleListUrl = `${baseUrl}/article-list`;
//  const articleList = '';

function checkCredentials() {
    if (sessionStorage.getItem('basicAuth') === null) {
        window.location.href = './login';
    } else {
        return sessionStorage.getItem('basicAuth');
    }
    return '';
}

export const getArticleList = async () => {
    const request = await fetch(articleListUrl, {
        method: 'GET',
    });
    return request.json();
};

export const searchArticle = async (title) => {
    const searchUrl = `${baseUrl}/article/version/search?title=${title}`;
    const request = await fetch(searchUrl, {
        method: 'GET',
    });
    return request.json();
};

export const getArticle = async (id) => {
    const articleUrl = `${baseUrl}/article/${id}`;

    const request = await fetch(articleUrl, {
        method: 'GET',
    });
    return request.json();
};

export const getArticleVersion = async (id) => {
    const articleUrl = `${baseUrl}/version/${id}`;

    const request = await fetch(articleUrl, {
        method: 'GET',
    });
    return request.json();
};

export const rateArticle = async (rateVal, id) => {
    const rateUrl = `${baseUrl}/article/r/${id}`;

    const request = await fetch(rateUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rate: parseInt(rateVal, 10) }),
    });
    return request.responseText;
};

export const approveArticle = async (id) => {
    const rateUrl = `${baseUrl}/version/${id}`;

    const request = await fetch(rateUrl, {
        method: 'PUT',
        headers: {
            Authorization: checkCredentials(),
        },
    });
    return request.responseText;
};


export const getUserInfo = async () => {
    const userUrl = `${baseUrl}/user`;

    const request = await fetch(userUrl, {
        method: 'GET',
        headers: {
            Authorization: checkCredentials(),
        },
    });
    return request.json();
};

export const postArticle = async (articleData) => {
    const postUrl = `${baseUrl}/article`;

    // //console.log('cred', checkCredentials());
    const request = await fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: checkCredentials(),
        },
        body: articleData,
    });
    return request.responseText;
};

export const editArticle = async (articleData) => {
    const editUrl = `${baseUrl}/article/version`;

    const request = await fetch(editUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: checkCredentials(),
        },
        body: articleData,
    });
    return request.responseText;
};

export const getArticleVersionList = async (articleId) => {
    const articleVersionListUrl = `${baseUrl}/article/${articleId}/version`;
    /// /console.log(articleVersionListUrl);
    const request = await fetch(articleVersionListUrl, {
        method: 'GET',
    });
    return request.json();
};

export const getArticleVersionListByVersion = async (articleVersionId) => {
    const articleVersionListUrl = `${baseUrl}/article/version/${articleVersionId}`;
    /// /console.log(articleVersionListUrl);
    const request = await fetch(articleVersionListUrl, {
        method: 'GET',
    });
    return request.json();
};

export const registerUser = async (userData) => {
    const signupUrl = `${baseUrl}/user`;
    /// /console.log(userData);
    const request = await fetch(signupUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return request.json();
};

export const loginUser = async (userData) => {
    const loginUrl = `${baseUrl}/user`;
    /// /console.log(userData);
    const request = await fetch(loginUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`${userData.user_name}:${userData.password}`)}`,
        },
    });
    if (request.status === 200) {
        sessionStorage.setItem('basicAuth', `Basic ${btoa(`${userData.user_name}:${userData.password}`)}`);
        window.history.back();
    }
    return request.json();
};


export const updateUser = async (userData) => {
    const signupUrl = `${baseUrl}/user`;
    /// /console.log(userData);
    const request = await fetch(signupUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    return request.json();
};


export const deleteUser = async () => {
    const loginUrl = `${baseUrl}/user`;
    /// /console.log(userData);
    const request = await fetch(loginUrl, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: checkCredentials(),
        },
    });

    return request.responseText;
};
