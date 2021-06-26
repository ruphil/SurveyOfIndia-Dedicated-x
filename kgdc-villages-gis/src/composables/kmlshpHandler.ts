import globalToast from '../composables/globalToast';

import KML from 'ol/format/KML';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

import shp from 'shpjs';
import { v4 as uuidv4 } from 'uuid';
import store from '@/store';

const kmlshpHanlder = () => {
    const { showGlobalToast } = globalToast();

    const loadshp = (file: any) => {
        const map = store.getters.getMapObj;

        let filename = file.name;

        let reader = new FileReader();
        reader.onload = function () {
            let shpBuffer = <ArrayBuffer>reader.result;
            shp(shpBuffer).then((geojson:any) => {
                console.log(geojson);

                let shpvectorsource = new VectorSource({
                    features: new GeoJSON({
                        dataProjection: 'EPSG:4326',
                        featureProjection: 'EPSG:3857'
                    }).readFeatures(geojson),
                });

                if(shpvectorsource.getFeatures().length > 0){
                    let shplyr = new VectorLayer({
                        source: shpvectorsource
                    });

                    let uniqueID = uuidv4();
                    shplyr.set('lyrid', uniqueID);

                    map.addLayer(shplyr);

                } else {
                }
            });
        }
        reader.readAsArrayBuffer(file);
    }

    const loadkml = (file: any) => {
        const map = store.getters.getMapObj;

        let filename = file.name;
        console.log(filename);

        let reader = new FileReader();
        reader.onload = function () {

            let kmlstring = reader.result!;
            let kmlFeatures = new KML({
                extractStyles: false
            }).readFeatures(kmlstring, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });
    
            let filteredkmlfeatures = kmlFeatures.filter((feat) => {
                return feat.getGeometry()?.getType() == 'Polygon';
            });

            let feature = filteredkmlfeatures[0];
            console.log(feature);

            let cond1 = kmlFeatures.length != 0;
            let cond2 = filteredkmlfeatures.length != 0;
            let cond3 = feature != undefined && feature != null;

            if(cond1 && cond2 && cond3){
                let kmllyr = new VectorLayer({
                    source: new VectorSource({
                        features: [feature]
                    })
                });
    
                const featuresCount = store.getters.getFeaturesCounter;
                let featurename = 'Feature_' + (featuresCount + 1);
    
                let uniqueID = uuidv4();
                kmllyr.set('lyrid', uniqueID);
                map.addLayer(kmllyr);
    
                const featuresData = store.getters.getFeaturesData;
    
                let newfeatureGJ = new GeoJSON().writeFeature(feature, {
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                });
                
                console.log(JSON.stringify(newfeatureGJ));
    
                let modFeaturesData = [
                    ...featuresData,
                    {
                        featurename,
                        lyrid: uniqueID,
                        gjstr: JSON.stringify(newfeatureGJ),
                        attributes: {}
                    }
                ]
                
                store.dispatch('setFeaturesData', modFeaturesData);
                store.dispatch('setFeatureCounter', featuresCount + 1);
            } else {
                showGlobalToast('KML File is not valid');
            }
        }
        reader.readAsText(file);
    }

    const loadKMLShp = (e: any) => {
        let file = e.target.files[0];
        let fileFullname = file.name;
        let lastDot = fileFullname.lastIndexOf('.');
        let extension = fileFullname.substring(lastDot + 1);
        console.log(fileFullname, extension);

        if (extension != 'kml' && extension != 'zip'){
            showGlobalToast('Invalid File.. Only kml or zip files are allowed...');
        } else if (extension == 'kml') {
            loadkml(file);
        } 
        else if (extension == 'zip') {
            loadshp(file);
        }
    }

    return { loadKMLShp }
}

export default kmlshpHanlder;
