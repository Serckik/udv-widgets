import { ChangeEvent, useEffect, useState } from "react"
import { cities } from "../../const-data"
import { useAppDispatch } from "../hooks"
import { getWeatherByCityId } from "../store/api-actions.ts/get-actions"
import { IMAGES_URL } from "../services/weather-api"

type WeatherProps = {
    index: number;
    droppableId: number
    data: CityType;
    onChangeProps: (droppableId: number, index: number, props: WidgetsPropsType) => void
}

function Weather({ index, droppableId, onChangeProps, ...props }: WeatherProps) {
    const dispatch = useAppDispatch()

    const [weatherData, setWeatherData] = useState<WeatherType>({
        feels_like: 0,
        temp: 0,
        icon: '',
    })
    const [selectedCity, setSelectedCity] = useState<CityType>(cities[0])
    useEffect(() => {
        if (props.data) {
            setSelectedCity(props.data)
        }
        else {
            onChangeProps(droppableId, index, cities[0])
        }
    }, [props.data])

    useEffect(() => {
        dispatch(getWeatherByCityId(selectedCity.id)).then((data) => {
            if (data.payload) {
                setWeatherData(data.payload as WeatherType)
            }
        })
    }, [dispatch, selectedCity.id])

    function handleSelect(evt: ChangeEvent<HTMLSelectElement>) {
        const currentCity = cities.find((city) => city.id === Number(evt.target.value)) || selectedCity
        setSelectedCity(currentCity)
        dispatch(getWeatherByCityId(currentCity.id))
        onChangeProps(droppableId, index, currentCity)
    }

    return (
        <div className="weather-block" >
            <select value={selectedCity.id} onChange={handleSelect}>
                {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
            </select>
            <div className="weather-info">
                {weatherData.icon ?
                    <>
                        <img alt="Иконка погоды" src={`${IMAGES_URL}${weatherData.icon}.png`}></img>
                        <div className="weather-data">
                            <p>Ощущается: {Math.round(weatherData.feels_like)} °C</p>
                            <p>Температура: {Math.round(weatherData.temp)} °C</p>
                        </div>
                    </> :
                    <>Сервер не отвечает</>
                }
            </div>
        </div>
    )
}

export default Weather