const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      cookieParser  = require('cookie-parser'),
      mongoose      = require('mongoose'),
      path          = require('path'),
      helmet        = require('helmet');

const Score         = require('./models/Score')

app.use(helmet({
  frameguard: {
    action: 'deny'
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      frameSrc: ["'twitch.tv'"],
      styleSrc: ["'self'"]
    }
  },
  hidePoweredBy: {
    setTo: 'PHP 4.2.0'
  },
  dnsPrefetchControl: true
}))

require('dotenv').config()

mongoose.connect(process.env.DATABASE)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname + '/production_build')));

app.use(require('express-session')({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: false
  }
}))


app.get('/api', (req, res) => {
  console.log("/api route hit")
  res.json({
    message: 'Hello from the API',
    also: 'go away'
  })
})

app.get('/api/scores', (req, res) => {
  console.log('### Sending scores')
  Score.find({}, (err, scores) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err })
    } else {
      res.status(200).json({ scores })
    }
  })
})

app.post('/api/scores', (req, res) => {
  console.log("### going to add a new user score");
  if (req.body.username === 'Anon') {
    Score.create(req.body, (err, createdScore) => {
      if (err) {
        console.log(err)
        res.status(500).json({ err })
      } else {
        res.status(200).json({ createdScore })
      }
    })
  } else {
    Score.count({ username: req.body.username }, (err, count) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err })
      } else {
        if (count > 0) {
          Score.findOne({ username: req.body.username }, (err, updatedScore) => {
            if (err) {
              console.log(err);
              res.status(500).json({ err })
            } else {
              if (updatedScore.score <= req.body.score) {
                updatedScore.score = req.body.score
              }
              updatedScore.date = Date.now
              updatedScore.save(err => {
                console.log('... update success:')
                console.log(updatedScore)
                res.status(200).json({ updatedScore })
              })
            }
          })
        } else {
          Score.create(req.body, (err, createdScore) => {
            if (err) {
              console.log(err)
              res.status(500).json({ err })
            } else {
              console.log('... create success:')
              console.log(createdScore)
              res.status(200).json({ createdScore })
            }
          })
        }
      }
    })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = 5000 //process.env.PORT || 5000
app.listen(PORT, () => console.log(`${new Date().toLocaleTimeString()}: Server initialising on port: ${PORT}`))
