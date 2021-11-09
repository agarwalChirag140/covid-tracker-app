import React from "react"
import { LeftComponent } from "./Component/LeftComponent"
import axios from "axios"
import { InfoBoxes } from "./Component/InfoBoxes"
import "leaflet/dist/leaflet.css"
import { prettyPrintStat } from "./utils"
import { Mapnew } from "./Component/Map"

function App() {

    const [countriesList, setCountriesList] = React.useState([])
    const [country, setCountry] = React.useState("Worldwide")
    const [countryInfo, setCountryInfo] = React.useState({})
    const [mapCenter, setMapCenter] = React.useState([34.80746, -40.4796])
    const [mapZoom, setMapZoom] = React.useState(3)
    const [mapCountries, setMapCountries] = React.useState([])
    const [casesType, setCasesType] = React.useState("cases")

    React.useEffect(() => {
        const getAll = () => {
            axios({
                method: "get",
                url: "https://disease.sh/v3/covid-19/all"
            })
            .then((res) => {
                setCountryInfo(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }

        getAll()
    },[])
    
    React.useEffect(() => {
        const getCountriesList = () => {
            axios({
                method: "get",
                url: "https://disease.sh/v3/covid-19/countries"
            })
            .then((res) => {
                setCountriesList(res.data)
                setMapCountries(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getCountriesList()
    },[])

    console.log(mapCountries)

    const countryChange = (event) => {
      const countryCode = event.target.value;
      setCountry(countryCode)

      const setUrl = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`

      axios({
          method: "get",
          url: setUrl
      })
      .then((res) => {
          setCountryInfo(res.data)
          countryCode === "worldwide" ? setMapCenter([34.80746, -40.476]) : setMapCenter([res.data.countryInfo.lat, res.data.countryInfo.long])
          setMapZoom(4)
      })
      .catch((err) => {
          console.log(err)
      })
    }
  
  return (
    <div className="bg-gray-200 pb-20 pt-7 ">
        <div className="w-11/12 m-auto md:flex md:flex-row">
            <div className="lg:w-full">
                {/* Header */}
                <div className="flex justify-between ml-2 mr-2 mt-2 items-center">
                    <h1 className="text-5xl font-bold text-red-600">Covid-19 tracker</h1>
                    <select onChange={countryChange} value={country} className="w-2/4 lg:w-1/6 p-4 lg:text-xl focus:outline-none bg-white border-2 border-gray-600">
                        <option value="worldwide">Worldwide</option>
                        {
                            countriesList.map((item, index) => {
                                return <option value={item.countryInfo.iso2} key={index}>{item.country}</option>
                            })
                        }
                    </select>
                </div>
                {/* Info boxes div */}
                <div className="flex justify-between ml-2 mr-2">
                    {/* Corona Viruses InfoBoxes */}
                    <InfoBoxes title="Coronavirus Cases" isRed active={casesType === "cases"} onClick={(e) => setCasesType("cases")} todayCases={prettyPrintStat(countryInfo.todayCases)} totalCases={prettyPrintStat(countryInfo.cases)} />
                    {/* Recover Infoboxes */}
                    <InfoBoxes title="Recovered" isGreen active={casesType === "recovered"} onClick={(e) => setCasesType("recovered")} todayCases={prettyPrintStat(countryInfo.todayRecovered)} totalCases={prettyPrintStat(countryInfo.recovered)} />
                    {/* Deaths Infoboxes */}
                    <InfoBoxes title="Deaths" isGray active={casesType === "deaths"} onClick={(e) => setCasesType("deaths")} todayCases={prettyPrintStat(countryInfo.todayDeaths)} totalCases={prettyPrintStat(countryInfo.deaths)} />
                </div>
                {/* Map */}
                <Mapnew casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
                {/* <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} /> */}
            </div>
            <LeftComponent casesType={casesType} country={country} />
         </div>
    </div>
  );
}

export default App;
