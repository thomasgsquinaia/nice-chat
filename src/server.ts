import express, { Application } from 'express'
import http from 'http'
import { Server } from 'socket.io'
const PORT = 3001
class App {
    private app: Application
    private http: http.Server
    private io: Server

    constructor() {
        this.app = express()
        this.http = http.createServer(this.app)
        this.io = new Server(this.http)
        this.listenSocket()
        this.setupRoutes()
    }
    listenServer() {
        this.http.listen(PORT, () => console.log(`server is running in http://localhost:${PORT}`))
    }
    listenSocket() {
        this.io.on('connection', (socket) => {
            socket.on('message', (msg) => {
                this.io.emit('message', (msg));
            })
        })
    }
    setupRoutes() {
        this.app.get("/", (req, res) => {
            res.sendFile(__dirname + "/index.html")
        })
    }
}

const app = new App()

app.listenServer()