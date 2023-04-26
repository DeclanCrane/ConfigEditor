import { useState } from 'react'
import { Command } from "@/utils/config/ConfigParser"
import styles from './CommandToggle.module.css'

interface Props {
    command: Command,
    name: string
}

export default function CommandToggle({ command, name } : Props) {

    const [toggle, setToggle] = useState(command.value ? true : false);

    return (
        <div className={styles.container}>
            <input type='checkbox' checked={toggle} className={styles.toggle} 
                onChange={(e) => {
                    command.value = e.target.checked ? 1 : 0; 
                    setToggle(e.target.checked)}}
            />
            <p>{name}</p>
        </div>
    )
}