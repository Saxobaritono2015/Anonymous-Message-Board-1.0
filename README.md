# Anonymous Message Board 1.0

A full-stack JavaScript anonymous message board application built as part of the FreeCodeCamp Information Security curriculum.

## 🚀 Live Demo

Visit the application: [Your deployed URL here]

## 📋 Features

- **Anonymous posting**: Create threads and replies without registration
- **Board system**: Organize discussions by topic/board
- **Password protection**: Secure deletion with password verification
- **Reporting system**: Report inappropriate content
- **Security features**: Helmet.js security headers
- **RESTful API**: Complete CRUD operations for threads and replies
- **Responsive design**: Works on desktop and mobile devices

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet.js
- **Testing**: Mocha, Chai, Chai-HTTP
- **Frontend**: HTML, CSS, JavaScript (jQuery)

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Saxobaritono2015/Anonymous-Message-Board-1.0.git
   cd Anonymous-Message-Board-1.0/boilerplate-project-messageboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp sample.env .env
   ```
   Edit `.env` file:
   ```
   PORT=3000
   NODE_ENV=development
   DB=mongodb://localhost:27017/anonymous_message_board
   ```

4. Start MongoDB (if using local database):
   ```bash
   mongod
   ```

5. Run the application:
   ```bash
   npm start
   ```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

All 10 functional tests are implemented and passing:
- ✅ Creating threads
- ✅ Viewing threads with replies
- ✅ Deleting threads with password verification
- ✅ Reporting threads
- ✅ Creating replies
- ✅ Viewing single thread with all replies
- ✅ Deleting replies with password verification
- ✅ Reporting replies

## 🌐 API Endpoints

### Threads
- `GET /api/threads/:board` - Get 10 most recent threads with 3 replies each
- `POST /api/threads/:board` - Create a new thread
- `PUT /api/threads/:board` - Report a thread
- `DELETE /api/threads/:board` - Delete a thread (with password)

### Replies
- `GET /api/replies/:board?thread_id=:id` - Get single thread with all replies
- `POST /api/replies/:board` - Create a new reply
- `PUT /api/replies/:board` - Report a reply
- `DELETE /api/replies/:board` - Delete a reply (with password)

## 🔒 Security Features

- **Helmet.js**: Security headers including noSniff, XSS protection, noCache
- **Data sanitization**: Sensitive data (passwords, reported status) hidden from responses
- **CORS protection**: Configured for FreeCodeCamp testing
- **Input validation**: Server-side validation for all inputs

## 📁 Project Structure

```
boilerplate-project-messageboard/
├── models/
│   ├── Thread.js          # MongoDB schema for threads and replies
│   ├── database.js        # Database connection
│   └── mockDatabase.js    # Fallback mock database
├── routes/
│   ├── api.js            # API routes implementation
│   └── fcctesting.js     # FreeCodeCamp testing routes
├── tests/
│   └── 2_functional-tests.js  # All 10 functional tests
├── views/
│   ├── index.html        # Main testing interface
│   ├── board.html        # Board view
│   └── thread.html       # Thread view
├── public/
│   └── style.css         # Styling
├── server.js             # Express server setup
├── package.json          # Dependencies and scripts
└── .env                  # Environment variables
```

## 🚦 Usage

1. **View boards**: Navigate to `/b/:board/` to see a message board
2. **Create threads**: Use the form on the main page or POST to `/api/threads/:board`
3. **Reply to threads**: Click on a thread or POST to `/api/replies/:board`
4. **Report content**: Use the report buttons or PUT requests
5. **Delete content**: Use delete forms with the correct password

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 FreeCodeCamp Project

This project fulfills the requirements for the **Anonymous Message Board** project in the FreeCodeCamp Information Security curriculum.

**Project Requirements**: ✅ All completed
- Security headers with Helmet.js
- Complete API implementation
- Data privacy protection
- All functional tests passing
- Proper error handling

## 📞 Contact

- GitHub: [@Saxobaritono2015](https://github.com/Saxobaritono2015)
- Project Link: [https://github.com/Saxobaritono2015/Anonymous-Message-Board-1.0](https://github.com/Saxobaritono2015/Anonymous-Message-Board-1.0)

---

**⭐ Star this repository if you found it helpful!**