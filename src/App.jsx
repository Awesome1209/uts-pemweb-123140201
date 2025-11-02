import { useState, useEffect } from 'react';
import './App.css'; 
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import DetailCard from './components/DetailCard';
import DataTable from './components/DataTable';

function App() {
  const [city, setCity] = useState('Jakarta');
  const [unit, setUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'a64d951330bf2f2d03a828782970b435'; 
  const API_URL = 'https://api.openweathermap.org/data/2.5';

  useEffect(() => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (!city) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setWeatherData(null);
      setForecastData(null);

      try {
        const weatherUrl = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}&lang=id`;
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
          throw new Error(`Kota tidak ditemukan (${weatherResponse.status})`);
        }
        const current = await weatherResponse.json();
        setWeatherData(current);

        const forecastUrl = `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}&lang=id`;
        const forecastResponse = await fetch(forecastUrl);
        if (!forecastResponse.ok) {
          throw new Error(`Prakiraan cuaca tidak ditemukan (${forecastResponse.status})`);
        }
        const forecast = await forecastResponse.json();
        
        const dailyForecast = forecast.list.filter(item => 
          item.dt_txt.includes('12:00:00')
        );
        setForecastData(dailyForecast);

        if (!searchHistory.includes(current.name)) {
          const updatedHistory = [current.name, ...searchHistory.slice(0, 4)];
          setSearchHistory(updatedHistory);
          localStorage.setItem('weatherSearchHistory', JSON.stringify(updatedHistory));
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, unit, API_KEY]);

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  const handleUnitToggle = () => {
    setUnit(prevUnit => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  const handleClearHistory = () => {
    setSearchHistory([])
    localStorage.removeItem('weatherSearchHistory');
  };

  return (
    <div className="App">
      <Header onUnitToggle={handleUnitToggle} currentUnit={unit} />
      
      <div className="main-layout">
        <SearchForm 
          onSearch={handleSearch} 
          history={searchHistory}
          onClearHistory={handleClearHistory} 
        />
        
        {loading && <p className="status-info">Memuat data cuaca...</p>}
        {error && <p className="status-info error">Error: {error}</p>}
        
        {weatherData && <DetailCard data={weatherData} unit={unit} />}
        {forecastData && <DataTable data={forecastData} unit={unit} />}
      </div>
    </div>
  );
}

export default App;
