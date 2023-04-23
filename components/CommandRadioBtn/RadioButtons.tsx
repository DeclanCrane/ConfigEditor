import { useState, useEffect } from 'react'
import { Command } from "@/utils/config/ConfigParser"

interface Value {
    name: string,
    value: number,
}

interface Options {
    values: Value[]
}

interface Props {
    command: Command,
    options: Options
}

export default function RadioButtons({ command, options } : Props) {
    
    const [value, setValue] = useState(command.value)
    
    useEffect(() => {
        command.value = value;
        console.log(value);
    }, [value])

    return (
        <div>
            { options.values.map(option => {
                return <div key={option.name}>
                    <p>{option.name}</p>
                    <input type='radio'
                        name={command.name}
                        onClick={() => setValue(option.value)}
                    />
                </div>
            })}
        </div>
    )
}