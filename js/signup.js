import { registerUser } from './apiList.js';

const rForm = document.getElementById('register-form');
rForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userData = new FormData(rForm);
    if (userData.get('cpassword') !== userData.get('password')) {
        alert('Confirm password correctly!');
    } else {
        userData.delete('cpassword');
        const value = JSON.stringify(Object.fromEntries(userData.entries()));
        // //console.log(userData);

        // console.log(value);
        // console.log('result', registerUser(value));
        await registerUser(value);
    }
});
