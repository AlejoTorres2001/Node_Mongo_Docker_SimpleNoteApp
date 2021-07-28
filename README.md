# Node_Mongo_Docker_SimpleNoteApp
A simple Note web app using node.js and mongo DB in the backend containerized using docker-compose

**About the app**

you can run this app without containers changing the connection string for the database and using npm run dev, this will fire up nodemon for easier development
**Docker Config**
inside Dockerfile you will find configuration related to the app´s image, it is based on a node´s offcial image using  alpine linux 
you can change the exposed port for four server there

**Docker compose**
inside this file you will find volumes config for both containers as well as port forwarding related stuff

