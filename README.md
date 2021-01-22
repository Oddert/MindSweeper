# MindSweeper

Satirical project to implament MineSweeper but with no bomb clues. Based on a community joke from a wholesome streamer. Was much enjoyed.

Front end built with React / Redux, backend built with express, MongoDB / Mongoose for storage.

## Live Demo
[https://oddert-mindsweeper.glitch.me/](https://oddert-mindsweeper.glitch.me/)

## Installation
You will need to setup a mongodb server and connect it via an .env file
```
$ git clone https://github.com/Oddert/MindSweeper.git
$ cd MindSweeper
$ npm i
$ npm run install-client
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm run build
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| start  | node app.js                                    | runs the server                                |
| server | nodemon app.js                                 | runs the server with auto restart              |
| client | cd client && npm start                         | starts the development server for the client   |
| dev    | concurrently "npm run server" "npm run client" | run both the client and server for development |
| client-install | cd client && npm install | installs te client development environment |