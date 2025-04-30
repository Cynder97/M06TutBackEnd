const express = require("express")
var cors = require('cors')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const jwt = require('jwt-simple')
const user = require('./modles/users')
const Song = require('./models/songs')
const secret = "supersecret"
app.use(cors())
app.use(express.json())

router.post("/user", async(req, res) => {
    if(!req.body.username || !req.body.password){
        req.status(400).json({error: "Missing username or password"})
    }

    const newUser = await new User({
        username: req.body.username,
        password: req.body.password,
        status: req.body.status
    })
    try{
        await newUser.save()
        res.sendStatus(201)
    }
    catch(err){
        res.status(400).send(err)
    }

})

router.get("/songs", async(req, res) => {
    try{
        const songs = await Song.find({})
        res.send(songs)
        console.log(songs)
    }
    catch (err){
        console.log(err)
    }
})

router.get("/songs/:id", async (req, res) => {
    try{
        const song = await Song.findById(req.params.id)
        res.json(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.post("/songs", async(req, res) => {
    try{const song = await new Song(req.body)
        await song.save()
        res.status(201).json(song)
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
        console.log(err)
    }
})

router.put(":/id", async(req, res) => {
    try{
        const song = req.body
        await Song.updateOne({_id : req.params.id,song})
        console.log(song)
    }
    catch(err){
        res.status(400).send(err)
    }
})

router.delete("/songs/:id", async(req, res) => {
    try{
    const song = await Song.findById(req.params.id)
    await Song.deleteOne({ _id: song._id})
    res.sendStatus(204)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.use("/api", router)
app.listen(3000)