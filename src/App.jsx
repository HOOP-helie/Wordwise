import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react"
import './index.css'
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import Homepage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import City from "./components/City"
import CityList from "./components/CityList"
import CountryList from "./components/CountryList"

const BASE_URL = ' http://localhost:8000';

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    async function getCities() {
      try {
        setIsLoading(true)
        const response = await fetch(BASE_URL + "/cities");
        let data = await response.json();
        setCities(data)
      } catch (error) {
        alert("there was an error")
      } finally {
        setIsLoading(false)
      }
    }

    getCities()

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<Navigate to="cities" />} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          <Route path="cities/:id" element={<City />} />
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App