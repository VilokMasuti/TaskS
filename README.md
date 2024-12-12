# Task Management App

A task management application built with React, Ant Design, and TypeScript. It allows users to add, edit, delete, and view tasks, with pagination and a priority system. The app is fully responsive and optimized for both desktop and mobile use.

## Table of Contents

1. [Setup Instructions](#setup-instructions)
2. [Design Choices and Assumptions](#design-choices-and-assumptions)

## Setup Instructions

Follow these steps to set up and run the app locally:

### 1. Clone the Repository

First, clone the repository to your local machine.

```bash
git clone https://github.com/your-username/task-management-app.git
2. Install Dependencies
Navigate into the project folder and install the dependencies using npm or yarn.

bash
Copy code
cd task-management-app
npm install
or if you prefer yarn:

bash
Copy code
cd task-management-app
yarn install
3. Set Up the Backend (Optional)
If the app is designed to fetch and manage data from an API, ensure you have the backend API running. You will need to configure the API base URL in the application configuration (e.g., in .env file).

If you already have the API, ensure it is running. For example:

bash
Copy code
npm start
4. Start the Application
Once the dependencies are installed, start the application locally.

bash
Copy code
npm start
This will run the app on http://localhost:3000.

5. Open the App in Your Browser
After running the app, open your browser and go to http://localhost:3000 to view the application in action.

Design Choices and Assumptions

Ant Design for UI Components
I used Ant Design for the UI components because of its rich set of customizable and pre-built components, which allows for faster development and a consistent user interface.
Components like Table, Button, and Space are used to organize tasks and provide a smooth user experience.

Responsive Design
The app is designed to be fully responsive using Ant Design’s grid system, which adapts to different screen sizes.
On small screens, the table is made horizontally scrollable to prevent content from overflowing. This is done using the scroll={{ x: 800 }} property on the Ant Design Table component.

State Management
The app uses React's useState and useEffect hooks to manage state and handle side effects like fetching tasks when the page loads or when the current page changes.
Task Priority System
Tasks have a priority system with three levels: High, Medium, and Low. This is visually represented with color coding:
High: Red
Medium: Yellow
Low: Green

Pagination
Pagination is implemented to handle task lists with multiple entries. A page size of 5 tasks per page is used, and the pagination controls are built using Ant Design's Pagination component.
Assumptions Made

The app assumes that there is a backend API to fetch tasks, add tasks, update tasks, and delete tasks. The API is assumed to handle pagination and return the total count of tasks.

Data validation (such as checking if the task title or due date is valid) is handled at the API level, and it's assumed that the data coming from the API is correctly structured.

Task Status
Tasks can have one of two statuses: Completed or Not Completed. This is represented with a colored tag (green for completed, red for not completed).
Modular Structure
The app is structured into reusable components: TaskForm, TaskList, etc., to separate concerns and make the code more maintainable.
```
