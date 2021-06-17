import Header from "./components/Header";
import {useEffect, useState} from "react";
import WeatherComponent from "./components/WeatherComponent";
import axios from "axios";
import UserView from "./components/UserView";

function App() {
    const [term, setTerm] = useState('')
    const [weatherResult, setWeatherResult] = useState()
    const [city, setCity] = useState('')
    const [loginState, setLoginState] = useState(false)
    useEffect(() => {
        setLoginState(window.location.href.includes('success'))
    }, [setLoginState])

    const onWeatherResult = (apiData, searchTerm) => {
        setWeatherResult(apiData)
        setCity(searchTerm)
    }

    const onSearchClick = (searchTerm) => {
        axios.get('https://localdev.infotamia.com/weather/api/v1/weather?city=' + searchTerm)
            .then((res) => {
                return res.data
            }).then((data) => {
            onWeatherResult(data, searchTerm)
        }).catch((err) => {
            onWeatherResult(undefined, undefined)
        })
    }

    const onLogin = () => {
        axios.get('https://localdev.infotamia.com/weather/api/v1/oauth/facebook/customer').then((res) => {
            window.location.href = res.headers['location']
        }).catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className="container">
            <Header title='Weather App'/>
            <div>
                <label>{'Search Weather'}</label>
                <input placeholder={'enter city'} onChange={(event) => {
                    setTerm(event.target.value)
                }}/>
                <button onClick={() => onSearchClick(term)}>search</button>
                {weatherResult && <WeatherComponent
                    city={city}
                    temp={weatherResult?.main?.formattedTemp}
                    clear={weatherResult?.weather[0]?.main}
                    desc={weatherResult?.weather[0]?.description}/>}
            </div>
            {loginState && <UserView city = {city} onSearchClick={(searchTerm) => onSearchClick(searchTerm)}/>}
            {!loginState && <button onClick={onLogin}>Login</button>}
        </div>
    );
}

export default App;
