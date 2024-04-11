import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useAppSelector } from "../hooks"
import useCurrencyData from "../hooks/currency-checker";
import styled from "@emotion/styled";
import { Select } from "../../pages/main-page";

interface CurrencyProps {
    isUp: boolean | null;
}

const CurrencyCheckerFlex = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
`

const ConvertValue = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    text-align: center;
    font-size: 2rem;
`

const Triangle = styled.div<CurrencyProps>`
    transition: 1s;
    margin-top: 10px;
    position: relative;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid ${(props) => props.isUp === null ? 'rgb(73, 73, 73)' : props.isUp ? 'green' : 'red'};
    transform: ${(props) => props.isUp === false && 'rotate(180deg)'};
`


const CurrencyText = styled.p<CurrencyProps>((props) => ({
    transition: '1',
    color: props.isUp === null ? '' : props.isUp ? 'lightgreen' : 'lightcoral',
}))

type CurrencyCheckerProps = {
    index: number;
    droppableId: number;
    onChangeProps: (droppableId: number, index: number, props: any) => void
    data: { mainCurrency: string, subCurrency: string }
}

function CurrencyChecker({ index, droppableId, onChangeProps, ...props }: CurrencyCheckerProps) {

    const CurrencyCheckerSelect = styled(Select)`
        display: inline-block;
        margin: 0px;
    `

    const propsData = {
        mainCurrency: props.data ? props.data.mainCurrency : 'EUR',
        subCurrency: props.data ? props.data.subCurrency : 'USD',
    }

    const prevValueRef = useRef<number>(0);

    const currencyData = useAppSelector((state) => state.currencyData)

    const [currencyList, setCurrencyList] = useState<string[]>([])
    const [mainCurrency, setMainCurrency] = useState<string>(propsData.mainCurrency)
    const [subCurrency, setSubCurrency] = useState<string>(propsData.subCurrency)
    const [isUp, setIsUp] = useState<boolean | null>(null)

    const { currencyChecker, todayCurrency } = useCurrencyData(mainCurrency, subCurrency);

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
            <CurrencyCheckerFlex>
                <CurrencyCheckerSelect name="main-currency" value={mainCurrency} onChange={handleCurrencyChange}>
                    {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </CurrencyCheckerSelect>
                <CurrencyCheckerSelect name="sub-currency" value={subCurrency} onChange={handleCurrencyChange}>
                    {currencyList.map((currency) => <option key={currency} value={currency}>{currency}</option>)}
                </CurrencyCheckerSelect>
            </CurrencyCheckerFlex>
            <ConvertValue>
                <CurrencyText isUp={isUp}>{currencyChecker.conversion_rate}</CurrencyText>
                <Triangle isUp={isUp}></Triangle>
            </ConvertValue>
        </div>
    )
}

export default CurrencyChecker