import { View } from 'ol';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import mapStyler from './mapStyler';
import { getCurrentInstance } from '@vue/runtime-core';
import LayerGroup from 'ol/layer/Group';
import store from '@/store';

const karnBoundsLoader = () => {
    const { districtStyleFunction } = mapStyler();

    const app = getCurrentInstance()!;

    const loadKarnBounds = () => {
        if(app.appContext.config.globalProperties.$karndistbounds == null){
            const wsurlBase = store.getters.getWSURLBase;
            const username = store.getters.getUsername;
            const password = store.getters.getPassword;
            console.log(wsurlBase);

            let ws = new WebSocket(wsurlBase);
            ws.addEventListener('message', (event) => {
                // console.log(event.data);
                let responseObj = JSON.parse(Buffer.from(event.data, 'base64').toString());
                console.log(responseObj);
                if (responseObj.requestStatus == 'success'){
                    let gj = responseObj.featureCollection;
                    setKarnBounds(gj);
                } else {
                    console.log('Problem Loading Karnataka Boundary from Server...')
                }
                ws.close();
            });
            ws.addEventListener('open', (event) => {
                let requestObj = {
                    requesttype: 'getgeojson',
                    layer: 'karnatakaboundary',
                    username,
                    password
                }
                ws.send(Buffer.from(JSON.stringify(requestObj)).toString('base64'));
            });
        }
    }

    const setKarnBounds = (gj: any) => {
        const map = app.appContext.config.globalProperties.$map;

        let karndistbounds = new VectorLayer({
            source: new VectorSource({
                features: new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }).readFeatures(gj)
            }),
            style: districtStyleFunction,
            zIndex: 1
        });

        karndistbounds.set('loadedfromserver', 'yes');

        map.setLayerGroup(new LayerGroup({
            layers: [ karndistbounds ]
        }));

        map.setView(new View({
            zoom: 7,
            center: fromLonLat([76.56, 14.85]),
            constrainResolution: true
        }));

        app.appContext.config.globalProperties.$karndistbounds = karndistbounds;
        store.dispatch('setKarnBoundsLoaded', true);
    }

    const unloadKarnBounds = () => {
        const map = app.appContext.config.globalProperties.$map;

        if(app.appContext.config.globalProperties.$karndistbounds != null){
            map.removeLayer(app.appContext.config.globalProperties.$karndistbounds);
            app.appContext.config.globalProperties.$karndistbounds = null;
        }
    }

    return { loadKarnBounds, unloadKarnBounds }
}

export default karnBoundsLoader;