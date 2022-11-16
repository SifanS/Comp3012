const fs =  require("fs").promises;
var path = require('path');

const callback = (msg) => {console.log(msg)};

const register =(username, password, callback)=>{
  return  fs.readFile("database.txt","utf8").then(data =>{
        if(data.includes(username)){
            callback("Error: username already exists");
        }else{
            fs.appendFile("database.txt", username + " "+password);
        }
    })
}

const createABlog = (blogName, callback) => {
    const dir = __dirname + '/' +blogName;
  return  fs.mkdir(blogName).catch(err => {
        callback("Error: blog already exists");
    });
}

const createPost = (postTitle, postContent, blogName, callback) =>{
    var blogPath = path.join(blogName, postTitle);

    const content = `likes: 1\r\nlikedBy: you\r\n${postContent}`;
    return fs.writeFile(blogPath, content,{ flag: 'wx' })
    .catch(err => {
        if(err.code === 'EEXIST'){
            createPost(postTitle + "_temp",content, blogName, callback);
        }else{
            callback("Error: blog doesn't exist");
        }
    });
}
const likePost = (blogName, postTitle, username, callback) =>{
    return fs.readFile("database.txt").then(data => {
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


exports.register = register;
exports.callback = callback;
exports.createABlog=createABlog;
exports.createPost =createPost;
exports.likePost = this.likePost;