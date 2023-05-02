/*Start this server by running: npm run start

This basic server will run on port 3001, accepts calls from any origin, and has one API endpoint for /authenticate.

This endpoint takes a username from the request body, and retuns a fake User object.

Chatengine is the API used, it produces the product id and private key
*/
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  /*
  import axios to make an API call the Chat Engine. 
  We use the “Get or Create User” call to fetch or create this user
  - depending on if they already exists.
  */ 
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "a49934d8-c803-466f-92df-c662d12384e6" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});
app.listen(3001);