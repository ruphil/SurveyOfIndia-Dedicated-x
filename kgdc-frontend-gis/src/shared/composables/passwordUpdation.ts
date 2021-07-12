import store from '@/shared/store';

import globalToast from './globalToast';

const passwordUpdation = () => {
    const { showGlobalToast } = globalToast();

    const updatePassword = (oldpassword: string, newpassword: string) => {
        const username = store.getters.getUsername;
        const password = store.getters.getPassword;

        let requestObj = {
            request: 'changepassword',
            validateusername: username,
            validatepassword: password,
            oldpassword,
            newpassword
        };

        console.log(requestObj);

        let wssURL = store.getters.getUsersModuleWSS;
        let ws = new WebSocket(wssURL);
    
        ws.addEventListener('message', (event) => {
            let responseObj = JSON.parse(Buffer.from(event.data, 'base64').toString());
            console.log(responseObj);

            if(responseObj.requestStatus == 'success'){
                showGlobalToast('Password Changed Successfully...');
            } else {
                showGlobalToast('Error Changing Password...');
            }

            ws.close();
        });

        ws.addEventListener('open', (event) => {
            ws.send(btoa(JSON.stringify(requestObj)));
        });
    }

    return { updatePassword }
}

export default passwordUpdation;