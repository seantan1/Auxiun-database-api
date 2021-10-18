## How to setup MongoDB database
1. Create a folder named `run.sh`
2. Inside the folder, insert the following code: `mongod --port 27017 --dbpath data/db`
3. At the same directory level, type: `sudo mkdir data/db` to create a folder `data` and subfolder `db`
4. Then to modify permissions, type: `sudo chown -R $USER data/db`
5. Then use [PM2](https://pm2.keymetrics.io/) to serve up the script in `run.sh` by using the command: `pm2 start run.sh --name "mongodb"`
  
Additional info: [How to setup MongoDB on CentOS/AWS Linux](https://unix.stackexchange.com/questions/369620/centos-7-yum-wont-install-mongodb)
