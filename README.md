# Project: Professional Profile Management System

## Description

This project aims to create a professional profile management system similar to [read.cv](https://read.cv). Users can create and manage their profiles, including personal information, work experience, education, and skills. The system also allows users to upload and display profile pictures and other media files, customize their profiles with themes and layouts, and search for and connect with other professionals.

## Setting Up the Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/SchBenedikt/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```

4. Create the database schema:
   ```bash
   node src/models/user.js
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Running the Project Locally

1. Ensure that MongoDB is running on your local machine or use a cloud-based MongoDB service.
2. Start the development server as described in the previous section.
3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Contributing to the Project

We welcome contributions from the community! To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b my-feature-branch
   ```
3. Make your changes and commit them with a descriptive message.
4. Push your changes to your forked repository:
   ```bash
   git push origin my-feature-branch
   ```
5. Create a pull request to the main repository, describing your changes and the problem they solve.

Please ensure that your code follows our coding standards and includes appropriate tests.
