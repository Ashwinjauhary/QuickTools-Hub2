import { useState, useEffect } from "react";

function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Kanpur, Uttar Pradesh → lat/lon
  const LAT = 26.4499;
  const LON = 80.3319;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current_weather=true`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await res.json();
        setWeather(data.current_weather);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchWeather();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-10">Error: {error}</p>;
  }

  if (!weather) {
    return <p className="text-center mt-10">Loading weather data...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 text-white rounded-3xl shadow-2xl p-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Kanpur, Uttar Pradesh</h2>

        {/* Temperature */}
        <div className="text-7xl font-light mb-4">
          {weather.temperature}°C
        </div>

        {/* Weather Condition (Open-Meteo only gives code, so just show wind & time) */}
        <p className="text-xl font-semibold mb-6">
          Wind: {weather.windspeed} km/h
        </p>

        {/* Extra Info */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-2xl font-bold">{weather.winddirection}°</p>
            <p className="text-sm opacity-80">Wind Direction</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <p className="text-lg font-bold">
              {new Date(weather.time).toLocaleTimeString()}
            </p>
            <p className="text-sm opacity-80">Last Updated</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
