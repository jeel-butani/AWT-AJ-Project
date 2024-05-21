# Drive Ease: A Comprehensive Web Application for the Rental Vehicle Industry

## Abstract
The Drive Ease web application addresses the existing challenges in the rental vehicle industry by facilitating seamless interactions between rental companies and customers. Currently, the absence of dedicated portals or apps for comparing rental prices and options across various companies has created a significant gap in the market. Drive Ease fills this void by offering a centralized platform where rental companies can list their vehicles, set rates, and provide additional services. Customers can easily browse through company profiles, vehicle details, and rental options, enabling informed decisions. The system streamlines the rental process through secure customer logins and intuitive interfaces, enhancing efficiency and user experience for both rental companies and customers. By providing transparent pricing, terms, and the ability for drivers to accept or reject booking requests, the system ensures a seamless and convenient rental experience for all stakeholders.

## Project Description
Drive Ease is a comprehensive web application designed to revolutionize the rental vehicle industry by bridging the gap between rental companies and customers. It addresses the challenges users face in comparing rental prices and options across multiple companies, providing a centralized platform that offers convenience, transparency, and efficiency.

### Objectives
- **Simplify the Rental Process**: For customers, the platform offers a user-friendly interface to browse a wide range of vehicles, compare prices, and make bookings according to their preferences. With options to book cars, bikes, and drivers, Drive Ease caters to diverse user needs, ensuring a seamless and personalized rental experience.
- **Empower Rental Companies**: Rental companies gain access to a dedicated portal where they can showcase their vehicles, set rental rates, and provide additional services. The platform empowers companies to manage their inventory effectively, respond to customer inquiries promptly, and streamline the booking process.
- **Innovative Features**: The web app introduces innovative features such as the ability for drivers to sign up individually, giving companies and independent drivers equal opportunities to participate in the system.

### Project Need
The rental vehicle industry faces several challenges, which Drive Ease aims to address:
- Centralized Platform
- Convenient Comparison
- Transparency
- Accessibility
- Efficiency
- Equal Opportunity
- Innovation
- Security
- Market Demand

### Features
#### User Features
- **User Registration and Authentication**: Secure registration and login process for users, utilizing Aadhaar card for identity verification.
- **Profile Management**: Users can manage their profile information and uploaded documents.
- **Vehicle Search and Booking**: Users can search for available vehicles, view transparent pricing and terms, and book vehicles for rental purposes.
- **Driver Request**: Users can request drivers for their rental vehicles, specifying preferences such as experience or language proficiency.
- **Real-time Updates**: Users receive real-time updates on bookings and availability changes.
- **Feedback and Rating System**: Users can provide feedback and ratings for rental experiences, enhancing transparency and accountability.

#### Driver Features
- **Driver Registration and Authentication**: Secure registration and login process for drivers, using Aadhaar card and license details for identity verification.
- **Handling Booking Requests**: Drivers receive booking requests from users and can accept or reject them based on availability and preference.
- **Profile Management**: Drivers can manage their profile information and availability status.
- **Real-time Updates**: Drivers receive real-time updates on bookings and changes in availability.

#### Company Features
- **Company Registration and Authentication**: Secure registration and login process for rental companies.
- **Vehicle and Driver Management**: Companies can add, edit, and manage their fleet of cars, bikes, and drivers, including availability and pricing.
- **Availability Management**: Companies can manage the availability of specific vehicles and drivers, adjusting availability based on demand.
- **Profile Management**: Companies can manage their profile information and uploaded documents.
- **Real-time Updates**: Companies receive real-time updates on bookings, availability changes, and other relevant information.

### Technologies and Tools
#### Technologies
- ReactJS
- ExpressJS and NodeJS
- Java Spring Boot Framework
- MongoDB
- Tailwind CSS

#### Tools
- VS Code Editor
- MongoDB Compass
- ThunderClient and Postman
- Github
- Tomcat

Drive Ease leverages these technologies and tools to deliver a robust, secure, and user-friendly web application, aiming to transform the rental vehicle industry by enhancing efficiency, transparency, and user experience for all stakeholders.

# Drive Ease Backend

## Overview
Drive Ease Backend is the server-side component of the Drive Ease web application, built using Spring Boot and Node.js. This repository contains the backend logic responsible for handling requests from the frontend, managing the database, and facilitating communication with external services.

## Technologies Used
- **Spring Boot**: For building the Java-based backend services.
- **Node.js**: For server-side development and handling backend operations.
- **Multer**: Middleware for handling multipart/form-data, particularly used for file uploads in this project.
- **MongoDB**: Database management system used for storing application data.

## Prerequisites
Before running the backend server, ensure you have the following installed:
- Java Development Kit (JDK)
- Node.js and npm (Node Package Manager)
- MongoDB

## Getting Started
Follow these steps to set up and run the Drive Ease Backend:

1. **Clone the Repository:**
   ```markdown
   git clone https://github.com/jeel-butani/DriveEase-Backend.git
   ```
2. **Navigate to the Project Directory:**
   ```markdown
   cd drive-ease-backend
   ```
3. **Configure MongoDB:**
    - Make sure MongoDB is running on your local machine or update the database configuration in spring-boot/src/main/resources/application.properties to point to your MongoDB instance.

4. **Build and Run the Spring Boot Application:**
   ```markdown
   cd spring-boot
   mvn spring-boot:run
   ```
5. **Install Node.js Dependencies:**
   ```markdown
   npm install
   ```
6. **Start the Node.js Server:**
   ```markdown
   npm start
   ```
7. **Access the Backend API:**
   - The backend server should now be running. You can access the API endpoints at http://localhost:8080 (Spring Boot) and http://localhost:3000 (Node.js).

### Frontend Repository
The frontend for this project is available in a separate repository. You can find it here:
https://github.com/jeel-butani/DriveEase-React

### Drive Ease Frontend Repository

Follow the instructions in the frontend repository's README to set up and run the Frontend.

### Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

### Contact
If you have any questions, feel free to reach out:

#### Email: butanijeel1@gmail.com
#### GitHub: jeel-butani
