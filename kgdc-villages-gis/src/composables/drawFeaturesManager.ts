import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import {Draw, Modify, Snap} from 'ol/interaction';
import GeometryType from 'ol/geom/GeometryType';
import GeoJSON from 'ol/format/GeoJSON';

import { v4 as uuidv4 } from 'uuid';

import store from "@/store";

const interactionsManager = () => {
    const drawNewLayer = () => {
        const map = store.getters.getMapObj;

        const featuresCount = store.getters.getFeaturesCounter;
        let featurename = 'Feature_' + (featuresCount + 1);

        let source = new VectorSource({ wrapX: false });
        let vectorlyr = new VectorLayer({ source });

        let uniqueID = uuidv4();
        vectorlyr.set('lyrid', uniqueID);

        map.addLayer(vectorlyr);

        let draw = new Draw({
          source: source,
          type: GeometryType.POLYGON,
        });

        draw.on('drawend', (event: any) => {
          map.getInteractions().pop();

          const featuresData = store.getters.getFeaturesData;

          let newfeatureGJ = new GeoJSON().writeFeature(event.feature, {
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
        });
        
        map.addInteraction(draw);
    }

    return { drawNewLayer }
}

export default interactionsManager;