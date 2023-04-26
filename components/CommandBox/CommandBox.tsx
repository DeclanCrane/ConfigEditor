import { SetStateAction, useEffect, useState } from 'react'
import Slider from '../Slider/Slider';
import styles from './CommandBox.module.css'
import { Command } from '@/utils/config/ConfigParser'

interface Props {
    command: Command;
    min: number,
    max: number,
    step: number,
    name: string
}

export default function CommandBox({command, min, max, step, name} : Props) {
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
            <p>{name}</p> 
            <Slider step={step} min={min} max={max} value={value} setValue={setValue}/>
            <input type='text' value={value} onChange={e => setValue(Number(e.target.value))}/>
        </div>
    )
}