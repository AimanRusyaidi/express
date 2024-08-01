//post method//


import express from 'express';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

// Middleware to log the HTTP method and URL of each incoming request

const loggingMiddleware = (req, res, next) => {
    // Log the method (e.g., GET, POST) and the URL of the request
    console.log(`${req.method} - ${req.url}`);
    // Call next() to pass control to the next middleware function or route handler
    next();
    };
app.use(loggingMiddleware);
app.get("/", (req, res) => { res.status(201).send({ message: "Hello World", }); })


const mockUsers = [
    { id: 1, name: "hafiz", age: 34, },
    { id: 2, name: "mel", age: 25, },
    { id: 3, name: "niqi", age: 27, },
    { id: 4, name: "adam", age: 25, },
    { id: 5, name: "yunus", age: 24, },
    { id: 6, name: "ahmad", age: 25, },
    { id: 7, name: "isma", age: 27, },
    { id: 8, name: "mashi", age: 25, },
    { id: 9, name: "faris", age: 22, },
    { id: 10, name: "pJ", age: 23, },
    { id: 11, name: "yatt", age: 32, },
    { id: 12, name: "nurul", age: 25, },
    { id: 13, name: "zarina", age: 25, },
    { id: 14, name: "fitri", age: 27, },
    { id: 15, name: "zayn", age: 23, },
    { id: 16, name: "aini", age: 31, },
    { id: 17, name: "shahirah", age: 32, },
    { id: 18, name: "lan", age: 23, },
    { id: 19, name: "wan", age: 32, },
    { id: 20, name: "iqbal", age: 25, },
    { id: 21, name: "kerul", age: 25, },
    { id: 22, name: "hamzah", age: 25, },
    { id: 23, name: "syaheerah", age: 30, },
    { id: 24, name: "mai", age: 23, },
    { id: 25, name: "mino", age: 22, },
];


app.get("/api/users", (req, res) => {
    console.log(req.query);
    const {
        query: { filter, value },
    } = req;
    if (!filter || !value) return res.send(mockUsers);
    if (filter && value) {
        const filteredUsers = mockUsers.filter((user) => user[filter].includes(value));

        return res.send(filteredUsers)
    };
})


app.get("/api/products", (req, res) => {
    res.status(201).send([{
        id: 1, name: "iPhone", price: 1000, category: "Electronics",
    },
    { id: 2, name: "Laptop", price: 2000, category: "Electronics", },
    { id: 3, name: "Tablet", price: 3000, category: "Electronics", }]);
})
// Define a route handler for POST requests to the "/api/users" endpoint
app.post("/api/users", (req, res) => {
    // Log the request body to the console for debugging purposes
    console.log(req.body);

    // Destructure the body property from the request object
    const { body } = req;

    // Create a new user object
    // Assign a new id by taking the id of the last user in the mockUsers array and adding 1
    // Spread the properties from the request body into the new user object
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };

    // Add the new user to the mockUsers array
    mockUsers.push(newUser);

    // Send a response with status code 201 (Created) and the new user object
    return res.status(201).send(newUser);
});



//query parameter
// app.get("/api/users", (req, res) => {
//     console.log(req.query);
//     const {
//         query: { filter, value },
//     } = req;
//     if (!filter && !value) return res.send(mockUsers);
//     if (filter && value) return res.send(
//         mockUsers.filter((user) => user[filter].includes(value)))

//     res.send(mockUsers)
// });


//route parameter

app.get("/api/users/:id", (req, res) => {
    console.log(req.params);
    const parseId = parseInt(req.params.id);
    console.log(parseId);
    if (isNaN(parseId)) {
        return res.status(400).send({ msg: "Bad request. Invalid ID" });
    }
    const finduser = mockUsers.find((user) => user.id === parseId);
    if (!finduser) {
        return res.status(404).send({ msg: "User not found" });
    }
    res.status(200).send(finduser);

})


app.put("/api/users/:id", (req, res) => {
    const parseId = parseInt(req.params.id);
    if (isNaN(parseId)) return res.sendStatus(400);
    const finuserIndex = mockUsers.findIndex((user) => user.id === parseId);
    if (finuserIndex === -1) return res.sendStatus(404);
    mockUsers[finuserIndex] = { id: parseId, ...req.body };
    return res.sendStatus(200);
});


// Define a route handler for PATCH requests to the "/api/users/:id" endpoint

app.patch("/api/users/:id", (req, res) => {

    // Destructure the body of the request and the 'id' parameter from the URL

    const {

        body,

        params: { id },

    } = req;

    // Parse the 'id' parameter from the URL to an integer

    const parseId = parseInt(id);

    // Check if the parsed 'id' is not a number

    // If so, send a 400 Bad Request status

    if (isNaN(parseId)) return res.sendStatus(400);

    // Find the index of the user in the mockUsers array with the matching 'id'

    const finuserIndex = mockUsers.findIndex((user) => user.id === parseId);

    // Check if no user with the given 'id' was found

    // If so, send a 404 Not Found status

    if (finuserIndex === -1) return res.sendStatus(404);

    // Merge the existing user object with the new data from the request body

    // This updates only the fields provided in the request body

    mockUsers[finuserIndex] = { ...mockUsers[finuserIndex], ...body };

    // Send a 200 OK status to indicate that the update was successful

    return res.sendStatus(200);

});


app.delete("/api/users/:id", (req, res) => {

    // Destructure the 'id' parameter from the request parameters

    const {

        params: { id }

    } = req;

    // Parse the 'id' parameter to an integer

    const parseId = parseInt(id);

    // Check if the parsed ID is not a number, if so, return a 400 Bad Request status

    if (isNaN(parseId)) return res.sendStatus(400); // Bad Request

    // Find the index of the user with the given ID in the mockUsers array

    const userIndex = mockUsers.findIndex((user) => user.id === parseId);

    // If the user is not found (index is -1), return a 404 Not Found status

    if (userIndex === -1) return res.sendStatus(404); // Not Found

    // Remove the user from the mockUsers array using splice

    mockUsers.splice(userIndex, 1);

    // Return a 200 OK status to indicate the user was successfully deleted

    return res.sendStatus(200); // OK

});




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})



