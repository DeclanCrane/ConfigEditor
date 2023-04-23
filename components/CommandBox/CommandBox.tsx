import { SetStateAction, useEffect, useState } from 'react'
import Slider from '../Slider/Slider';
import styles from './CommandBox.module.css'
import { Command } from '@/utils/config/ConfigParser'

interface Props {
    command: Command;
    min: number,
    max: number
}

export default function CommandBox({command, min, max} : Props) {
    const [value, setValue] = useState<string | number>(command.value);

    useEffect(() => {
        if(!command) return;
        command.value = value;
    }, [value])

    return (
        <div>
            {value ?
                <p>{command.name}</p> 
            : null }
            <input type='number' value={value} onChange={e => setValue(e.target.value)}/>
            <Slider min={min} max={max} value={value} setValue={setValue}/>
        </div>
    )
}