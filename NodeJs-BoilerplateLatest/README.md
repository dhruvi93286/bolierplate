https://dillinger.io/

# Node.js Boilerplate Project

A boilerplate project created in node.js using Provider. Boilerplate used for backend side users, admin, payment and notification APIs, clone the appropriate branches mentioned below:
```
* https://EbizzInfotech@dev.azure.com/EbizzInfotech/CodeStandard/_git/Flutter-Boilerplate (stable channel)
```

## Getting Started

The Boilerplate contains the minimal implementation which required to create a new project.
The repository code is preloaded with some basic components like basic API structure, API module, database struture, constants and required dependencies to create a new project.
By using boiler plate code as standard initializer, we can have same format in all the projects that will inherit it.
This will also help in reducing setup & development time by allowing you to use same code pattern and avoid re-writing from scratch.

## How to Use

**Step 1:**

Download or clone this repo by using the link below:

```
https://EbizzInfotech@dev.azure.com/EbizzInfotech/CodeStandard/_git/Flutter-Boilerplate
```

**Step 2:**

Go to project terminal and following command in console to get the package.json file.

```
npm i 
```

**Step 3:**

Go to project terminal and following command in console to run application:

```
node index.js
```

## Boilerplate Features:
```
* Users 
-Registration 
-Login
-Forgot password
-Payment

* Admins
-Registration 
-Login 
-Forgot password 

* Notification
-Send notification
```
### Folder Structure
Here is the core folder structure which node js provides.

```
NodeJs-Boilerplate/
|- config
|- controller
|- helper
|- model
|- public
|- query
|- response
|- routes
|- schema
|- services
|- .env
|- index.js
```
Here is the folder structure we have been using in this project.
index.js - This is the starting point which will recting to routes/index.js

**npm module**
- dotenv - hat automatically loads environment variables from a . env file into the process. env object.
- express - allows to set up middlewares to respond to HTTP Requests
- path - provides a way of working with directories and file paths.
- express-fileupload -  handle multiple files upload by assigning each file to the req.
- cors - to secure a certain web server from access by other website or domain


```
routes/
|- usersRoute.js
|- adminRoute.js
|- notificationRoute.js
|- stripeRoute.js
|- index.js
```
Http method request are defined in this files. jwt for authentication is imported from helpers/jwt.js. Every route has their controller folder respectively. And module functions are definded with separate files.  
index.js - This is the starting point which will recting to respective routes.
```
helpers/
|- jwt.js
```
jwt.js - JWT is used to authenticate a user. So only authenticate user will able to access APIs. 

**npm module** 
- jsonwebtoken - used to share security information between two parties — a client and a server & to authenticate client/user
- jwt-decode - used to decode JWT token
```
controller/
|- adminController/
|- notificationController/
|- stripeController/
|- userController/
|- index.js
|- common.js
```
index.js -All controllers are definded here. 
Every folder has their own index.js files, which imports module functions for each feature. For example, userConroller/loginUser.js has login function which is used for user login API. 

**npm module**
- moment - used for parsing, validating, manipulating, and displaying dates and times in JavaScript
- crypto-js - used for encryption and decryption purpose
- bcryptjs - used to store of passwords as hashed passwords instead of plaintext.

common.js -All common routes are defined here and import to function files.
model/index.js/responseModel.js
schema/db.js
query/index.js
services/responseService.js
helpers/helpers.js
```
schema/
|- adminSchema.js
|- db.js
|- deviceSchema.js
|- notificationSchema.js
|- notificationUsersSchema.js
|- userSchema.js
```
db.js - It creates connection with database using sequelize. Schema files are imported here. 
Schema files - It defines table structure model.

**npm module** 
- sequelize - it's is a promise-based Node.js ORM tool. used to call sql queries
```
query/
|- index.js
|- query.js
```
query.js - It includes functions that calls sequelize queries.
```
helpers/
|- helpers.js
|- jwt.js
```
helpers.js - Common functions are definded here.for example validations, image upload 

constant.js - Regex validations are definded here. 
```
response/
|- adminsObjects.js
|- index.js
|- notificationObject.js
|- stripeObjects.js
|- usersObjects.js
```
index.js - It's a starting point of this folder.
Every controller returns objects using object file.
```
services/
|- responseService.js
|- emailService.js
```
responseServise.js - Success messages and error object are definded.
emailService.js - HTML templet to send in fotgotpassword api is defined here
```
model/
|- index.js
|- responseModel.js
```
responseModel.js - It returns API's response object.
