import path from 'path'
import grpc from '@grpc/grpc-js'
import protoLoader from '@grpc/proto-loader'

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8082
const PROTO_FILE = './proto/random.proto'

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE))
const grpcObj = (grpc.loadPackageDefinition(packageDef))
const randomPackage = grpcObj.randomPackage

function main() {
    const server = getServer()

    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(`Your server as started on port ${port}`)
            server.start()
        })
}

const todoList = {todos: []}
const callObjByUsername = new Map()

function getServer() {

    const server = new grpc.Server()

    server.addService(randomPackage.Random.service, {


        PingPong: (req, res) => {
            console.log("PingPong:", req.request)
            res(null, {message: "Pong"})
        },


        RandomNumbers: (call) => {
            const {maxVal = 10} = call.request
            console.log("RandomNumbers:", {maxVal})

            let runCount = 0
            const id = setInterval(() => {
                runCount = ++runCount
                call.write({num: Math.floor(Math.random() * maxVal)})

                if (runCount >= 10) {
                    clearInterval(id)
                    call.end()
                }
            }, 500)
        },


        TodoList: (call, callback) => {
            call.on("data", (chunk) => {
                todoList.todos.push(chunk)
                console.log("TodoList:", chunk)
            })

            call.on("end", () => {
                callback(null, {todos: todoList.todos})
            })
        },


        Chat: (call) => {
            call.on("data", (req) => {

                const username = call.metadata.get('username')[0]
                const msg = req.message
                console.log(username, req.message)


                for (let [user, usersCall] of callObjByUsername) {
                    if (username !== user) {
                        usersCall.write({
                            username: username,
                            message: msg
                        })
                    }
                }

                if (callObjByUsername.get(username) === undefined) {
                    callObjByUsername.set(username, call)
                }
            })

            call.on("end", () => {
                const username = call.metadata.get('username')[0]
                callObjByUsername.delete(username)
                for (let [user, usersCall] of callObjByUsername) {
                    usersCall.write({
                        username: username,
                        message: "Has Left the Chat!"
                    })
                }
                console.log(`${username} is ending their chat session`)

                call.write({
                    username: "Server",
                    message: `See you later ${username}`
                })

                call.end()
            })
        }

    })

    return server
}

main()