const server = require('./server.js')

server.listen(8000, () => {
    console.log("Server is running on http://localhost:8000")
})