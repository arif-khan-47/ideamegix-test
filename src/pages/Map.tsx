import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Layout from '../components/Layout/Layout'
import { useQuery } from 'react-query';



interface Country {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

const fetchCountriesData = async () => {
  const response = await fetch('https://disease.sh/v3/covid-19/countries');
  const data: Country[] = await response.json();
  return data;
};

function Map() {

  const { data: countriesData = [], isLoading, error } = useQuery<Country[]>('countries', fetchCountriesData);

  if (error) {
    console.log(error);
  }


  return (
    <Layout>
      {isLoading ? <div className='flex h-screen'><div className='m-auto'>Loading...</div></div>
        :
        <div className='h-screen w-full overflow-hidden'>
          <MapContainer center={[21, 78]} zoom={4} className=''>
            <TileLayer
              url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=9WFebKyo4SzKO0H6sXG3"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

            />
            {countriesData && countriesData.length > 0 && countriesData.map((country) => (
              <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
                <Popup>
                  <div className='font-bold text-lg'>{country.country}</div>
                  <p><span className='font-semibold'>Cases:</span> {country.cases}</p>
                  <p><span className='font-semibold'>Deaths:</span> {country.deaths}</p>
                  <p><span className='font-semibold'>Recovered:</span> {country.recovered}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      }

    </Layout>
  )
}

export default Map
