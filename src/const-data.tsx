import CurrencyChecker from "./components/widgets/currency-checker";
import CurrencyRubles from "./components/widgets/currency-rubles";
import Weather from "./components/widgets/weather";

export const cities = [
    {
        "id": 524894,
        "name": "Москва",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 37.606667,
            "lat": 55.761665
        }
    },
    {
        "id": 498817,
        "name": "Санкт-Петербург",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 30.264168,
            "lat": 59.894444
        }
    },
    {
        "id": 1496747,
        "name": "Новосибирск",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 82.934441,
            "lat": 55.041111
        }
    },
    {
        "id": 1486209,
        "name": "Екатеринбург",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 60.612499,
            "lat": 56.857498
        }
    },
    {
        "id": 551487,
        "name": "Казань",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 49.122139,
            "lat": 55.788738
        }
    },
    {
        "id": 520555,
        "name": "Нижний новгород",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 44.002048,
            "lat": 56.328674
        }
    },
    {
        "id": 1508291,
        "name": "Челябинск",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 61.429722,
            "lat": 55.154442
        }
    },
    {
        "id": 1502026,
        "name": "Красноярск",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 92.791672,
            "lat": 56.00972
        }
    },
    {
        "id": 499099,
        "name": "Самара",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 50.150002,
            "lat": 53.200001
        }
    },
    {
        "id": 479561,
        "name": "Уфа",
        "state": "",
        "country": "RU",
        "coord": {
            "lon": 56.037498,
            "lat": 54.775002
        }
    },
]

export const widgetList = ['Конвертация рубля', 'Мониторинг валют', 'Погода']

export const componentDictionary: { [key: string]: React.ComponentType<any> } = {
    'Конвертация рубля': CurrencyRubles,
    'Мониторинг валют': CurrencyChecker,
    'Погода': Weather,
};