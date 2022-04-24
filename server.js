const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send('<meta http-equiv="refresh" content="0; URL=https://localhost:80/"/>')
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Ready")
  })
}

module.exports = keepAlive
