# Eesti Energia homework

This CRUD App uses Spring Boot Data with H2 In Memory Database as back-end and react-js as front-end.


## After installing you can start application in two steps:

## 1. Start back-end part
Usage (with eclipse): 
1. Clone the project.
2. Eclipse: File -> Import -> Maven -> Existing Maven Projects.
3. The project is created with Maven, so you just need to import it to your IDE and build the project to resolve the dependencies.
4. Run.


## 2. Start front-end part
1. Open 'app' directory
2. Install all dependencies using:

### `npm install`

After that In the project directory, you can run:

### `npm start`

This command runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## TASK DESCRIPTION:
EE Homework  
Build a simple Java application that holds user data and displays it in a front-end. Front-end should use JavaScript. Implementing a database is not necessary, data can be kept in memory.  
Functional and nonfunctional requirements are a MUST. For all other architectural/coding concerns, use your own best judgement. Use any frameworks and/or build automation tools you see fit.  
Sorting and validation can be implemented in either, front-end or backend.  
Deliver the work as source code, we will review, compile and build the application from that.  
  
Functional requirements:  
User and his/her information must be able to be added, changed and deleted (CRUD operations). 
A combination of user’s first and last name must remain unique; a user with the exact same full name cannot be added twice (check for duplication).  
User’s e-mail must be correctly formatted (validate format).  
Displayed data must be sortable by each column.  
Search box must implement auto-complete (ajax or similar) on user name. It is enough to demonstrate auto-complete working, actual search functionality is not needed.  
  
Nonfunctional requirements: 
Write the back-end in Java 
Write the front-end in JavaScript  
Write at least one unit-test for backend.  
Provide documentation on how to install and run the application.  
  
Optional (“extra mile”):  
Cover backend with unit tests.  
Write front-end using React.  


