// async function getData() {
//     // console.log("Fetching data from NASA API")
//     try {
//         const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=2w57JO3byx4wr21czE16MfoRdl1fWo6Denmu6nns');
//         // console.log( response );
//         const data = await response.json();

//         console.log( data );
//         console.log( data.date );

//         // put h1 in a variable 
//         const title = document.querySelector( '#potd-title' );

//         // display api title in h1
//         title.innerHTML = data.title;
        
//         // put info p in a variable 
//         const info = document.querySelector( '#potd-info' )

//         // display image and explanation in p
//         info.innerHTML =  `
//         <img src="${data.hdurl}" alt="${data.title}" /><br />
//         ${data.explanation}
//         `;

//     } catch(error) {
//         console.log("Error: ", error);
//     }
// }
//     getData();


const API_KEY = '5b3bd80e7eb64badb40224932250802'; 
console.log("API Key:", API_KEY);

// Different background for different city
const cityBackgrounds = {
    "Toronto": "linear-gradient(to bottom,rgb(212, 252, 245), #acb6e5)",
    "New York": "linear-gradient(to bottom,rgb(255, 232, 232), #fad0c4)", 
    "London": "linear-gradient(to bottom, #cfd9df, #e2ebf0)",
    "Tokyo": "linear-gradient(to bottom,rgb(240, 233, 249),rgb(200, 125, 176))" 
};


// fetch weather data from website
async function getWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=3`;
    console.log("fetch data:", apiUrl);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log (data);
        

        if (!data || !data.current) {
            alert("Error: Invalid location or API response.");
            return;
        }

        // change background color when selected different city
        const newBackground = cityBackgrounds[location] || "linear-gradient(to bottom, #b3e0ff, #e6f7ff)";

        // bacground color transition
        document.body.style.transition = "opacity 0.5s ease-out";
        document.body.style.opacity = 0.7; // Fade out

        setTimeout(() => {
            document.body.style.background = newBackground; // Change background
            document.body.style.opacity = 1; // Fade back in
        }, 270); 
        console.log("background color:", newBackground);

        // current weather
        const currentDate = new Date().toDateString();
        document.getElementById('currentDate').textContent = `Date: ${currentDate}`;
        console.log("Curent Date:", currentDate)

        // current temp
        document.getElementById('currentTemp').textContent = `Temperature: ${data.current.temp_c}°C`;
        console.log(currentTemp);

        // weather condition description
        document.getElementById('currentDescription').textContent = `Condition: ${data.current.condition.text}`;
        console.log(currentDescription);

        // icon of the current weather
        document.getElementById('currentIcon').src = `https:${data.current.condition.icon}`;
        console.log(currentIcon);

        // display 3days forecast
        const forecastDiv = document.getElementById('forecast');
        console.log(forecast);
        forecastDiv.innerHTML = ""; 

        data.forecast.forecastday.forEach(day => {
            // forecast days
            const forecastDate = new Date(day.date).toDateString();
            console.log("forecast day", day.date);

            // forecast temp
            const forecastTemp = `${day.day.avgtemp_c}°C`;
            console.log("forescast Temp", day.day.avgtemp_c );
            
            // forecast condition
            const forecastDesc = day.day.condition.text;
            console.log(day.day.condition.text);

            // forest icons
            const forecastIcon = day.day.condition.icon;

            const forecastHTML = `
                <div class="forecast-day">
                    <p><strong>${forecastDate}</strong></p>
                    <p>Temp: ${forecastTemp}</p>
                    <p>${forecastDesc}</p>
                    <img src="https:${forecastIcon}" alt="Weather Icon">
                </div>
            `;

            forecastDiv.innerHTML += forecastHTML;
        });

    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Failed to fetch weather data');
    }
}

// Auto fetch weather when page loads
document.addEventListener("DOMContentLoaded", () => {
    const defaultLocation = document.getElementById('location').value; // Get default selected value
    getWeather(defaultLocation);
    console.log("Location:", defaultLocation );
});



// Change weather when different location is selected
document.getElementById('location').addEventListener("change", function () {
    getWeather(this.value);
});



