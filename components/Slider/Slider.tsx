import { SetStateAction, Dispatch } from "react"

interface Props {
    min: number,
    max: number,
    value: string | number,
    step: number,
    setValue: Dispatch<SetStateAction<number>>
}

export default function Slider({ min, max, value, step, setValue} : Props ) {
    return (
            <input type='range' min={min} max={max} value={value} onChange={e => setValue(Number(e.target.value))} step={step ? step : 1}/>
    )
}