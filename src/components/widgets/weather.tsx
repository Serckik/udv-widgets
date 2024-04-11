import { ChangeEvent, useEffect, useState } from "react"
import { cities } from "../../const-data"
import { useAppDispatch } from "../hooks"
import { getWeatherByCityId } from "../store/api-actions.ts/get-actions"
import { IMAGES_URL } from "../services/weather-api"
import styled from "@emotion/styled";
import { Select } from "../../pages/main-page"
import { WeatherTypes } from "../../types/weather"
import { WidgetsPropsType } from "../../types"

const WeatherInfo = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;

    > .weather-data {
        text-align: right;
    }

    > .weather-data p{
        margin-bottom: 5px;
    }

    > img{
        background-color: rgb(82, 201, 238);
        border-radius: 50%;
    }
`

type WeatherProps = {
    index: number;
    droppableId: number
    data: WeatherTypes.CityType;
    onChangeProps: (droppableId: number, index: number, props: WidgetsPropsType) => void
}

function Weather({ index, droppableId, onChangeProps, ...props }: WeatherProps) {
    const dispatch = useAppDispatch()

    const [weatherData, setWeatherData] = useState<WeatherTypes.WeatherType>({
        feels_like: 0,
        temp: 0,
        icon: '',
    })
    const [selectedCity, setSelectedCity] = useState<WeatherTypes.CityType>(cities[0])
    useEffect(() => {
        if (props.data) {
            setSelectedCity(props.data)
        }
        else {
            onChangeProps(droppableId, index, cities[0])
        }
    }, [props.data])

    useEffect(() => {
        if (props.data && props.data !== selectedCity) { return }
        dispatch(getWeatherByCityId(selectedCity.id)).then((data) => {
            if (data.payload) {
                setWeatherData(data.payload as WeatherTypes.WeatherType)
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
            <Select value={selectedCity.id} onChange={handleSelect}>
                {cities.map((city) => <option key={city.id} value={city.id}>{city.name}</option>)}
            </Select>
            <WeatherInfo>
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
            </WeatherInfo>
        </div>
    )
}

export default Weather