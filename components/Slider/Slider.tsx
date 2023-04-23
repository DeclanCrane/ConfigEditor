import { SetStateAction, Dispatch } from "react"

interface Props {
    min: number,
    max: number,
    value: string | number,
    setValue: Dispatch<SetStateAction<string | number>>
}

export default function Slider({ min, max, value, setValue} : Props ) {
    return (
            <input type='range' min={min} max={max} value={value} onChange={e => setValue(e.target.value)} />
    )
}