// Backend API URLs
const apiBaseUrl = "http://localhost:5000"; 

function checkUserAuthentication() {
    const token = localStorage.getItem('token'); 
    if (!token) {
        // Redirect to login if not logged in
        window.location.href = 'login.html';
        return;
    }

    // Decode the token to get user role
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.role !== 'admin') { // Replace 'admin' with the required role for accessing this dashboard
        // Redirect if the user does not have the right role
        alert('You do not have permission to access this page.');
        window.location.href = 'login.html'; 
    }
}

// Load data when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    checkUserAuthentication(); 
    fetchBooks();
    fetchBorrowRecords();
    fetchUsers();
});

// Fetch all books from the backend
function fetchBooks() {
    fetch(`${apiBaseUrl}/books`)
        .then(response => response.json())
        .then(data => {
            const booksBody = document.getElementById('booksBody');
            booksBody.innerHTML = ''; 
            data.forEach((book, index) => {
                const newRow = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td>${book.genre}</td>
                        <td>${book.quantity}</td>
                        <td>${book.totalCopies}</td>
                        <td>${book.availableCopies}</td>
                        <td>${book.createdAt}</td>
                        <td>${book.updatedAt}</td>
                        <td>
                            <button class="action-btn" onclick="editBook(${book.id})">Edit</button>
                            <button class="action-btn" onclick="deleteBook(${book.id})">Delete</button>
                        </td>
                    </tr>
                `;
                booksBody.insertAdjacentHTML('beforeend', newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching books:', error);
            alert('Failed to fetch books. Please try again later.');
        });
}

// Add a new book
function addBook(event) {
    event.preventDefault();
    const bookData = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        isbn: document.getElementById('isbn').value,
        genre: document.getElementById('category').value,
        quantity: document.getElementById('quantity').value
    };

    fetch(`${apiBaseUrl}/books`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }, 
        body: JSON.stringify(bookData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Book added successfully!');
        document.getElementById('addBookForm').reset();
        fetchBooks(); 
    })
    .catch(error => {
        console.error('Error adding book:', error);
        alert('Failed to add book. Please check your input and try again.');
    });
}

// Edit an existing book
function editBook(bookId) {
    const newTitle = prompt("Enter new book title:");
    const newAuthor = prompt("Enter new author name:");
    const newIsbn = prompt("Enter new ISBN:");
    const newGenre = prompt("Enter new genre:");
    const newQuantity = prompt("Enter new quantity:");

    const updatedData = {
        title: newTitle,
        author: newAuthor,
        isbn: newIsbn,
        genre: newGenre,
        quantity: newQuantity
    };

    fetch(`${apiBaseUrl}/books/${bookId}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }, 
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Book updated successfully!');
        fetchBooks(); 
    })
    .catch(error => {
        console.error('Error updating book:', error);
        alert('Failed to update book. Please try again later.');
    });
}

// Delete a book
function deleteBook(bookId) {
    if (confirm("Are you sure you want to delete this book?")) {
        fetch(`${apiBaseUrl}/books/${bookId}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}` 
            } 
        })
        .then(() => {
            alert('Book deleted successfully!');
            fetchBooks(); 
        })
        .catch(error => {
            console.error('Error deleting book:', error);
            alert('Failed to delete book. Please try again later.');
        });
    }
}

// Fetch all borrow records
function fetchBorrowRecords() {
    fetch(`${apiBaseUrl}/borrow-records`)
        .then(response => response.json())
        .then(data => {
            const borrowRecordsTable = document.querySelector('#issued-books table');
            borrowRecordsTable.innerHTML = `
                <tr>
                    <th>Book ID</th>
                    <th>User ID</th>
                    <th>Borrow Date</th>
                    <th>Return Date</th>
                    <th>Actions</th>
                </tr>
            `;

            data.forEach(record => {
                const newRow = `
                    <tr>
                        <td>${record.bookId}</td>
                        <td>${record.userId}</td>
                        <td>${record.borrowDate}</td>
                        <td>${record.returnDate}</td>
                        <td>
                            <button class="action-btn" onclick="returnBook(${record.id})">Mark as Returned</button>
                        </td>
                    </tr>
                `;
                borrowRecordsTable.insertAdjacentHTML('beforeend', newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching borrow records:', error);
            alert('Failed to fetch borrow records. Please try again later.');
        });
}

// Add a new borrow record
function addBorrowRecord(event) {
    event.preventDefault();
    const borrowData = {
        bookId: document.getElementById('bookId').value,
        userId: document.getElementById('userId').value,
        borrowDate: document.getElementById('borrowDate').value,
        returnDate: document.getElementById('returnDate').value
    };

    fetch(`${apiBaseUrl}/borrow-records`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        }, 
        body: JSON.stringify(borrowData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert('Borrow record added successfully!');
        document.getElementById('addBorrowrecordform').reset();
        fetchBorrowRecords(); 
    })
    .catch(error => {
        console.error('Error adding borrow record:', error);
        alert('Failed to add borrow record. Please try again later.');
    });
}

// Mark a book as returned
function returnBook(recordId) {
    fetch(`${apiBaseUrl}/borrow-records/${recordId}/return`, {
        method: 'PUT',
        headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
        } 
    })
    .then(() => {
        alert('Book marked as returned!');
        fetchBorrowRecords(); 
    })
    .catch(error => {
        console.error('Error marking book as returned:', error);
        alert('Failed to mark book as returned. Please try again later.');
    });
}

// Fetch all users
function fetchUsers() {
    fetch(`${apiBaseUrl}/users`)
        .then(response => response.json())
        .then(data => {
            const userTable = document.querySelector('#user-details table');
            userTable.innerHTML = `
                <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Issued Books</th>
                </tr>
            `;

            data.forEach(user => {
                const newRow = `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.issuedBooks}</td>
                    </tr>
                `;
                userTable.insertAdjacentHTML('beforeend', newRow);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Failed to fetch users. Please try again later.');
        });
}
