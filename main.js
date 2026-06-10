// https://www.meteosource.com/api/v1/free/find_places?text=Landsdale&language=en&key=d4h08vj6oqaxp6wvfndtwdija72hvqng406yt58s

async function start() {
  const weatherPromise = await fetch(
    'https://www.meteosource.com/api/v1/free/point?lat=-31.809S&lon=115.839E&sections=current%2Chourly&timezone=auto&language=en&units=auto&key=d4h08vj6oqaxp6wvfndtwdija72hvqng406yt58s',
  );
  const weatherData = await weatherPromise.json();
  const currentTemp = weatherData.current.temperature;
  document.querySelector('#temp').textContent = currentTemp;
  // console.log(weatherData.current.temperature);
}

start();
