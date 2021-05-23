import http from 'http';
import WebSocket, { Server } from 'ws';
import { handlegeojsons } from './handlegeojsons';
import { checkuser } from './authenticator';

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write('WS Servers Running Fine!');
    res.end();
});

const geojsonwsserver = new Server({ noServer: true });

geojsonwsserver.on('connection', (ws: WebSocket, request: any) => {
    handlegeojsons(ws, request);
});

server.on('upgrade', (request, socket, head) => {
    const reqUrl = new URL(request.url, request.headers.origin);
    const searchParams = reqUrl.searchParams;
    // console.log(searchParams, reqUrl);

    const { validuser, roles } = checkuser(searchParams);
    console.log(validuser, roles);

    if(validuser){
        switch (reqUrl.pathname){
            case '/getgeojsons': 
                geojsonwsserver.handleUpgrade(request, socket, head, (ws: WebSocket) => { geojsonwsserver.emit('connection', ws, request); });
                break;
            
        }
    } else {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }
});

const port = 3010;
server.listen(port, () => {
    console.log(`Server listening On Port: ${port}`);
});