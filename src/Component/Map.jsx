import React from 'react'
import {MapContainer, TileLayer, useMap} from "react-leaflet"
import { showDataOnMap } from '../utils';


export const Mapnew = ({countries, casesType, center, zoom}) => {

    const ChangeView = ({center, zoom}) => {
        const map = useMap();
        map.setView(center, zoom)
        return null
    }

    return (
        <div className="ml-2 mr-2 mt-5 h-97 xl:h-99 2xl:h-100 pb-3 rounded-t-lg p-2 bg-white">
           <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="h-full">
                <ChangeView center={center} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}