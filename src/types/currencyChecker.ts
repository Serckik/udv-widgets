export namespace CurrencyChecker {
    export type CurrencyHistory = {
        conversion_rates: { [key: string]: number }
    }

    export type CurrencyCodes = {
        supported_codes: string[][]
    }

    export type CurrencyChecker = {
        base_code: string,
        target_code: string,
        conversion_rate: number,
    }
}