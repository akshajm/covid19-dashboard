import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 400,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 400,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 400,
  },
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

export const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
        return a.cases > b.cases? -1: 1;
    })
    return sortedData
}   

export const showDataOnMap = (data, casesType = "cases") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.1}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      {console.log(casesTypeColors[casesType].hex)}
    </Circle>
  ));