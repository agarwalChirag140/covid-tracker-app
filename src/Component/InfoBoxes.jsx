import React from 'react'

export const InfoBoxes = ({title, todayCases, totalCases, isRed, isGreen, isGray, active,  ...props}) => {

    return (
        <div className={`mt-5 bg-white w-2/7 shadow-xl cursor-pointer rounded-t-xl ${active && "border-t-9"}  ${isRed && "border-red-700"} ${isGreen && "border-green-700"} ${isGray && "border-gray-700"}`} onClick={props.onClick}>
            <p className=" text-sm md:text-lg lg:text-3xl text-gray-700 pl-4 pt-2">{title}</p>

            {
                (title === "Coronavirus Cases") &&  <p className="text-sm lg:text-2xl text-red-700 font-extrabold pl-4">{todayCases}</p>

            }
            {
                (title === "Recovered") &&  <p className="text-sm lg:text-2xl text-green-500 font-extrabold pl-4">{todayCases}</p>

            }
            {
                (title === "Deaths") &&  <p className="text-sm lg:text-2xl text-gray-700 font-extrabold pl-4">{todayCases}</p>

            }
            <p className="text-xs lg:text-lg pl-4 pb-4 text-gray-900">{totalCases}</p>
        </div>
    )
}
