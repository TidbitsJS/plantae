# Plants API

A REST API created using Node.js & TypeScript. It does all CRUD operations to manage a plant database. The primary purpose of the project is to get familiarized with developing the backend with TypeScript.

GraphQL Version of the API is [here](https://github.com/TidbitsJS/PlantQL)

A specific plant has following properties:
* Name
* Scientific Name
* Family
* Description
* userId

A specific user has following properties:
* Name
* Username
* Email
* Password
* Plants ( Created )


#

### Setup

Project requirements

- git
- NodeJS
- NPM
- nodemon

**nodemon** is a tool that helps develop node. js based applications by automatically restarting the node application when file changes in the directory are detected.

To verify the installation of above, you can run this:

```shell
  git --version
  node --version
  npm --version
  nodemon --version
```

After you've made sure to have the correct things installed, you should be able to just run a few commands to get set up:

1. Clone the repo

```shell
  git clone https://github.com/TidbitsJS/plantae.git
  cd plantae
```

2. Install node modules

```shell
  npm install
```

3. Setup a new project on [MongoDB](https://www.mongodb.com/) platform
4. Store the MonoDB URL in env file

```text
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.eqcqa.mongodb.net/plants?retryWrites=true&w=majority
```

#

### Running the App

To run the app, run the command:

```shell
  npm start
```

To run the app in debug mode, run the command:

```shell
  npm run debug
```

Local server will start running on the port 4040
