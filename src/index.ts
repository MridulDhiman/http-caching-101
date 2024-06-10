import http, { IncomingMessage, Server, ServerResponse } from "http";
import {URL} from "url";

const possibleRoutes = ["/", "/routes"];

const serverCallback = (req: IncomingMessage, res: ServerResponse) => {

    if(!req.url) {
        res.statusCode = 400;
        res.end("Bad Request\n");
    }

const routeUrl = new URL(req.url as string, `http://${req.headers.host}`)

const pathname = routeUrl.pathname;
let method = req.method as string;

if(method === "GET" && pathname ==="/") {
    homeRouteController(req,res);
}

if(method === "GET" && pathname === "/user") {
    userRouteController(req,res);
}



}


const homeRouteController = (req: IncomingMessage, res: ServerResponse) => {
res.end("Hello World\n");
}

const userRouteController = (req: IncomingMessage, res: ServerResponse) => {
    const obj = {
        "message" : "success"
    }

  
    res.writeHead(200, {
        "Content-Type": "application/json",
         "Cache-Control": "private"
        });
res.end(JSON.stringify(obj));
}

const server = http.createServer(serverCallback);


const port : number = 3000;
const hostname : string = "127.0.0.1";


server.listen(port, hostname, ()=>{
    console.log(`Server is running on ${hostname}:${port}`);
});


