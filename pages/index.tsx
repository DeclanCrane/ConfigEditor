import { useEffect, useState } from 'react'
import CommandBox from '@/components/CommandBox/CommandBox'
import CommandToggle from '@/components/CommandToggle/CommandToggle'
import RadioButtons from '@/components/CommandRadioBtn/RadioButtons'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

import ParseConfig, { GetCommandByName } from '@/utils/config/ConfigParser';
import { Config, RebuildConfig } from '@/utils/config/ConfigParser';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const [ ready, setReady ] = useState(false);
  const [ config , setConfig ] = useState<Config>({ commands: [], binds: [], unknown: []})

  useEffect(() => {
    if(config.commands.length > 0)
      setReady(true);
  }, [config])

  function ReadConfig(e : React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.addEventListener('load', e => {
      if(!reader.result) return;
      
      const myConf = ParseConfig(reader.result.toString());
      setConfig(JSON.parse(JSON.stringify(myConf))); // Avoiding type errors, not sure if this is smart lol
    });
    reader.readAsText(file);
  }
  
  function PrintCommand(name: string) {
    const comm = GetCommandByName(name, config);
    console.log(comm);
  }


  return (
    <>
      <Head>
        <title>Config Editor</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <input type='file' onChange={ e => ReadConfig(e) }/>
        { ready ?
          <>
            <RadioButtons command={GetCommandByName('cg_fov', config)} 
              options={{values:[
                {name: 'hello', value: 104}, 
                {name: 'goodbye', value:69}, 
                {name: 'new', value:420}
                ]}}
              />
            <CommandBox command={GetCommandByName('cg_fov', config)} min={0} max={65}/>
            <CommandToggle command={GetCommandByName('cg_brass', config)}/>
            <button onClick={() => console.log(config)}>Print Config</button>
            <button onClick={() => console.log(RebuildConfig(config))}>Rebuild Config</button>
            <button onClick={() => PrintCommand('cg_brass')}>Print Command</button>
          </>
        : null }
      </main>
    </>
  )
}