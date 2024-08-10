import { createServer } from "http";
import { readFile } from "fs";
import { URL } from "url";
import { extname } from "path";

createServer(function (req, res) {
  let myUrl = new URL(req.url, `http://${req.headers.host}`);
  let filename = "." + myUrl.pathname;

  if (filename === "./") {
    filename = "./index.html";
  } else if (extname(filename) === "") {
    filename += ".html";
  }

  console.log(filename);

  readFile(filename, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/html" });
      return res.end("404 Not Found");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    }
  });
}).listen(8080);
console.log("Server Is Running On Port 8080");
