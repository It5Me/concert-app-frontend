# Getting Started with Next.js

## Introduction

Welcome to the Next.js project! This guide will help you set up and run the application locally for development and testing purposes.

## Branch Selection

Before you begin, ensure you're working on the main branch:

```bash
git checkout main
```

## Installation

Follow these steps to set up the project:

### 1. Clone the Repository

If you haven't already, clone the repository to your local machine:

```bash
git clone https://github.com/It5Me/concert-app-frontend.git
cd your-project
```

### 2. Install Dependencies

Install the required dependencies using npm:
Copy code

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```

### Available Scripts

In the project directory, you can run the following scripts:
Description: Runs the app in development mode.
Usage:
```bash
npm run dev
```

###  Open Login Page: Navigate to http://localhost:3000/pages/login to access the login page directly.




### npm run build
Description: Builds the app for production.

Copy code
```bash
npm run build
```



### API Integration
The application communicates with the backend API specified by NEXT_PUBLIC_API_BASE_URL in the .env file.
Ensure the backend server is running and accessible at the specified URL
