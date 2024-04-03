// Vejrudsigten

function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

async function getWeather() {
    const randomNumber = getRandomNumber();
    const url = `https://65ddd3abdccfcd562f558d61.mockapi.io/api/v1/forecast/${randomNumber}`;
    const response = await axios.get(url);
    return response.data;
}

async function writeWeatherToHTML() {
    try {
        const weather = await getWeather();
        const weatherInfoElement = document.getElementById('weatherInfo');
        weatherInfoElement.textContent = `Sky: ${weather.sky}, Temperature: ${weather.temperature}°C, Rain: ${weather.rain_mm}mm`;
    } catch (error) {
        console.error('Error fetching weather:', error);
        const weatherInfoElement = document.getElementById('weatherInfo');
        weatherInfoElement.textContent = 'Failed to fetch weather data';
    }
}


// Prøvede med denne kode, virkede dog ikke og brugte endda den guide fra EmailJS. Tror jeg lavede fejl ved oprettelse af min konto og derfor har jeg haft det svært med at kunne virke.

document.addEventListener('DOMContentLoaded', function() {
    writeWeatherToHTML();

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        emailjs.sendForm('contact_service', 'contactform', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
});
