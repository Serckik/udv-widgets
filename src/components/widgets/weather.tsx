import { ChangeEvent, useEffect, useState } from "react"
import { cities } from "../../const-data"
import { useAppDispatch } from "../hooks"
import { getWeatherByCityId } from "../store/api-actions.ts/get-actions"
import { Draggable } from "react-beautiful-dnd"
import { IMAGES_URL } from "../services/weather-api"
import { v4 as uuidv4 } from 'uuid';

function Weather() {
    const dispatch = useAppDispatch()

    const [weatherData, setWeatherData] = useState<WeatherType>({
        feels_like: 0,
        temp: 0,
        icon: '',
    })
    const [selectedCity, setSelectedCity] = useState<CityType>(cities[0])

    useEffect(() => {
        dispatch(getWeatherByCityId(selectedCity.id)).then((data) => {
            setWeatherData(data.payload as WeatherType)
        })
    }, [dispatch, selectedCity.id])

    function handleSelect(evt: ChangeEvent<HTMLSelectElement>) {
        const currentCity = cities.find((city) => city.id === Number(evt.target.value)) || selectedCity
        setSelectedCity(currentCity)
        dispatch(getWeatherByCityId(currentCity.id))
    }

    return (
        <Draggable draggableId={uuidv4()} index={1}>
            {(provided) => (
                <div className="weather-block" {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef} >
                    <select value={selectedCity.id} onChange={handleSelect}>
                        {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
                    </select>
                    <div className="weather-info">
                        <img alt="Иконка погоды" src={`${IMAGES_URL}${weatherData.icon}.png`}></img>
                        <div className="weather-data">
                            <p>Ощущается: {Math.round(weatherData.feels_like)} °C</p>
                            <p>Температура: {Math.round(weatherData.temp)} °C</p>
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default Weather