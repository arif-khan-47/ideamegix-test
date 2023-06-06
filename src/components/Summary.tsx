import React from 'react'
import { useQuery } from 'react-query';

function Summary() {
    const fetchData = async () => {
        const response = await fetch('https://disease.sh/v3/covid-19/all');
        const allData: any[] = await response.json();
        return allData;
      };
      const { data: allData = [], isLoading: allDataLoading, error: allDataError } = useQuery<any[]>('countries', fetchData);
      console.log(allData)
  return (
    <div>
      
    </div>
  )
}

export default Summary
