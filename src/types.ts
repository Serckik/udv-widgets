type CurrencyRublesType = {
    Valute: { [key: string]: CurrencyType }
}

type CurrencyType = {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number,
}

type CurrencyListType = {
    charCode: string,
    name: string,
}

type CurrencyChecker = {
    base_code: string,
    target_code: string,
    conversion_rate: number,
}

type CurrencyHistory = {
    conversion_rates: { [key: string]: number }
}

type CurrencyCodes = {
    supported_codes: string[][]
}

type CityType = {
    id: number,
    name: string,
    coord: CoordType
}

type CoordType = {
    lon: number,
    lat: number,
}

type WeatherApiType = {
    main: {
        feels_like: number,
        temp: number,
    }
    weather: [{ icon: string }]
}

type WeatherType = {
    feels_like: number,
    temp: number,
    icon: string
}