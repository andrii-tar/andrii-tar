import { loginUser } from './apiList.js';

const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = new FormData(loginForm);

    await loginUser({ user_name: userData.get('user_name'), password: userData.get('password') });
    // console.log(resp);
    // //console.log(sessionStorage.getItem("basicAuth"));
});
