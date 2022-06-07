# Fullstack To Do App

This is a todo web app with functionalities such as
-	CRUD on To Do items.
-	Sorting and searching for To Do items. 
-	Pagination on To Do item-list.

The project was created with Go on backend and React & TypeScript on frontend.

## Frontend:

### Technologies: 
**React, TypeScript, Material UI, axios**

-	React is declarative and component-based JavaScript library for building user interfaces. In this project, React used with TypeScript to ensure the type safety by strict type binding provided from TypeScript.
-	There exist some atomic components that taken from MUI which is a library that provides generic components on React (date-time-picker, pagination). These components adapted to the application with some modifications.
-	axios used for making http requests since this is a full stack project.
-	Only functional components used (hooks).
  
### Naming convention on frontend:

-	PascalCase for component name.
-	PascalCase.tsx for component files.
-	PascalCase.css for components styles.
-	camelCase.ts for other files such as api helpers etc.

### Frontend folder hierarchy:
      └── public                // manifest, icons, fonts etc.
        └── src
          ├── api               // axios instance, api request controllers
          ├── components        // reusable components
          ├── pages             // spa's that composed from other atomic components
          └── interfaces        // interfaces that corresponding models with backend
      
### Steps to run frontend:

After clone this repository change directory to fullstack-todo-app-frontend and npm start
<pre>
cd todo-app-frontend
npm start
</pre>

Click [here](https://github.com/yelimot/fullstack-todo-app-backend) to see the backend source code and REST API documentation.
