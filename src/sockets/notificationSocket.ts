// import { Server } from 'http';
// import { WebSocketServer, WebSocket } from 'ws';

// let wss: WebSocketServer;

// export const initWebSocket = (server: Server) => {
//   wss = new WebSocketServer({ server });

//   wss.on('connection', (ws: WebSocket) => {
//     console.log('Client connected');
//     ws.on('close', () => console.log('Client disconnected'));
//   });
// };

// export const broadcast = (message: string) => {
//   if (!wss) {
//     return;
//   }
//   wss.clients.forEach(client => {
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(message);
//     }
//   });
// };