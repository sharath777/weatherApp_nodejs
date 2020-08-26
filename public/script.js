const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed',() => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()

    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude   
        })
    }).then(res => res.json()).then(data => {
        console.log("new data " +data)
        setWeatherData(data, place.formatted_address)
    })
})
const icon = new Skycons({ color: '#222' })
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const humidityElement = document.querySelector('[data-humidity]')
const feelsLikeElement = document.querySelector('[data-feelsLike]')
icon.set('icon', 'clear-day')
icon.play()

function setWeatherData(data, place) {
    // Round up the temp 
   var celcius = Math.round(parseFloat(data.data.main.temp)-273.15);
    locationElement.textContent = place
    statusElement.textContent = data.weather.description
    temperatureElement.textContent = celcius + '&deg;';
    console.log("Temp in celcius " +celcius)
    humidityElement.textContent = data.data.main.humidity
    feelsLikeElement.textContent = data.main.feels_like
    icon.set('icon', data.icon)
    icon.play()

}