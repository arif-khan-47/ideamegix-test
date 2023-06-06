import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'
import Layout from "../components/Layout/Layout";
import { useQuery } from "react-query";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement)

const ChartPage = () => {

  const fetchChartData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all');
    const data: any[] = await response.json();
    return data;
  };


  const fetchAdditionalData = async () => {
    const response = await fetch('https://disease.sh/v3/covid-19/all');
    const data = await response.json();
    return data;
  };



  const { data: chartData = [], isLoading, error } = useQuery<any[]>('countries', fetchChartData);

  const { data: additionalData = [], isLoading: additionalDataLoading, error: additionalDataError } = useQuery('additionalData', fetchAdditionalData);




  const formatChartData = (data: any) => {
    if (data.cases != null && data.deaths != null && data.recovered != null) {
      const casesData = Object.entries(data?.cases).map(([date, value]) => ({ x: date, y: value }));
      const deathsData = Object.entries(data?.deaths).map(([date, value]) => ({ x: date, y: value }));
      const recoveredData = Object.entries(data?.recovered).map(([date, value]) => ({ x: date, y: value }));
      return {
        labels: Object.keys(data.cases),
        datasets: [
          {
            label: 'Cases',
            data: casesData,
            borderColor: 'red',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          },
          {
            label: 'Deaths',
            data: deathsData,
            borderColor: 'yellow',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
          },
          {
            label: 'Recovered',
            data: recoveredData,
            borderColor: 'green',
            backgroundColor: 'red',
          },
        ],
      };
    }
  }
  let formattedData = null; // Declare formattedData variable
  if (!isLoading) {
    formattedData = formatChartData(chartData); // Store the value if not null or undefined
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };



  return (
    <div>
      <Layout>
        <div className="">
          <div className="text-center font-bold text-xl italic mb-2 underline">World Wide Update</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            {additionalData.cases && <div><span className="font-bold">Total Cases:</span>{additionalData.cases}</div>}
            {additionalData.deaths && <div><span className="font-bold">Total Deaths:</span>{additionalData.deaths}</div>}
            {additionalData.recovered && <div><span className="font-bold">Total Recovered:</span>{additionalData.recovered}</div>}
          </div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1 mt-2">
            {additionalData.todayCases && <div><span className="font-bold">Today Cases:</span>{additionalData.todayCases}</div>}
            {additionalData.todayDeaths && <div><span className="font-bold">Today Deaths:</span>{additionalData.todayDeaths}</div>}
            {additionalData.todayRecovered && <div><span className="font-bold">Today Recovered:</span>{additionalData.todayRecovered}</div>}
          </div>
        </div>


        <div className="mt-5">
          {formattedData !== null && formattedData !== undefined ? (<>
            <div className="flex justify-center gap-3">
              <div className="flex gap-1">
                <div className="h-3 w-4 bg-red-500 my-auto" />
                <span>Cases</span>
              </div>

              <div className="flex gap-1">
                <div className="h-3 w-4 bg-yellow-300 my-auto" />
                <span>Death</span>
              </div>

              <div className="flex gap-1">
                <div className="h-3 w-4 bg-green-700 my-auto" />
                <span>Recovered</span>
              </div>
              <div className="flex">
              </div>
            </div>
            <Line options={options} data={formattedData} />
          </>
          ) : (
            <div className="text-center mx-auto">Loading chart data...</div>
          )}
        </div>

      </Layout>
    </div>
  );
};

export default ChartPage;
