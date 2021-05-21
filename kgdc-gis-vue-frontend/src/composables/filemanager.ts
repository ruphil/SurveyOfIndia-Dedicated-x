import globalToast from './globalToast';
import socketClient from './socketClient';

const fileuploader = () => {
    const { showGlobalToast } = globalToast();
    const { makeSocketRequestNClose } = socketClient();

    function b64EncodeUnicode(str: any) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode(parseInt(p1, 16))
        }))
    }

    const uploadfile = (file: any, village: any, details: any, currentuniquevillagecode: any, mimetype: any, rolecalculated: any, uploadedby: any) => {
        return new Promise((resolve, reject) => {
            let filename = file.name;

            let reader = new FileReader();
            reader.onload = function () {
                // console.log(reader.result);
                // let arrayBuffer = <ArrayBuffer>reader.result;
                // let bytes = new Uint8Array(arrayBuffer);
                // console.log(bytes);

                // let encodedbase64 = b64EncodeUnicode(reader.result);
                let unencodedbase64 = reader.result;
                console.log(unencodedbase64);
                
                let requestObj = {
                    requesttype: 'filesattachment',
                    request: 'uploadfile',
                    filename,
                    village,
                    details,
                    currentuniquevillagecode,
                    databytea: unencodedbase64,
                    mimetype,
                    rolecalculated,
                    uploadedby
                };
        
                makeSocketRequestNClose(requestObj)
                .then((responseObj: any) => {
                    if (responseObj.requestStatus == 'success'){
                        resolve(0);
                    } else {
                        reject(1);
                    }
                })
                .catch(() => {
                    reject(1);
                });
            }
            reader.readAsDataURL(file);
        });
    }

    const getfilelist = (village: any, currentuniquevillagecode: any) => {
        return new Promise((resolve, reject) => {
            let requestObj = {
                requesttype: 'filesattachment',
                request: 'getfilelist',
                village,
                currentuniquevillagecode
            };
    
            makeSocketRequestNClose(requestObj)
            .then((responseObj: any) => {
                resolve(responseObj);
            })
            .catch(() => {
                reject('error');
            });
        });
    }

    const approvefile = (fileid: any) => {
        return new Promise((resolve, reject) => {
            let requestObj = {
                requesttype: 'filesattachment',
                request: 'approvefile',
                fileid
            };
    
            makeSocketRequestNClose(requestObj)
            .then((responseObj: any) => {
                resolve(responseObj);
            })
            .catch(() => {
                reject('error');
            });
        });
    }

    const downloadfile = (fileid: any) => {
        return new Promise((resolve, reject) => {
            let requestObj = {
                requesttype: 'filesattachment',
                request: 'downloadfile',
                fileid
            };
    
            makeSocketRequestNClose(requestObj)
            .then((responseObj: any) => {
                resolve(responseObj);
            })
            .catch(() => {
                reject('error');
            });
        });
    }

    return { uploadfile, getfilelist, approvefile, downloadfile }
}

export default fileuploader;