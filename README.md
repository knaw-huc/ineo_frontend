# INEO frontend code React
This repository contains the code for the frontend of the INEO stack and `dockerfile` with build script to create 
a docker image.

The frontend is a React application that uses `typescript`. The server to run the application is `nginx`. 

### How to build image
To build the image, run the following command:
```bash
./build.sh
```
Please be noted that the `build.sh` script will build for the current architecture. 
To build for different architecture, please use `docker buildx` command.