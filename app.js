const express = require('express')
const multer = require('multer')

const { post_save, get_posts } = require('./db.js')
const config = require('./config.js')

const storage = multer.diskStorage({
    destination: config.img_folder_path,
    filename:  (req, file, cb) => {
        const name = Date.now() + '' + Math.round(Math.random() * 1E9) + '.jpg'
        cb(null, name)
    } 
})
const upload = multer({ storage: storage })

const app = express()

app.post('/create_post', upload.single('post_photo'), (req, res) => {
    post_save(req.file.filename, req.body.text)
    res.send(req.ramer)
})

app.get('/', async (req, res) => {
    posts = get_posts()
    res.send(await posts.find({}).toArray())
})

app.listen(config.app.port, () => {
    console.log('visment ${port}')
})