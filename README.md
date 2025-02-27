# 📝 **Task Management Application**

## 📖 **Description**

This **Task Management Application** allows authenticated users to manage tasks by adding, editing, deleting, and reordering them across three categories: **To-Do**, **In Progress**, and **Done**. The app features a drag-and-drop interface and real-time synchronization with the database, making it a powerful tool for efficient task management.

---

## 🔑 **Key Features**

- **Authentication**: Sign in using Google through Firebase Authentication.
- **Task Management**: Add, edit, delete, and reorder tasks easily.
- **Real-Time Sync**: Changes are saved instantly in the database and stay updated across sessions.
- **Responsive UI**: Optimized for both desktop and mobile devices.
- **Drag-and-Drop**: Easily move tasks between categories and reorder them.
- **Persistence**: Tasks remain in their last state across page refreshes.
- **Clean UI**: Modern minimalistic design with up to 4 colors for a pleasant experience.

---

### 🎉 **Bonus Features** (Optional)

- 🌙 Dark Mode Toggle
- ⏰ Task Due Dates with Color Indicators (overdue tasks marked red)
- 📝 Activity Log to Track Task Changes (e.g., "Task moved to Done")

---

## 🌐 **Live Links**

- **Frontend**: [Live Frontend](https://your-live-link.com)
- **Backend**: [Live Backend API](https://your-live-backend.com)

---

## ⚙️ **Technologies Used**

- **Frontend**: React, Vite.js, react-beautiful-dnd (or other drag-and-drop libraries), Firebase Authentication
- **Backend**: Express.js, MongoDB
- **Real-Time Updates**: WebSockets or MongoDB Change Streams
- **UI Design**: Modern minimalistic design using a maximum of 4 colors

---

## 💻 **Installation**

### **Frontend**

1. Clone the repository:
   ```bash
   git clone https://github.com/salman679/Task-Managment.git
   ```
2. Navigate to the project folder:
   ```bash
   cd Task-Managment
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

### **Backend**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-backend.git
   ```
2. Navigate to the project folder:
   ```bash
   cd task-management-backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up MongoDB and create a `.env` file for environment variables (MONGODB_URI, JWT_SECRET, etc.).
5. Run the server:
   ```bash
   npm start
   ```

---

## 🔧 **API Endpoints**

- **POST /tasks**: Add a new task  
  Request Body:

  ```json
  {
    "title": "Task Title",
    "description": "Task description",
    "category": "To-Do"
  }
  ```

- **GET /tasks**: Retrieve all tasks for the logged-in user  
  Response:

  ```json
  [
    {
      "id": "taskId",
      "title": "Task Title",
      "description": "Task description",
      "category": "To-Do",
      "timestamp": "2025-02-27T00:00:00Z"
    },
    ...
  ]
  ```

- **PUT /tasks/:id**: Update task details (title, description, category)  
  Request Body:

  ```json
  {
    "title": "Updated Title",
    "description": "Updated description",
    "category": "In Progress"
  }
  ```

- **DELETE /tasks/:id**: Delete a task

---

## 🗂️ **Folder Structure**

```
/task-management-app
  /frontend       # React frontend
    /src
      /components  # React components
      /hooks       # Custom hooks
      /pages       # App pages
      /services    # API services
      App.js
      index.js
    .env           # Firebase config, etc.
    package.json
  /backend        # Express backend
    /controllers  # CRUD operation handlers
    /models       # MongoDB schemas
    /routes       # API routes
    server.js     # Main server file
    .env          # MongoDB connection, JWT_SECRET, etc.
    package.json
```

---

## 📦 **Dependencies**

- **Frontend**: React, Vite.js, react-beautiful-dnd, Firebase Authentication, Axios
- **Backend**: Express.js, MongoDB, Mongoose, dotenv, WebSockets or MongoDB Change Streams
- **Others**: CORS, body-parser

---

## 🚀 **Conclusion**

This **Task Management Application** provides an intuitive and powerful way to organize tasks efficiently, with real-time updates and a user-friendly drag-and-drop interface. Whether you're using it on desktop or mobile, this app will keep you productive and organized.
