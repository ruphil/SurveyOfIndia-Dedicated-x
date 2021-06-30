import WebSocket from 'ws';
import { Client } from 'pg';

const connectionString = 'postgres://postgres:kgdcgis@localhost:5432/kgdcdb';

import { checkAdminUser } from '../common-ts/userRolesAdminCheck';

export const addDrone = async (ws: WebSocket, msgObj: any) => {
    let insertQuery = `INSERT INTO drones (DRONENUMBER) VALUES ($1)`;
    let { dronenumber } = msgObj;
    let insertData = [dronenumber];

    checkAdminUser(msgObj)
    .then((res: any) => {
    
        const client = new Client({ connectionString });
        client.connect();

        client.query(insertQuery, insertData)
        .then(() => {
            let responseObj = {
                response: 'adddrone', requestStatus: 'success', action: 'droneadded'
            };

            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .catch((err) => {
            // console.log(err);
            let responseObj = { response: 'adddrone', requestStatus: 'failure', action: 'SQL Error' };
            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .finally(() => {
            client.end();
        });
    })
    .catch((err) => {
        // console.log(err);
        let responseObj = { response: 'adddrone', requestStatus: 'failure', error: 'Admincheck Error' };
        ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
    })
}

export const getDrones = (ws: WebSocket, msgObj: any) => {
    checkAdminUser(msgObj)
    .then((res: any) => {
        const client = new Client({ connectionString });
        client.connect();

        let getQuery = `SELECT * FROM drones`;
        client.query(getQuery)
        .then((res) => {
            let droneslist = res.rows;

            droneslist = droneslist.filter((user: any) => {
                let roles = user.roles;

                try {
                    let rolesArry = roles.split(',');
                    console.log(rolesArry);

                    if(rolesArry.includes('ADMIN')){
                        return false;
                    } else {
                        return true;
                    }
                } catch (e) { return true; }
                
            });

            let responseObj = {
                response: 'getdrones', requestStatus: 'success', droneslist
            };

            // console.log(responseObj);
    
            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .catch((err) => {
            // console.log(err);
            let responseObj = { response: 'getdrones', requestStatus: 'failure', error: 'SQL Error' };
            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .finally(() => {
            client.end();
        });
    })
    .catch((res: any) => {
        let responseObj = { response: 'getdrones', requestStatus: 'failure', error: 'Admincheck Error' };
        ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
    });
}

export const removeDrone = (ws: WebSocket, msgObj: any) => {
    checkAdminUser(msgObj)
    .then((res: any) => {
        const client = new Client({ connectionString });
        client.connect();

        let { dronetodelete } = msgObj;

        let sqlQuery = `DELETE FROM drones WHERE DRONENUMBER='${dronetodelete}'`;
        client.query(sqlQuery)
        .then(() => {
            let responseObj = { response: 'deletedrone', requestStatus: 'success', adminuser: true, action: 'deleted' };
            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .catch((err) => {
            // console.log(err);
            let responseObj = { response: 'deletedrone', requestStatus: 'failure', error: 'SQL Error' };
            ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
        })
        .finally(() => {
            client.end();
        });
    })
    .catch((res: any) => {
        let responseObj = { response: 'deletedrone', requestStatus: 'failure', error: 'Admincheck Error' };
        ws.send(Buffer.from(JSON.stringify(responseObj)).toString('base64'));
    });
}
