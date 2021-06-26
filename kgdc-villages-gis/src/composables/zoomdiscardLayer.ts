import store from '@/store';

const zoomDiscardLayer = () => {
    const zoomToLayer = (lyrid: any) => {
        const map = store.getters.getMapObj;
        
        map.getLayers().forEach((lyr: any) => {
            if (lyr.get('lyrid') == lyrid) {
                map.getView().fit(lyr.getSource().getExtent());
            }
        });
    }

    const discardLayerFromMap = (lyrid: any) => {
        return new Promise((resolve, reject) => {
            const map = store.getters.getMapObj;

            let layers = map.getLayers();
            let initialLayerCount = layers.getLength();

            layers.forEach((lyr: any) => {
                if (lyr.get('lyrid') == lyrid) {
                    let source = lyr.getSource();
                    source.clear();
                    
                    map.removeLayer(lyr);
                }

                let currentLayerCount = layers.getLength();
                if(currentLayerCount < initialLayerCount){
                    resolve(0);
                }
            });
        });
    }

    return { zoomToLayer, discardLayerFromMap }
}

export default zoomDiscardLayer;
