import WebSocket from 'ws';
import { Client } from 'pg';

const connectionString = 'postgres://postgres:kgdcgis@localhost:5432/kgdcdb';

const respondWithFailureMsg = (ws: WebSocket) => {
    let responseObj = { requestStatus: 'failure' };
    ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
}

export const downloadfile = (ws: WebSocket, msgObj: any) => {
    
}

export const getfilelist = (ws: WebSocket, msgObj: any) => {
    const { village, currentuniquevillagecode } = msgObj;
    const client = new Client({ connectionString });
    client.connect();

    let getQuery = `SELECT ID, IDENTIFIER, DETAILS, APPROVED, SERVERDATE FROM filesattachment WHERE VILLAGENAME = '${village}' AND UNIQUEVILLAGECODE = '${currentuniquevillagecode}'`;
    client.query(getQuery)
    .then((res) => {
        ws.send(Buffer.from(JSON.stringify(res.rows)).toString('base64'));
    })
    .catch((err) => {
        console.log(err);
        respondWithFailureMsg(ws);
        return 0;
    })
    .finally(() => {
        client.end();
    });
}

export const uploadfile = (ws: WebSocket, msgObj: any) => {
    const { filename, village, details, currentuniquevillagecode, databytea, mimetype, rolecalculated } = msgObj;

    let insertQuery = `INSERT INTO filesattachment (IDENTIFIER, VILLAGENAME, UNIQUEVILLAGECODE, DETAILS, APPROVED, DATA, MIMETYPE, UPLOADERROLE) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
    let insertData = [filename, village, currentuniquevillagecode, details, false, databytea, mimetype, rolecalculated];

    const client = new Client({ connectionString });
    client.connect();

    client.query(insertQuery, insertData)
    .then(() => {
        let responseObj = { requestStatus: 'success', action: 'uploaded' };
        ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
    })
    .catch((err) => {
        console.log(err);
        respondWithFailureMsg(ws);
        return 0;
    })
    .finally(() => {
        client.end();
    });
}