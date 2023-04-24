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
    const [value, setValue] = useState<number>(Number(command.value));

    useEffect(() => {
        if(!command) return;

        // Make sure value is within bounds
        if(value > max) setValue(max);
        if(value < min) setValue(min);

        command.value = value;
    }, [value])

    return (
        <div>
            <p>{command.name}</p> 
            <input type='text' value={value} onChange={e => setValue(Number(e.target.value))}/>
            <Slider min={min} max={max} value={value} setValue={setValue}/>
        </div>
    )
}