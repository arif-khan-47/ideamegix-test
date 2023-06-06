import React from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './Redux/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Map from './pages/Map';
import ChartPage  from './pages/ChartPage';
// import ChartPage from './pages/ChartPage';
// import 'leaflet/dist/leaflet.css'


export interface IAllRoutes {
  path: string;
  element: React.ReactNode;
}

export const AllRoutes: IAllRoutes[] = [
  {
    path: `/`,
    element: <HomePage />,
  },
  {
    path: `/chart`,
    element: <ChartPage />,
  },
  {
    path: `/map`,
    element: <Map />,
  },
]

function App() {
  return (
    <div className="min-h-screen">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route>
              {AllRoutes && AllRoutes.map((route, index) => <Route key={index} path={route.path} element={route.element} />)}
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
}

export default App;
