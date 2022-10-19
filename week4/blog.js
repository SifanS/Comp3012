const fs = require('fs');
const path = require('node:path')

let readFilePromise = function (filename) {
    return new Promise( (resolve, reject) => {
        fs.readFile(filename, function (err, data) {
            if (err)
                reject(err);
            else
                resolve(data);
        });
    });
};

let writeFilePromise = function (postTitle, postContent, blogName) {
    //replace space in title to _.
    postTitle = postTitle.replace(/ /g, "_");

    const postPath = path.join(__dirname, blogName, `${postTitle}.txt`)
    return new Promise(function (resolve, reject) {
        fs.writeFile(postPath, postContent, { flag: 'wx' }, (err) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    //appending to orignal post tile so not overwritten
                    writeFilePromise(postTitle + '_new', postContent, blogName);
                    reject(`${postTitle} exists already`);
                } else if (err.code === 'ENOENT') {
                    //Show error message when blogName not exists
                    reject(`${blogName} doesn't exist`);
                } else {
                    reject(err);
                }
            }
            else
                resolve(`${postTitle} created successfully`);
        });
    });

};


let appendFilePromise = function (filename, data) {
    return new Promise(function (resolve, reject) {
        fs.appendFile(`${filename}`, data, (err) => {
            if (err) reject(err);
            else
                resolve(data);
        });
    });
};

let updateFilePromise = function (postPath, postContent) {
    //replace space in title to _.
    return new Promise(function (resolve, reject) {
        fs.writeFile(postPath, postContent, (err) => {
            if (err) reject(err); 
            else
                resolve(`Liked`);
        });
    });

};

let createDirectoryPromise = function (filename) {
    return new Promise(function (resolve, reject) {
        //create a directory called "blogName"
        fs.mkdir(`${filename}`, (err) => {
            //print an error saying to choose a blog with another name. 
            if (err) {
                reject('blog already exists, choose another name');
            }
            else
                //print a message when the directory has been created successfully
                resolve(`${filename} is created`);
        });
    });
};


function register(username, password) {
    return readFilePromise("database.txt").then(data => {
        if (data.includes(username)) {
            throw Error("username already registered.");
        } else {
            appendFilePromise("database.txt", `${username} ${password}\r\n`);
        }
    })
};

function createABlog(blogName) {
    return createDirectoryPromise(blogName).then((msg) => console.log(msg));
}

function createAPost(postTitle, postContent, blogName) {
    const content = `likes: 1\r\nlikedBy: you\r\n${postContent}`;
    return writeFilePromise(postTitle, content, blogName).then((msg) => console.log(msg));
}

function likePost(blogName, postTitle, username) {
    return readFilePromise("database.txt").then(data => {
        if (data.includes(username)) {
            postTitle = postTitle.replace(/ /g, "_");
            const postPath = path.join(__dirname, blogName, `${postTitle}.txt`);
            readFilePromise(postPath).then(data => {
                let likes = String(data).match(/likes: \d/g);
                likes = parseInt(likes[0].split(/ /g)[1]) + 1;
                let likedBy = String(data).match(/likedBy: .*/g)[0] + `,${username}`;
                data = String(data).replace(/likes: \d/g, 'likes: ' + likes);
                data = String(data).replace(/likedBy: .*/g, likedBy)
                updateFilePromise(postPath, data).then((msg) => console.log(msg));
            })
        } else {
            throw Error(`${username} is not registered`);
        }
    });
}
// register("john", "123")
// .then(() => createABlog("bcitBlog"))
// .then(() => createAPost("some title", "some content", "bcitBlog"))
// .then(() => likePost("bcitBlog", "some_title", "john"))
// .catch(err => console.log(err))