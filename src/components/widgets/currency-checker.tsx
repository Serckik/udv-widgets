import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getCurrencyChecker, getCurrencyRubles, getTodayCurrency } from "../store/api-actions.ts/get-actions"

type CurrencyCheckerProps = {
    index: number;
    droppableId: number;
    onChangeProps: (droppableId: number, index: number, props: any) => void
    data: { mainCurrency: string, subCurrency: string }
}

function CurrencyChecker({ index, droppableId, onChangeProps, ...props }: CurrencyCheckerProps) {
    const dispatch = useAppDispatch()

    const prevValueRef = useRef<number>(0);

    const currencyData = useAppSelector((state) => state.currencyData)
    const [todayCurrency, setTodayCurrency] = useState(0)
    const [currencyChecker, setCurrencyChecker] = useState<CurrencyChecker>({
        base_code: '',
        target_code: '',
        conversion_rate: 0,
    })

    const [currencyList, setCurrencyList] = useState<string[]>([])
    const [mainCurrency, setMainCurrency] = useState<string>('EUR')
    const [subCurrency, setSubCurrency] = useState<string>('USD')
    const [isUp, setIsUp] = useState<boolean | null>(null)

    useEffect(() => {
        dispatch(getCurrencyRubles())
    }, [])

    useEffect(() => {
        if (props.data) {
            setMainCurrency(props.data.mainCurrency)
            setSubCurrency(props.data.subCurrency)
        }
        else {
            onChangeProps(droppableId, index, { mainCurrency: mainCurrency, subCurrency: subCurrency })
        }
    }, [props.data])

    useEffect(() => {
        if (props.data && props.data.mainCurrency !== mainCurrency && props.data.subCurrency !== subCurrency) { return }
        dispatch(getCurrencyChecker({ base_currency: mainCurrency, second_currency: subCurrency }))
            .then(data => {
                if (data.payload) {
                    setCurrencyChecker(data.payload as CurrencyChecker)
                }
            })
        dispatch(getTodayCurrency({ base_currency: mainCurrency, second_currency: subCurrency }))
            .then(data => {
                if (data.payload) {
                    setTodayCurrency(data.payload as number)
                }
            })
        const intervalId = setInterval(() => {
            dispatch(getCurrencyChecker({ base_currency: mainCurrency, second_currency: subCurrency }))
                .then(data => {
                    if (data.payload) {
                        setCurrencyChecker(data.payload as CurrencyChecker)
                    }
                })
        }, 300000);
        return () => {
            clearInterval(intervalId);
        };
    }, [dispatch, mainCurrency, subCurrency])

    useEffect(() => {
        const cutCurrencyData = Object.keys(currencyData).map((key) => key).concat('RUB')
        setCurrencyList([...cutCurrencyData])
    }, [currencyData])

    useEffect(() => {
        if (prevValueRef.current === 0) {
            todayCurrency <= currencyChecker.conversion_rate ? setIsUp(true) : setIsUp(false)
        }
        else {
            prevValueRef.current <= currencyChecker.conversion_rate ? setIsUp(true) : setIsUp(false)
        }
        prevValueRef.current = currencyChecker.conversion_rate
    }, [currencyChecker])

    function handleCurrencyChange(evt: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = evt.target;
        if (name === 'main-currency') {
            setMainCurrency(value);
            onChangeProps(droppableId, index, { mainCurrency: value, subCurrency: subCurrency })
        }
        else {
            setSubCurrency(value);
            onChangeProps(droppableId, index, { mainCurrency: mainCurrency, subCurrency: value })
        }
        prevValueRef.current = 0
        setIsUp(null)
    }

    return (
        <div className="currency-checker-block">
            <div className="currency-select-block">
                <select name="main-currency" className="main-currency" value={mainCurrency} onChange={handleCurrencyChange}>
                    {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
                <select name="sub-currency" className="sub-currency" value={subCurrency} onChange={handleCurrencyChange}>
                    {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </select>
            </div>
            <div className="convert-value">
                <p className={isUp === null ? '' : isUp ? 'great' : 'bad'}>{currencyChecker.conversion_rate}</p>
                <div className={`triangle ${isUp === null ? '' : isUp ? 'great' : 'bad'}`}></div>
            </div>
        </div>
    )
}

export default CurrencyChecker