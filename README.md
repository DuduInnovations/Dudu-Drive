# Dudu-Drive
A personal cloud drive for all the storage needs for cheap

# General Architecture
![Architecture](/Dudu-Drive_architecture_V1.1.png)

# Server
npm start (run the server.js and react app)

# Create Docker Container for MongoDb
-docker pull mongo (get mongo docker image)
-docker run -d -p 27017:27017 --name mongodb mongo (run docker in background and expose port 27017)
-docker exec -it mongodb bash (launch the docker bash shell for mongo)
-mongo (run mongo within shell)
-show dbs (show current databases)
-use db_to_create (make a db)


