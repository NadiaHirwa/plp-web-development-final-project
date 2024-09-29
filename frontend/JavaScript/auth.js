document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            document.getElementById('error-message').textContent = error.message;
            return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); 

        // Redirect to appropriate page based on user role
        if (data.role === 'admin') {
            window.location.href = 'admin-dashboard.html'; 
        } else {
            window.location.href = 'user-dashboard.html'; 
        }
    } catch (error) {
        document.getElementById('error-message').textContent = 'An error occurred. Please try again.';
    }
});
