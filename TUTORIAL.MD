# How to use: 

## FRONTEND

To send a request, use the fetch function (for basic example, see Frontend/src/components/zipcodeForm_c.js)

Needs to exist in a class that extends component from react. (see header)

Build what everything appears like using the render() function. 

The return values will be given in .then((response) => {}

This will give the response, you can store the response here. 

## BACKEND

To recieve the request, make sure that a route that matches the fetch route exists. 

There must be different router.post, router.get functions for post and get responses. 

The function in the response holds req, res, and next. req is the request from the client (frontend), it is a dictionary (JSON). res is the response that is being sent. It needs to be created and sent, create and build a JSON for that and send it using JSON.stringify(). it must be parsed on the other side by JSON.parse(). next allows for people to ignore the request. It allows for people to throw away bad requests.    

### How to run

There are 2 folders here, frontend and backend. enter both of these and run `npm start` in both. 

These will start the server and the frontend. 

Currently this exists in a state where entering a value in the landing page on the frontend sends a message and a response is sent back. 

Open the console using `ctrl-shift-i` or `f12` to see responses. look at the network and console tabs to see communication occur. 
## Global Changes

Package.JSON must be updated with the proxy route to the server. It is just the line 
`"proxy": "http://localhost:8000"`
That will eventually be changed to whatever we are hosting it as. 

To convert the entire thing into a frontend and backend, first take the frontend (Ouluxx), and place that in a subfolder, then create a new folder for the backend. The backend can be instantiated by copying this branches backend directory, or by instantiating an expressjs project. 

Creating an express js project involves running `npm init` then `npm install --save express` with nodejs installed. 

## FRONTEND

Creating a function to send a request: 
	`const Get_Stores = (json_data) => { ... }`
This is a const function Get_Stores, it takes a JSON/dictionary/hashmap as an argument, and sends it to the server. 

Sending it across uses the fetch function. This returns a promise, we will return to that later. Fetch takes several arguments, the first is the route that the request will be sent to, the next is a dictionary containing the headers, including whether it is POST or GET, and and the body of the argument, the stringified JSON. 

This is followed by the then functions. These allow for error checking the servers response, for catching errors, and for responding to a correct (response code 200) response. 

If we want to use the data outside the function, we must return the promise. Server communication is asynchronous, meaning that simply setting a value equal to the servers response will leave the value as undefined. Therefore, returning the promise allows us to use the value later. Promises are object types that say, there is supposed to be something that exists here, but it does not yet do so. When the server returns a value, the promise is changed, both to have a status indicator saying it is fulfilled, and having the returned value saved to the variable. This allows for asynchronous values to be used outside of the fetch function. 

To use a promise, have a variable be set equal to the return value of a fetch function, and then, use the variable name (foo), and call the then function on it, with the argument being an anonymous function where the argument is the response, `foo.then( (response)=> { ... })`. This is a callback function. 

## BACKEND

Connecting to the database using mongoose first requires that mongoose and mongodb be installed. Mongodb is software avialable from `mongodb.com/`, and mongoose is installed with `npm install mongoose --save` in the folder where the server is. Mongoose is a tool that streamlines connecting and interacting with mongodb databases. 

MongoDB is a NoSQL database system. When running softaware that connects to the database, the database needs to be runnning. This is done by running `.\mongod.exe` or the equivalent of the executable in the folder where it is installed (such as `C:\Program Files\MongoDB\Server\%version number%\bin`). While this is running, the mongodb instance exists and is interactable with on your computer. It is easier to see the database using MongoDB Compass, a piece of software that provides a GUI for looking at the databases, it is unnecassary as in the same folder as `./mongod.exe` is run, `./mongo.exe` can be run, and it allows command line control of the databases. 

Mongoose simplifies the connection to the database. It allows much more streamlined database interaction. It involves the creation of schemas, which serve as object prototypes that allow for the easy creation of many different objects that share the same base, but have different data. That schema must then be built into a model. This model is what is used to build the dictionary and save the data in the database.   

Recieving requests requires that a message be sent to a route. The routes are defined in /Backend/server.js. The routes are defined by importing (the require function) a page stored ing `/Backend/routes/....js`. These are the files where routing is stored. In each of these, you can have `router.get()` and `router.post()` functions. These are all indexed somehow, with each being an extension of a route. Fo0r example, `/` is the index, and wioll tell you how to respond to each request to that specific page. Hoever, they can also have `/foo` and responds to things that send a request of the appropriate type to `/routename/foo`. 

For recieving data using `router.get()` and `router.post()`, they each take several arguments. The first is the path, discussed above, and the second is an asynchronous function `async function(req, res, next) { ... }`. This function takes the request, which is what is what the server recieves, the response, which is what the server responds to the client, and next, which allows for the server to ignore the request. Because this is asynchronous, when the database item is built, to save it to the database, the function must have the `await` keyword prepended to protect from asynchronous errors as such: `await newitem.save();`. 

Building the object to save to the database involves creating a variable that is set equal to a new mongoose model. Passed to the model will be the values that are to be included to be stored in the database. This is very similar to building a JSON/dictionary/hashmap. 

### How to run

There are 2 folders here, frontend and backend. Enter both of these and run `npm start` in both. 

These will start the server and the frontend. 

While using the client, look at the console using `ctrl-shift-i` or `f12` to see responses, the network tab will contain more information. 

It is possible to use the chrome extension `YARC` (Yet Another Rest Client) that allows sending custom requests to specific addresses to test behavior without needing to write different code and restarting the website. 

You will not need to open the server in a browser. 

#### Examples
- [Tutorial part 1](https://blog.cloudboost.io/react-express-the-nodejs-way-of-reacting-and-expressing-7a518e4da3)
- [Tutorial part 2](https://medium.com/@avanthikameenakshi/crud-react-express-99025f03f06e)
- [Example code from tutorial](https://github.com/AvanthikaMeenakshi/uthiramapp/blob/master/frontend/src/components/DonorRegistration/index.js)
- [mongoose docs](https://mongoosejs.com/docs/guide.html)
- [Mongoose Tutorial](https://zellwk.com/blog/local-mongodb/)

#### Further reading
- [next](https://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for)
- [Routes](https://medium.com/swlh/full-stack-app-with-react-and-node-express-b62e45aa33c7)

#### API references
- [node](nodejs.org/en/)
- [mongoose](mongoosejs.com/docs/)
- [expressJS](https://expressjs.com/)