import { users } from 'https://viwemhlaba.github.io/flight-deck-demo/Assets/js/users.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!loginForm) {
        console.error("Login form not found!");
        return;
    }

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const enteredUsername = usernameInput.value.trim();
        const enteredPassword = passwordInput.value;

        if (!enteredUsername || !enteredPassword) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Information',
                text: 'Please enter both username/email and password.',
                confirmButtonColor: '#3085d6'
            });
            return;
        }

        const foundUser = users.find(user =>
            (user.email === enteredUsername || user.name === enteredUsername) && 
            user.password === enteredPassword 
        );

        if (foundUser) {
            console.log('Login successful for:', foundUser.name);
            sessionStorage.setItem('loggedInUser', JSON.stringify({
                name: foundUser.name,
                email: foundUser.email,
                permissions: foundUser.permissions
            }));

            window.location.href = 'login.html';

        } else {
            console.warn('Login failed for:', enteredUsername);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid username/email or password.',
                confirmButtonColor: '#d33'
            });
            passwordInput.value = '';
        }
    });
});
