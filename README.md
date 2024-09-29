
# **Library Management System**

## **Project Overview**

This **Library Management System** is developed using **Node.js**, **Express.js**, and **MySQL** (leveraging the Sequelize ORM) for efficient database management. The front end utilizes **HTML**, **CSS**, and **JavaScript** for an intuitive user interface. The system is designed for two types of users:

1. **User/Student**: Allows students to browse books, manage their personal information, and view books issued to them.
2. **Librarian/Admin**: Allows administrators to manage books, categories, authors, and student records.

## **Features**

### **User/Student**
- **Registration**: Students can sign up and receive a unique User ID.
- **Login**: Secure login using email and password.
- **View Books**: Students can view all available books in the library.
- **User Dashboard**: Displays personal information and allows users to update their profile.
- **Issued Books**: Students can view books they have borrowed along with return dates.
- **Password Management**: Users can update their password or recover it using the recovery feature.

### **Librarian/Admin**
- **Login**: Secure login using the Librarian ID, email, and password.
- **Manage Books**: Add, update, or delete book categories, authors, and books.
- **Issue Books**: Librarians can issue books to students and update return statuses.
- **Manage Students**: View and search student profiles using their unique student ID.
- **Password Management**: Administrators can manage their passwords through an internal system.

## **Project Structure**

```plaintext
├── models/                     # Sequelize models for database tables
│   ├── User.js                 # User (Student) model
│   ├── Librarian.js            # Librarian model
│   ├── Book.js                 # Book model
│   ├── Category.js             # Category model
│   ├── Author.js               # Author model
│   ├── IssuedBook.js           # Issued books relationship model
│   └── index.js                # Sequelize initialization and relationships
├── public/                     
│   ├── css/                    # Frontend CSS files
│   │   └── styles.css          # Main stylesheet for the app
│   ├── js/                     # Frontend JavaScript files
│   │   ├── user.js             # Logic for user interaction on the frontend
│   │   ├── librarian.js        # Logic for librarian interaction on the frontend
│   │   └── auth.js             # Frontend authentication logic
│   └── images/                 # Placeholder for images (if applicable)
├── routes/                     
│   ├── userRoutes.js           # Routes for user-specific actions (view books, update profile, etc.)
│   ├── librarianRoutes.js      # Routes for librarian actions (manage books, issue books, etc.)
│   └── authRoutes.js           # Authentication routes (login, register, password recovery)
├── views/                      
│   ├── user-dashboard.html     # User's personal dashboard
│   ├── librarian-dashboard.html# Librarian's dashboard to manage the system
│   ├── login.html              # Login page for both users and librarians
│   ├── register.html           # User registration page
│   └── book-list.html          # Page displaying all available books
├── controllers/                
│   ├── userController.js       # Handles user-related operations
│   ├── librarianController.js  # Manages librarian/admin functionalities
│   └── authController.js       # Authentication logic (login, register, password management)
├── config/                     
│   └── dbConfig.js             # MySQL database connection configuration
├── server.js                   # Main server file to start the application
├── package.json                # NPM dependencies and scripts
└── README.md                   # Project documentation

```

## **Installation & Setup**

1. **Clone the Repository**:  
   `git clone https://github.com/NadiaHirwa/plp-web-development-final-project.git`

2. **Install Dependencies**:  
   Navigate to the root of the project and run:
   ```bash
   npm install
   ```

3. **Database Setup**:  
   Update the `config/dbConfig.js` with your database credentials (MySQL). Run migrations to set up the database schema:
   ```bash
   npx sequelize db:migrate
   ```

4. **Run the Application**:  
   Start the server:
   ```bash
   npm start
   ```

5. **Access the Application**:  
   Open your browser and go to `http://localhost:3000`.

## **Key Technologies**

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web framework for routing and handling HTTP requests.
- **MySQL**: Relational database for storing data.
- **Sequelize ORM**: A promise-based ORM for MySQL, making it easier to interact with the database.
- **HTML/CSS/JavaScript**: Frontend for interacting with the system.

## **Contribution**

If you want to contribute to the project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/my-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature/my-feature
   ```
5. Create a pull request and describe your changes in detail.

## **Authors**

- **Nadia IRADUKUNDA HIRWA**
- **Denice Mushi**
- **Nnaji Christian**

