# plp-web-development-final-project

# Library Management System

## Project Overview

This project is a **Library Management System** built using **Node.js**, **Express.js**, **MySQL** (with Sequelize ORM), **HTML**, **CSS**, and **JavaScript**. It allows users to manage library resources and offers two distinct user roles:

1. **User/Student**: Can view available books, manage their profile, and view issued books.
2. **Librarian/Admin**: Can manage book categories, authors, books, issue books to students, and manage student details.

## Features

### **Usert**
- Register and receive a unique User ID.
- Login using email and password.
- View available books in the library.
- View personal dashboard with the option to update profile information.
- View issued books and their return dates.
- Change and recover passwords.

### **Librarian/Admin**
- Login using Librarian ID, email, and password.
- Add, update, and delete book categories, authors, and books.
- Issue books to students and update book return details.
- Search and view student details using their student ID.
- Manage own password.

## Project Structure

```plaintext
├── models/                     # Sequelize models for database tables
│   ├── User.js                 # User model
│   ├── Librarian.js            # Librarian model
│   ├── Book.js                 # Book model
│   ├── Category.js             # Category model
│   ├── Author.js               # Author model
│   ├── IssuedBook.js           # IssuedBook model
│   └── index.js                # Sequelize initialization and relationships
├── public/
│   ├── css/                    # CSS files for the frontend
│   │   └── styles.css          # Main styles for the application
│   ├── js/                     # JavaScript files for the frontend
│   │   ├── user.js             # User-related JS functions
│   │   ├── librarian.js        # Librarian-related JS functions
│   │   └── auth.js             # Authentication-related JS
│   └── images/                 # Images used in the project (if any)
├── routes/                     # Express routes for API endpoints
│   ├── userRoutes.js           # User routes
│   ├── librarianRoutes.js      # Librarian routes
│   └── authRoutes.js           # Authentication routes
├── views/                      # HTML files for frontend
│   ├── user-dashboard.html     # User dashboard page
│   ├── librarian-dashboard.html# Librarian dashboard page
│   ├── login.html              # Login page for both User and Librarian
│   ├── register.html           # User registration page
│   └── book-list.html          # List of books for users
├── controllers/                # Controller logic for handling requests
│   ├── userController.js       # User-specific logic
│   ├── librarianController.js  # Librarian-specific logic
│   └── authController.js       # Authentication logic
├── config/                     # Configuration files
│   └── dbConfig.js             # Database connection configuration
├── server.js                   # Main server file (Express.js)
├── package.json                # NPM dependencies and scripts
└── README.md                   # Project documentation
