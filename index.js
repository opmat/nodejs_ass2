const http = require('http');
var fs = require('fs'); 
const path = require('path')

//create a server
const server = http.createServer(function(req, resp){
    let url = "http://jsonplaceholder.typicode.com/posts";

    http.get(url,(res) => {
        let body = "";

        res.on("data", (chunk) => {
            body += chunk;
        });

        res.on("end", () => {
            try {
                // let json = JSON.parse(body);
                // Create Directory "result" if not existing
                try {
                    if (!fs.existsSync(path.resolve('result'))) {
                      fs.mkdirSync(path.resolve('result'))
                    }

                    //write json content to file
                    fs.writeFileSync(path.resolve('result', 'posts.json'), body, function (err) { 
                    if (err)
                        console.log("FILE WRITE ERROR: %s",err);
                    else
                        console.log('Write operation completed!');
                    });
                } catch (err) {
                    console.error("DIRECTORY CHECK ERROR: %s",err)
                }
                
            } catch (error) {
                console.error("JSON PARSE ERROR: %s",error.message);
            };
        });

    }).on("error", (error) => {
        console.error("GET ERROR: %s",error.message);
    });

    resp.writeHead("200", "Content-Type: text/plain");
    resp.end("Action Completed!")

});

//create a port
server.listen(3333, '127.0.0.1', () => {
    console.log(`Server is running on http://localhost:3333`);
});