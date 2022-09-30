import React, {useEffect, useState} from "react";
import axios from "axios";
import Clear from "./assets/Clear.jpg";
import Clouds from "./assets/Clouds.jpg";
import Overcast from "./assets/Overcast.jpg";
import Rainy from "./assets/Rainy.jpg";
import Snow from "./assets/Snow.jpg";
import Thunderstorm from "./assets/Thunderstorm.jpg";
import Fog from "./assets/Fog.jpg";
import Ash from "./assets/Ash.jpg";
import Dust from "./assets/Dust.jpg";
import Tornado from "./assets/Tornado.jpg";



function App() {

    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)

    const [data, setData] = useState({})
    const [location, setLocation] = useState('')

    // const [loading, setLoading] = useState(true)
    //
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false)
    //     },300)
    // }, [])


    useEffect(() => {

        const fetchData = async () => {

            navigator.geolocation.getCurrentPosition((position) => {
                setLat(position.coords.latitude)
                setLon(position.coords.longitude)

            });

            await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then((res) => {
                setData({
                    name: res.data.name,
                    tempF: res.data?.main?.temp.toFixed(),
                    tempC: ((res.data?.main?.temp - 32) / 1.8).toFixed(),
                    feelsF: res.data?.main?.feels_like.toFixed(),
                    feelsC: ((res.data?.main?.feels_like - 32) / 1.8).toFixed(),
                    humidityPercent: res.data?.main?.humidity,
                    windSpeed: res.data?.wind?.speed?.toFixed(),
                    weather: res.data?.weather,
                    country: res.data?.sys.country
                })
                console.log(res.data)

            })
        }
        fetchData();
    }, [lat, lon])




    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            setData('')

            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`).then((res) => {
                setData({
                    name: res.data.name,
                    tempF: res.data?.main?.temp.toFixed(),
                    tempC: ((res.data?.main?.temp - 32) / 1.8).toFixed(),
                    feelsF: res.data?.main?.feels_like.toFixed(),
                    feelsC: ((res.data?.main?.feels_like - 32) / 1.8).toFixed(),
                    humidityPercent: res.data?.main?.humidity,
                    windSpeed: res.data?.wind?.speed?.toFixed(),
                    weather: res.data?.weather,
                    country: res.data?.sys.country
                })
                console.log(res.data)


                setLocation('')
            })
        }

    }

    const changeLocation = (event) => {
        setLocation(event.target.value)
    }







    const Helper = {
        CLOUDS: 'Clouds',
        RAIN: 'Rain',
        THUNDERSTORM: 'Thunderstorm',
        DRIZZLE: 'Drizzle',
        SNOW: 'Snow',
        MIST:'Mist',
        SMOKE:'Smoke',
        HAZE:'Haze',
        DUST:'Dust',
        FOG:'Fog',
        SAND:'Sand',
        ASH:'Ash',
        SQUALL:'Squall',
        TORNADO:'Tornado',
        CLEAR:'Clear',
    }





    return (
        <div>

            {data?.weather === undefined ?
                <div className="loading">
                    <h1>The data is Loading...</h1>

                    <div className="loadingio-spinner-wedges-cyl7jjxosbt">
                        <div className="ldio-gqj8ofs8e3e">
                            <div>
                                <div>
                                    <div></div>
                                </div>
                                <div>
                                    <div></div>
                                </div>
                                <div>
                                    <div></div>
                                </div>
                                <div>
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> :


                <div className="app"

                     style={data.weather[0].main === Helper.CLOUDS ? {
                             background: `url(${Clouds}) no-repeat center center/cover`
                         } :
                         data.weather[0].main === Helper.RAIN ? {
                                 background: `url(${Rainy}) no-repeat center center/cover`
                             } :
                             data.weather[0].main === Helper.SNOW ? {
                                     background: `url(${Snow}) no-repeat center center/cover`
                                 }
                                 : data.weather[0].main === Helper.CLEAR ? {
                                     background: `url(${Clear}) no-repeat center center/cover`
                                 } : data.weather[0].main === Helper.THUNDERSTORM ? {
                                         background: `url(${Thunderstorm}) no-repeat center center/cover`}
                                     :data.weather[0].main === Helper.MIST ? {
                                             background: `url(${Overcast}) no-repeat center center/cover`}
                                         : data.weather[0].main === Helper.FOG || data.weather[0].main === Helper.HAZE ||
                                         data.weather[0].main === Helper.MIST || data.weather[0].main === Helper.SMOKE ? {background: `url(${Fog}) no-repeat center center/cover`}
                                             : data.weather[0].main === Helper.ASH ? {background: `url(${Ash}) no-repeat center center/cover`}
                                                 : data.weather[0].main === Helper.DUST ||  data.weather[0].main === Helper.SAND ? {background: `url(${Dust}) no-repeat center center/cover`}
                                                     : data.weather[0].main === Helper.TORNADO ||  data.weather[0].main === Helper.SQUALL ? {
                                                             background: `url(${Tornado}) no-repeat center center/cover`}
                                                         :null
                     }
                >
                    <div className="search">
                        <input type="text"
                               value={location}
                               onChange={changeLocation}
                               onKeyDown={searchLocation}

                               placeholder={`search: ${data.name}, ${data.country}`}/>
                    </div>

                    <div className="container">
                        <div className="top">
                            <div className="location">

                                <p>{data.name}, {data.country}</p>

                            </div>
                            <div className="temp">
                                <h1>{data?.tempF}°F</h1>
                            </div>
                            <div>
                                <h1>{data?.tempC}°C </h1>
                            </div>
                            <div className="description">
                                <p>{data?.weather[0].main}</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="feels">
                                <p className="bold">{data.feelsF}°F / {data.feelsC}°C</p>
                                <p>Feels Like</p>
                            </div>
                            <div className="humidity">
                                <p className='bold'>{data.humidityPercent}%</p>
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                <p className='bold'>{data.windSpeed} MPH</p>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </div>
                </div>

            }




        </div>
    );
}

export default App;
