# Entrega 4

## Tasks
- [x] Set up our project to work with Handlebars and websocket.
- [x] Configure the server to integrate the Handlebars template engine and install a socket.io server on it.

- [x] Create a "home.handlebars" view containing a list of all the products added so far.

- [ ] Also, create a "realTimeProducts.handlebars" view, which will live at the "/realtimeproducts" endpoint in our views router; this will contain the same list of products, but it will work with websockets.
    - [ ] When working with websockets, every time we create a new product or delete one, the list in that view should automatically update.

### Suggestions
- Since the connection between an HTTP query and websocket is not covered in class, it is recommended to create a simple form in the realTimeProducts.handlebars view for the creation and deletion of a product. The content should be sent from websockets and not HTTP. However, this is not the best solution, read the next point.
- If you want to make the connection of socket emits with HTTP, you should find a way to use the Sockets io server within the POST request.

### Delivery Format
✓ Link to the Github repository, which must include the entire project.
✓ Do not include node_modules

#### Testing Process
- [x] The server will be installed and run on the indicated port.
- [x] The server should wake up without problem.
- [x] The root path will open
- [x] The content of the index.handlebars view should be displayed
- [x] The websocket should not be activated yet.
- [x] The path “/realtimeproducts” will be searched in the browser url.
- [x] It will be confirmed that the server has connected with the client; a “client connected” message should be displayed in the server console.
- [x] The list of products should be displayed and it will be confirmed that it is being sent from websocket.


## Pre challenge setup and verification
- [x] Express Server Preparation: Make sure you have an Express server already configured.
- [x] Installation of Dependencies:
  1. [x] Install express for your server.
  2. [x] Install express-handlebars to work with Handlebars templates.
  3. [x] Install socket.io, required for implementing Websockets on both the client and server.
- [x] Configuring Socket.io. (app.js), integrating it with Express and Handlebars.
- [x] Raise the Client-Side Socket. (websocket.js) Create a new instance of the socket and connect it to the server.