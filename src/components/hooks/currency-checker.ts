import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { getCurrencyChecker, getTodayCurrency, getCurrencyRubles } from "../store/api-actions.ts/get-actions";
import { CurrencyChecker } from "../../types/currencyChecker";

const useCurrencyData = (mainCurrency: string, subCurrency: string): { currencyChecker: CurrencyChecker.CurrencyChecker, todayCurrency: number } => {
    const dispatch = useAppDispatch();
    const [currencyChecker, setCurrencyChecker] = useState({
        base_code: '',
        target_code: '',
        conversion_rate: 0,
    });
    const [todayCurrency, setTodayCurrency] = useState(0);

    useEffect(() => {
        dispatch(getCurrencyRubles());

        console.log(mainCurrency, currencyChecker);

        dispatch(getCurrencyChecker({ base_currency: mainCurrency, second_currency: subCurrency }))
            .then(data => {
                if (data.payload) {
                    setCurrencyChecker(data.payload as CurrencyChecker.CurrencyChecker);
                }
            });

        dispatch(getTodayCurrency({ base_currency: mainCurrency, second_currency: subCurrency }))
            .then(data => {
                if (data.payload) {
                    setTodayCurrency(data.payload as number);
                }
            });

        const intervalId = setInterval(() => {
            dispatch(getCurrencyChecker({ base_currency: mainCurrency, second_currency: subCurrency }))
                .then(data => {
                    if (data.payload) {
                        setCurrencyChecker(data.payload as CurrencyChecker.CurrencyChecker);
                    }
                });
        }, 300000);

        return () => clearInterval(intervalId);
    }, [dispatch, mainCurrency, subCurrency]);

    return { currencyChecker, todayCurrency };
};

export default useCurrencyData;