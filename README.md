# Dudu-Drive
A personal cloud drive for all the storage needs for cheap

# General Architecture
![Architecture](/Dudu-Drive_architecture_V1.1.png)

# Server
npm start (run the server.js and react app)

# Create Docker Container for MongoDb
-docker pull mongo (get mongo docker image) <br/>
-docker run -d -p 27017:27017 --name mongodb mongo (run docker in background and expose port 27017)<br/>
-docker exec -it mongodb bash (launch the docker bash shell for mongo)<br/>
-mongo (run mongo within shell)<br/>
-show dbs (show current databases)<br/>
-use db_to_create (make a db)<br/>


