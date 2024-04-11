export namespace WeatherTypes {
    export type CityType = {
        id: number,
        name: string,
        coord: CoordType
    }

    export type CoordType = {
        lon: number,
        lat: number,
    }

    export type WeatherApiType = {
        main: {
            feels_like: number,
            temp: number,
        }
        weather: [{ icon: string }]
    }

    export type WeatherType = {
        feels_like: number,
        temp: number,
        icon: string
    }
}