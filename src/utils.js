import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral"

const casesTypeColors = {
    cases: {
      hex: "red",
      // rgb: "rgb(204,16,52)",
      // half_op: "rgba(204,16,52,0.5)",
      mulitiplier: 800,
    },
  
    recovered: {
      hex: "green",
      // rgb: "rgb(125,215,29)",
      // half_op: "rgba(125,215,29,0.5)",
      mulitiplier: 1200,
    },
  
    deaths: {
      hex: "gray",
      // rgb: "rgb(251,68,67)",
      // half_op: "rgba(251,68,67,0.5)",
      mulitiplier: 2000,
    },
};
  


export const sortData = (data) => {
    const sortedData = [...data]

    sortedData.sort((a, b) => {
        if(a.cases > b.cases){
            return -1
        }
        else{
            return 1
        }
    })

    return sortedData
}

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//DRAW CIRCLES on the map with interactive tooltip

export const showDataOnMap = (data, casesType = "cases") => (
        data.map((country, index) => (
            <Circle
              key={index}
              center={[country.countryInfo.lat, country.countryInfo.long]}
              // fillOpacity={0.4}
              pathOptions={{
                  color: casesTypeColors[casesType].hex,
                  fillColor: casesTypeColors[casesType].hex
              }}
              radius={
                Math.sqrt(country[casesType] / 10) *
                casesTypeColors[casesType].mulitiplier
              }
            >
              <Popup>
                  <div>
                      <div className="w-full h-24 bg-cover rounded-lg mt-0.5 text-gray-800" style={{ backgroundImage: `url(${country.countryInfo.flag})`}} />
                      <div className="text-lg font-bold">{country.country}</div>
                      <div className="text-sm mt-0.5">Cases: {numeral(country.cases).format("0,0")}</div>
                      <div className="text-sm mt-0.5">Recovered: {numeral(country.recovered).format("0,0")}</div>
                      <div className="text-sm mt-0.5">Deaths: {numeral(country.deaths).format("0,0")}</div>
                  </div>
              </Popup>
            </Circle>
    ))
)