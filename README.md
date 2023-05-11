# Competitive Coding Hub

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Abstract

The Competitive Coding Hub is a project aimed at providing a platform for competitive programmers to practice coding problems and test their solutions. It allows users to submit their code in different programming languages and evaluates the output against the expected results. This project utilizes a backend server, a frontend user interface, and a Flutter app to provide a comprehensive experience for the users.



# Competitive Coding Hub Backend 

This repository contains the backend code for the GuruDev Datt project. It provides the server-side functionality and APIs required to support the application.

## Prerequisites

Before running the backend code, ensure you have the following dependencies installed:

- Node.js (v12 or higher)
- MongoDB

## Getting Started

To set up the backend code, follow these steps:

1. Clone this repository to your local machine.
2. Install the required npm packages by running the following command:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory of the project and provide the necessary environment variables. Refer to the `.env.example` file for the required variables.

4. Start the server by running the following command:

   ```
   npm start
   ```

   The server will start running on the specified port (as configured in the `.env` file).

## Project Structure

The backend code is organized into several modules, each responsible for specific functionality. Here's an overview of the project structure:

- `Routes`: Contains the route definitions for different API endpoints.
- `Middleware`: Contains middleware functions used for request processing and authentication.
- `Models`: Defines the Mongoose models for data storage and retrieval.
- `Database`: Handles the connection to the MongoDB database.
- `Executor`: Provides the execution environment for running user-submitted code.
- `Utils`: Contains utility functions used across the application.

## API Endpoints

The backend code exposes the following API endpoints:

- `/auth`: Handles user authentication and authorization.
- `/problems`: Provides CRUD operations for managing problems.
- `/user`: Manages user-related operations.
- `/problemManagement`: Handles problem management tasks (e.g., adding, updating, and deleting problems).
- `/executor`: Executes user-submitted code in different programming languages.
- `/submit`: Submits and judges user solutions for problems.

Please refer to the source code and corresponding route files for detailed information on each endpoint.

## Database Configuration

The backend code utilizes a MongoDB database for data storage. The connection details can be configured in the `.env` file, including the database URL and name.


# Competitive Coding Hub - Frontend

This is the frontend code for the Competitive Coding Hub application. It is developed using Angular.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Components](#components)
- [Dependencies](#dependencies)
- [Contact](#contact)

## Installation

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to install the dependencies:

```
npm install
```

## Usage

To start the frontend application, run the following command:

```
ng serve
```

The application will be accessible at `http://localhost:4200/`.

## Routes

The application uses the following routes:

- `/home`: Home page.
- `/auth/login`: Login page.
- `/auth/signin`: Signin page.
- `/auth/logout`: Logout page.
- `/ide`: IDE (Integrated Development Environment) page.
- `/problems/difficulty/:difficulty`: Page displaying problems based on difficulty level.
- `/problems/tags/:tag`: Page displaying problems based on tags.
- `/problems`: Page displaying all problems.
- `/problem/:problemcode`: Page displaying a specific problem.
- `/profile/:profileUserName`: Page displaying user profile information.
- `/set-problem`: Page for setting a new problem.
- `**` (Wildcard): Redirects to the home page.

## Components

The application includes the following components:

- `HomeComponent`: Home page component.
- `AuthComponent`: Authentication component.
- `LoginComponent`: Login page component.
- `SigninComponent`: Signin page component.
- `IdeComponent`: IDE page component.
- `ProfileComponent`: User profile component.
- `NavbarComponent`: Navigation bar component.
- `ProblemsComponent`: Problems page component.
- `LogoutComponent`: Logout page component.
- `EditorComponent`: Editor component for the IDE.
- `ProblemComponent`: Problem page component.
- `SetProblemComponent`: Set Problem page component.
- `TagProblemsComponent`: Component to display problems based on tags.
- `ProblemListComponent`: Component to list problems.
- `DifficultyProblemsComponent`: Component to display problems based on difficulty level.
- `LoadingComponent`: Loading indicator component.
- `RollingComponent`: Rolling component.
- `AlertComponent`: Alert component.

## Dependencies

The frontend application uses the following dependencies:

- Angular
- ngx-cookie-service
- @angular/material
- @angular/platform-browser
- @angular/common/http
- @angular/forms
- ace-builds
- ace-builds/src-noconflict/ext-language_tools



# Flutter App



This repository contains Flutter code for a competitive coding hub application called "Competitive Coding Hub". The application allows users to write and run code in various programming languages, solve programming problems, and submit their solutions for judging. The code editor is provided using the `code_editor` package, and HTTP requests are made using the `http` package.

## Getting Started

To run the application, follow these steps:

1. Make sure you have Flutter installed on your machine. If not, you can [install Flutter](https://flutter.dev/docs/get-started/install).
2. Clone this repository to your local machine.
3. Open the cloned repository in your preferred code editor.
4. Run `flutter pub get` to fetch the dependencies.
5. Connect your device or start the emulator.
6. Run `flutter run` to start the application.

## Features

### 1. Login

The login functionality is implemented in the `login.dart` file. It allows users to log in to the Competitive Coding Hub.

### 2. Home Page

The home page is implemented in the `home.dart` file. It displays the main screen of the Competitive Coding Hub application, where users can join and access various features.

### 3. Problem Page

The problem page is implemented in the `problem.dart` file. It allows users to view and solve programming problems. Users can write code in the provided code editor, run the code, and view the output. They can also submit their solutions for judging.

### 4. Problems Page

The problems page is implemented in the `problems.dart` file. It displays a list of available programming problems. Users can click on a problem to view its details and solve it.

## Dependencies

This project uses the following dependencies:

- `flutter/material.dart`: The material design framework for building Flutter applications.
- `shared_preferences`: A package for storing and retrieving persistent key-value pairs.
- `code_editor`: A package that provides a code editor widget for editing and highlighting code.
- `http`: A package for making HTTP requests.
- `footer`: A package for adding a footer widget to the Flutter application.

Please refer to the `pubspec.yaml` file for more details on the dependencies and their versions.

