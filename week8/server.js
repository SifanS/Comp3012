const fs = require("fs");
const http = require("http");
const qs = require("querystring");
const PORT = 8006;
const server = http.createServer((req,res)=>{
    if(req.method === "GET"){
        if(req.url ==="/contact"){
            res.writeHead(200, {"content-type":"text/html"});
            fs.createReadStream("contact.html","utf8").pipe(res);
        }else{
            res.writeHead(200, {"content-type":"text/html"});
            fs.createReadStream("index.html","utf8").pipe(res);
        }
    }else if(req.method === "POST"){
            let body = "";
            req.on('data', (chunk)=>{
            body  += chunk;
        }).on('end',()=>{
           const parsedBody =  qs.parse(body);
            if(parsedBody.ctof){
                const temp = parsedBody.temperature * (9/5) + 32;
                res.end(`<h1>The temperature converted in fahrenheit is ${temp} </h1> <a href="/index">Home</a>`);

            }else{
                const temp = (parsedBody.temperature -32) * 5/9;
                res.end(`<h1>The temperature converted in celsius is ${temp} </h1>  <a href="/index">Home</a>`);
            }

        })
    }
})

server.listen(PORT, ()=>{
    console.log("sever is listening")
})