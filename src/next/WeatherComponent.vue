<template>
    <div>
<<<<<<< HEAD
        <div v-if="firstWeatherData" class="weather-block">
            <h2>
                {{ firstWeatherData[0] }} -
                {{ formatTime(firstWeatherData[1].time) }}
            </h2>
            <img :src="getSymbolUrl(firstWeatherData[1].data)" alt="Weather Symbol" />
            <ul>
                <li>
                    <strong>Vind:</strong> {{ firstWeatherData[1].data.instant.details.wind_speed }} m/s - {{ getWindDirectionEmoji(firstWeatherData[1].data.instant.details.wind_from_direction) }}
                </li>
                <li>
                    <strong>Skylag:</strong> {{ firstWeatherData[1].data.instant.details.cloud_area_fraction }}%
                </li>
                <li>
                    <strong>Luftfuktighet:</strong> {{ firstWeatherData[1].data.instant.details.relative_humidity }} %
                </li>
                <li>
                    <strong>Regn neste timen:</strong> {{ getPrecipitationAmount(firstWeatherData[1].data) }} mm
                </li>
            </ul>
=======
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
>>>>>>> 426b6abc78e6c51e6c299d9601a1fdde521a9f5d
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            weatherData: {} // Initial empty object for weather data
        };
    },
    computed: {
        firstWeatherData() {
            const entries = Object.entries(this.weatherData);
            const sortedEntries = entries.sort(([, weatherA], [, weatherB]) => {
                return new Date(weatherA.time) - new Date(weatherB.time);
            });
            return sortedEntries[0] || undefined;
        }
    },
    mounted() {
        this.fetchWeatherData();
    },
    methods: {
        async fetchWeatherData() {
            try {
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
        },
        getSymbolUrl(data) {
            // Extracting symbol code for the next 1 hour. Similar extraction can be done for other periods.
            const symbolCode = data.next_1_hours?.summary?.symbol_code || "not_available";
            // Building URL using the extracted symbol code
            return `/next/symbols/${symbolCode}.png`;
        }
    }
}
</script>
<<<<<<< HEAD

<style scoped>
.weather-icon {
    width: 200px;
}
</style>
=======
>>>>>>> 426b6abc78e6c51e6c299d9601a1fdde521a9f5d
