import axios from 'axios'
import React from 'react'
import { sortData } from '../utils'
import { LineGraph } from './LineGraph'
import numeral from "numeral"

export const LeftComponent = ({casesType}) => {

    const [countriesCases, setCountriesCases] = React.useState([])

    React.useEffect(() => {
        const getCountriesCases = () => {
            axios({
                method: "get",
                url: "https://disease.sh/v3/covid-19/countries"
            })
            .then((res) => {
                const sortedData = sortData(res.data)
                setCountriesCases(sortedData)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getCountriesCases()

    },[])

    return (
        <div className="ml-2 mr-2 mt-5 lg:ml-2 lg:mt-0 lg:mb-0 bg-white shadow-xl lg:w-1/4">
            <p className="text-2xl p-2 font-bold">Live Cases by Country</p>
            <div className="h-98 overflow-y-scroll overflow-x-scroll ml-2 mr-2">
                <table> 
                    <tbody>
                        {
                            countriesCases.map((item, index) => {
                                if(index % 2 === 0){
                                    return <tr key={index}>
                                            <td className="text-xl p-2 text-gray-600">{item.country}</td>
                                            <td className="text-right font-bold text-lg p-2 text-gray-700">{numeral(item.cases).format("000,000")}</td>
                                        </tr>
                                }
                                else{
                                    return <tr className="bg-gray-200" key={index}>
                                            <td className="text-xl p-2 text-gray-600">{item.country}</td>
                                            <td className="font-bold text-lg text-right p-2 text-gray-700">{numeral(item.cases).format("000,000")}</td>
                                        </tr> 
                                }
                            })
                        }
                    </tbody>
                </table>
            </div>
            <p className="text-2xl p-2 font-bold">WorldWide new {casesType}</p>
            <LineGraph casesType={casesType} />
        </div>
    )
}
