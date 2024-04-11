import { ChangeEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getCurrencyRubles } from "../store/api-actions.ts/get-actions"
import { Select } from "../../pages/main-page";
import styled from "@emotion/styled";
import { CurrencyRublesTypes } from "../../types/currencyRubles";

const Input = styled.input`
    background-color: rgb(234, 197, 238);
    padding-left: 10px;
`

type CurrencyRublesProps = {
    index: number;
    droppableId: number;
    onChangeProps: (droppableId: number, index: number, props: any) => void
    data: string;
}

function CurrencyRubles({ index, droppableId, onChangeProps, ...props }: CurrencyRublesProps) {
    const RublesConversionFlex = styled.div`
        height: 30px;
        margin-bottom: 20px;
        display: flex;
        gap: 20px;
    `

    const dispatch = useAppDispatch()

    const currencyData = useAppSelector((state) => state.currencyData)
    const [currencyList, setCurrencyList] = useState<CurrencyRublesTypes.CurrencyListType[]>([])
    const [rubles, setRubles] = useState(1)
    const [otherCurrency, setOtherCurrency] = useState(1)
    const [selectedCurrency, setSelectedCurrency] = useState('')

    useEffect(() => {
        setRubles(1)
        const cutCurrencyData = Object.entries(currencyData).map(([charCode, data]) => ({ charCode, name: data.Name }))
        setCurrencyList([...cutCurrencyData])
        if (cutCurrencyData.length !== 0 && !props.data) {
            setSelectedCurrency(cutCurrencyData[0].charCode)
        }
        else {
            setSelectedCurrency(props.data)
        }
    }, [currencyData, props.data])

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
        onChangeProps(droppableId, index, evt.target.value)
    }

    return (
        <div>
            <RublesConversionFlex>
                <Input type="number" value={rubles} onChange={handleRubleField}></Input>
                <span>Российский рубль</span>
            </RublesConversionFlex>
            <RublesConversionFlex>
                <Input type="number" value={otherCurrency} onChange={handleOtherCurrencyField}></Input>
                <Select onChange={handleSelect} value={selectedCurrency}>
                    {currencyList.map(currency => <option key={currency.charCode} value={currency.charCode}>{currency.name} ({currency.charCode})</option>)}
                </Select>
            </RublesConversionFlex>
        </div>
    )
}
export default CurrencyRubles