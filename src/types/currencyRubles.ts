export namespace CurrencyRublesTypes {
    export type CurrencyRublesType = {
        Valute: { [key: string]: CurrencyType }
    }

    export type CurrencyType = {
        ID: string,
        NumCode: string,
        CharCode: string,
        Nominal: number,
        Name: string,
        Value: number,
        Previous: number,
    }

    export type CurrencyListType = {
        charCode: string,
        name: string,
    }
}