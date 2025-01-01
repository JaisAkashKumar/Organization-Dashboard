Akash Organizations DashBoard

 
Introduction   : 
This application is designed to streamline organization and team management by providing intuitive features like hierarchical displays, profile management, and REST APIs for seamless data integration.
________________________________________
Features  :  
•	Hierarchical Organization Display: Visualize team structures in a clear and organized way.
•	Profile Image Uploads: Allow users to upload  profile pictures.
•	REST API: Fetch and manage individual records with a robust API.
________________________________________
Technologies Used  :
Frontend  :
•	React
•	Tailwind CSS (with DaisyUI plugin)
Backend  :
•	Node.js
•	Express
Database  :
•	MongoDB
Other Tools  :
•	Vercel (Deployment)
•	React-file-base-64 code (File Uploads)
•	FormData (File and Data Handling)
________________________________________
Installation  :
Prerequisites  :
•	Node.js and npm installed
•	MongoDB set up and running

Steps  :
1.	Clone the repository:
2.	git clone https://github.com/JaisAkashKumar/Organization-Dashboard.git
3.	Navigate to the project directory:
4.	cd project-name
5.	Install dependencies for the backend:
6.	cd Backend
7.	npm install
8.	Install dependencies for the frontend:
9.	cd ../frontend
10.	npm install
11.	Set up environment variables:
o	Create a .env file in the Backend folder with the following: 
o	MONGO_URI=your-mongodb-connection-string
o	PORT=5000
12.	Run the application:
o	Start the backend: 
o	cd Backend
o	node app.js
o	Start the frontend: 
o	cd ../Frontend
o	npm start
________________________________________
Usage
•	Access the application at http://localhost:3000.
•	Use the intuitive UI to manage teams and profiles.
________________________________________
API Endpoints
Base URL
http://localhost:5000/api
Endpoints
1.	Get All Organizations  :
o	GET /organizations
2.	Get organization by ID   :
o	GET / organizations /:id
And there are many such APIs
 
 
 
 
