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

You will not need to open the server in a browser. 

#### Examples
- [Tutorial part 1](https://blog.cloudboost.io/react-express-the-nodejs-way-of-reacting-and-expressing-7a518e4da3)
- [Tutorial part 2](https://medium.com/@avanthikameenakshi/crud-react-express-99025f03f06e)
- [Example code from tutorial](https://github.com/AvanthikaMeenakshi/uthiramapp/blob/master/frontend/src/components/DonorRegistration/index.js)

#### Further reading
- [next](https://stackoverflow.com/questions/13133071/express-next-function-what-is-it-really-for)
- [Routes](https://medium.com/swlh/full-stack-app-with-react-and-node-express-b62e45aa33c7)

#### API references
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [expressJS](https://expressjs.com/)