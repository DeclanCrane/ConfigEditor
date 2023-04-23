import { useState } from 'react'
import { Command } from "@/utils/config/ConfigParser"

interface Props {
    command: Command
}

export default function CommandToggle({ command } : Props) {

    const [toggle, setToggle] = useState(command.value ? true : false);

    return (
        <div>
            <p>{command.name}</p>
            <input type='checkbox' checked={toggle} 
                onChange={(e) => {
                    command.value = e.target.checked ? 1 : 0; 
                    setToggle(e.target.checked)}}
            />
        </div>
    )
}