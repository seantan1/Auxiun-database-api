## How to setup MongoDB database
Ensure that you have MongoDB installed properly according to your OS, check out the [official MongoDB website](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)
1. Create a folder named `run.sh`
2. Inside the folder, insert the following code: `mongod --port 27017 --dbpath data/db`
3. At the same directory level, type: `sudo mkdir data/db` to create a folder `data` and subfolder `db`
4. Then to modify permissions, type: `sudo chown -R $USER data/db`
5. Then use [PM2](https://pm2.keymetrics.io/) to serve up the script in `run.sh` by using the command: `pm2 start run.sh --name "mongodb"`

## How to setup Database API (middleware)
1. After you have the MongoDB database up and running, you can serve up the middleware to connect the Frontend React app with the database.
2. Clone this repository and inside the project directory, install the required dependencies using `npm install`
3. Serve up the API using [PM2](https://pm2.keymetrics.io/) using the following command: `pm2 start index.js --name "db-api"`
  
Additional info for CentOS users: [How to setup MongoDB on CentOS/AWS Linux](https://unix.stackexchange.com/questions/369620/centos-7-yum-wont-install-mongodb)
