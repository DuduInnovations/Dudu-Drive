
# DUDU DRIVE!
----------
### Authors: Divanshu Sharma , Dhruv Mahajan, Michael Milic

### Purpose - CHANGE
A personal cloud drive setup for all the storage needs for cheap. 

### About - CHANGE 
----------


### General Architecture
![Architecture](/Dudu-Drive_architecture_V1.1.png)

//DEMO EDIT!
### Side by Side 3d and 2d Visual
![3d Intersection Demo](/images_and_gifs/sideBYside.gif)

### 3D WebApp Visual
![3d Intersection Demo](/images_and_gifs/3dVisual2.gif)


### Technologies
----------
Important technologies used
* [Redux]
* [MongoDB]
* [Express.js]
* [Node.js]
* [Docker]
* [React]
* [React-Router]

### Installation
1) Clone the repository
2) run "npm install"

### Get Started
1) run "npm start" inside server and client folder
2) Frontend and Backend services started 

### Create Docker Container for MongoDb (if MongoDB doesn't already exist)
-docker pull mongo (get mongo docker image) <br/>
-docker run -d -p 27017:27017 --name mongodb mongo (run docker in background and expose port 27017)<br/>
-docker exec -it mongodb bash (launch the docker bash shell for mongo)<br/>
-mongo (run mongo within shell)<br/>
-show dbs (show current databases)<br/>
-use db_to_create (make a db)<br/>


### Connecting server to MongoDB 
1) Edit mongoURL inside config folder inside server folder





