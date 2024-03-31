import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getCurrencyRubles } from "../store/api-actions.ts/get-actions"
import { Draggable } from "react-beautiful-dnd"
import { v4 as uuidv4 } from 'uuid';

function CurrencyRubles() {
    const dispatch = useAppDispatch()

    const currencyData = useAppSelector((state) => state.currencyData)
    const [currencyList, setCurrencyList] = useState<CurrencyListType[]>([])
    const [rubles, setRubles] = useState(1)
    const [otherCurrency, setOtherCurrency] = useState(1)
    const [selectedCurrency, setSelectedCurrency] = useState('')

    useEffect(() => {
        const cutCurrencyData = Object.entries(currencyData).map(([charCode, data]) => ({ charCode, name: data.Name }))
        setCurrencyList([...cutCurrencyData])
        if (cutCurrencyData.length !== 0) {
            setSelectedCurrency(cutCurrencyData[0].charCode)
        }
    }, [currencyData])

    useEffect(() => {
        dispatch(getCurrencyRubles())
    }, [])

    useEffect(() => {
        if (selectedCurrency) {
            const currentOnePercent = currencyData[selectedCurrency].Nominal / currencyData[selectedCurrency].Value
            setOtherCurrency(currentOnePercent * rubles)
        }
    }, [selectedCurrency])

    function handleRubleField(evt: ChangeEvent<HTMLInputElement>) {
        const value = Number(evt.target.value)
        const currentOnePercent = currencyData[selectedCurrency].Nominal / currencyData[selectedCurrency].Value
        setRubles(value)
        setOtherCurrency(currentOnePercent * value)
    }

    function handleOtherCurrencyField(evt: ChangeEvent<HTMLInputElement>) {
        const value = Number(evt.target.value)
        const currentOnePercent = currencyData[selectedCurrency].Value / currencyData[selectedCurrency].Nominal
        setRubles(currentOnePercent * value)
        setOtherCurrency(value)
    }

    function handleSelect(evt: ChangeEvent<HTMLSelectElement>) {
        setSelectedCurrency(evt.target.value)
    }

    return (
        <Draggable draggableId={uuidv4()} index={1}>
            {(provided) => (
                <div className="rubles-conversion" {...provided.draggableProps}  {...provided.dragHandleProps} ref={provided.innerRef}>
                    <div className="rubles-field">
                        <input type="number" value={rubles} onChange={handleRubleField}></input>
                        <span>Российский рубль</span>
                    </div>
                    <div className="other-field">
                        <input type="number" value={otherCurrency} onChange={handleOtherCurrencyField}></input>
                        <select onChange={handleSelect}>
                            {currencyList.map(currency => <option key={currency.charCode} value={currency.charCode}>{currency.name} ({currency.charCode})</option>)}
                        </select>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
export default CurrencyRubles