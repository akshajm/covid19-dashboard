import {useState, useEffect} from 'react';
import './App.css';
import 'leaflet/dist/leaflet.css';
import {FormControl, MenuItem, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import LineGraph from './LineGraph';
import {sortData, prettyPrintStat} from './util'

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 37.0902, lng: 0.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapData, setMapData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        const sortedData = sortData(data);
        setCountries(countries);
        setTableData(sortedData);
        setMapData(data);
      })
    }

    getCountries();
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === 'worldwide' ? 
    'https://disease.sh/v3/covid-19/all' : 
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then((data) => {
      setCountryInfo(data);
      setCountry(countryCode);
      if(data.countryInfo){
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      } else {
        setMapCenter([37.0902, 0.4796]);
        setMapZoom(2);
      }
    })   
     
  }

  return (
    <div className="app">
      <div className="app__left">
      <div className='app__header'>
        <h1>Covid 19 tracker</h1>
        <FormControl className='app__dropdown'>
          <Select
          variant='outlined'
          value={country}
          onChange={onCountryChange}
          >
            <MenuItem value='worldwide'>Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }

          </Select>
        </FormControl>
      </div>

      <div className='app__stats'>
        <InfoBox  onClick={(e) => setCasesType("cases")} title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}></InfoBox>
        <InfoBox  onClick={(e) => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}></InfoBox>
        <InfoBox  onClick={(e) => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}></InfoBox>

      </div>

      <Map casesType={casesType} center={mapCenter} zoom={mapZoom} data={mapData}/>

      </div>
      <Card className="app__right">
        <CardContent>
          <h3> Live cases by country</h3>
          <Table countries={tableData} />
          <h3> Worldwide new {casesType}</h3>
          <LineGraph chartType={casesType}/>
        </CardContent>
      </Card>
        
      
    </div>
  );
}

export default App;
