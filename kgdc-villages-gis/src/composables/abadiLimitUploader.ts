import store from "@/store";
import WKT from 'ol/format/WKT';
import GeoJSON from 'ol/format/GeoJSON';

import globalToast from '../composables/globalToast';

const abadiLimitUploader = () => {
    const { showGlobalToast } = globalToast();

    const uploadAbadiLimit = (lyr: any) => {
        let attributes = lyr.attributes;
        // console.log(lyr, attributes);
        let feature = lyr.layer.getSource().getFeatures().shift();
        // console.log(feature);

        // let geom = feature.getGeometry();
        // console.log(geom);

        // let wkt = new WKT();
        // wkt.writeFeature(feature, {
        //     dataProjection: 'EPSG:4326',
        //     featureProjection: 'EPSG:3857'
        // });
        
        // console.log(wkt);

        let gj = new GeoJSON();
        gj.writeFeature(feature, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:3857'
        });
        
        console.log(gj);

        const username = store.getters.getUsername;
        const password = store.getters.getPassword;

        // let requestObj = {
        //     request: 'uploadabadilimit',
        //     validateusername: username,
        //     validatepassword: password,
        //     attributes
        // }

        // console.log(requestObj);

        // let wssURL = store.getters.getGJModuleWSS;
        // let ws = new WebSocket(wssURL);
    
        // ws.addEventListener('message', (event) => {
        //     let responseObj = JSON.parse(Buffer.from(event.data, 'base64').toString());
        //     console.log(responseObj);

        //     if(responseObj.requestStatus == 'success'){
        //         showGlobalToast('Upload Success');
        //     } else {
        //         showGlobalToast('Error Uploading');
        //     }

        //     ws.close();
        // });

        // ws.addEventListener('open', (event) => {
        //     ws.send(btoa(JSON.stringify(requestObj)));
        // });
    }

    return { uploadAbadiLimit };
}

export default abadiLimitUploader;