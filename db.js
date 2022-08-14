const config = require('./config.js')
const { MongoClient } = require('mongodb')
const { db } = require('./config.js')

const db_uri = 'mongodb+srv://cluster0.srfdzan.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority'
const client = new MongoClient(
    db_uri,
    {
        sslKey: config.db.path_to_certificate,
        sslCert: config.db.path_to_certificate
    }
)

async function post_save(img_url, text, author='') {
    const post = {
        img_url: img_url,
        text: text,
        author: author,
        create_date: Date()
    }
    try {
        await client.connect()
        const db = client.db('Cluster0')
        const posts = db.collection('posts')
        const res = await posts.insertOne(post)
        console.log('Added 1 post')
    } finally {
        await client.close()
    }
}

function get_posts() {
    return client.db('Cluster0').collection('posts')
}

module.exports = { post_save, get_posts }