<template>
    <div>
        <div v-for="(weather, location) in sortedWeatherData" :key="location" class="weather-block">
            <h2>{{ location }} - {{ formatTime(weather.time) }} </h2>
            <table>
                <tbody>
                    <tr>
                        <td>Temperatur:</td>
                        <td>{{ weather.data.instant.details.air_temperature }}°</td>
                    </tr>
                    <tr>
                        <td>Vind:</td>
                        <td>{{ weather.data.instant.details.wind_speed }} m/s</td>
                    </tr>
                    <tr>
                        <td>Vindretning:</td>
                        <td>{{ getWindDirectionEmoji(weather.data.instant.details.wind_from_direction) }}</td>
                    </tr>
                    <tr>
                        <td>Skyer:</td>
                        <td>{{ weather.data.instant.details.cloud_area_fraction }}% {{ getCloudinessEmoji(weather.data.instant.details.cloud_area_fraction) }}</td>
                    </tr>
                    <tr>
                        <td>Luftfuktighet:</td>
                        <td>{{ weather.data.instant.details.relative_humidity }} %</td>
                    </tr>
                    <tr>
                        <td>Regn:</td>
                        <td>{{ getPrecipitationAmount(weather.data) }} mm</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>


<script>
export default {
    data() {
        return {
            weatherData: {} // Initial empty object for weather data
        }
    },
    computed: {
        sortedWeatherData() {
            // Convert the object to an array of [key, value] pairs
            const entries = Object.entries(this.weatherData);
            // Sort the array based on the time property
            const sortedEntries = entries.sort(([, weatherA], [, weatherB]) => {
                return new Date(weatherA.time) - new Date(weatherB.time);
            });
            // Convert back to an object
            return Object.fromEntries(sortedEntries);
        }
    },
    mounted() {
        this.fetchWeatherData();
    },
    methods: {
        async fetchWeatherData() {
            try {
                // Get the weather data from your JSON file or API
                const response = await fetch('/next/weather_results.json');
                this.weatherData = await response.json();
            } catch (err) {
                console.error('Failed to fetch weather data:', err);
            }
        },
        formatTime(timeString) {
            const date = new Date(timeString); 
            const options = { hour: '2-digit', minute: '2-digit', hour12: false };
            return new Intl.DateTimeFormat('nb-NO', options).format(date);
        },
        getWindDirectionEmoji(deg) {
            if (deg >= 337.5 || deg < 22.5) {
                return '⬆️'; // North
            } else if (deg >= 22.5 && deg < 67.5) {
                return '↗️'; // North-East
            } else if (deg >= 67.5 && deg < 112.5) {
                return '➡️'; // East
            } else if (deg >= 112.5 && deg < 157.5) {
                return '↘️'; // South-East
            } else if (deg >= 157.5 && deg < 202.5) {
                return '⬇️'; // South
            } else if (deg >= 202.5 && deg < 247.5) {
                return '↙️'; // South-West
            } else if (deg >= 247.5 && deg < 292.5) {
                return '⬅️'; // West
            } else if (deg >= 292.5 && deg < 337.5) {
                return '↖️'; // North-West
            }
        },
        getCloudinessEmoji(cloudAreaFraction) {
            if (cloudAreaFraction <= 10) {
                return '☀️';
            } else if (cloudAreaFraction > 10 && cloudAreaFraction <= 50) {
                return '🌤';
            } else if (cloudAreaFraction > 50 && cloudAreaFraction <= 90) {
                return '🌥';
            } else {
                return '☁️';
            }
        },
        getPrecipitationAmount(data) {
            // Check if 'next_1_hours' is available and return its precipitation amount if it is.
            if (data.next_1_hours && data.next_1_hours.details.precipitation_amount !== undefined) {
                return data.next_1_hours.details.precipitation_amount;
            }
            // Check if 'next_6_hours' is available and return its precipitation amount if it is.
            else if (data.next_6_hours && data.next_6_hours.details.precipitation_amount !== undefined) {
                return data.next_6_hours.details.precipitation_amount;
            }
            // If neither are available, return a default message.
            else {
                return "No data available";
            }
        }
    }
}
</script>
