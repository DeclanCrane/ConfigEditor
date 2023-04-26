import { useEffect, useState } from 'react'
import CommandBox from '@/components/CommandBox/CommandBox'
import CommandToggle from '@/components/CommandToggle/CommandToggle'
import RadioButtons from '@/components/CommandRadioBtn/RadioButtons'
import Header from '@/components/Header/Header'
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

    if(!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', e => {
      if(!reader.result) return;
      
      const myConf = ParseConfig(reader.result.toString());
      setConfig(JSON.parse(JSON.stringify(myConf))); //TODO: Avoiding type errors, write better solution 
    });
    reader.readAsText(file);
  }

  function ReadLocalConfig(fileName : string) {
    fetch(fileName)
      .then(response => response.text())
      .then(text => {
        const conf = ParseConfig(text);
        setConfig(JSON.parse(JSON.stringify(conf)));
      });
  }

  function DownloadConfig(fileName: string, config: Config) {

    const confText = RebuildConfig(config);

    const element = document.createElement("a");

    const file = new Blob([confText], {
      type: 'text/plain'
    });

    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  }
  
  function PrintCommand(name: string) {
    const comm = GetCommandByName(name, config);
    console.log(comm);
  }

  return (
    <>
      <Head>
        <title>Black Ops | Config Editor</title>
        <meta name="description" content="Config Editor for Call of Duty: Black Ops" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <button onClick={() => DownloadConfig('config_mp.cfg', config)}>Download Config</button>
      </Header>
      <main className={styles.main}>
        { !ready ?
          <div className={styles.configSelection}>
            <input id="configSelect" type='file' onChange={ e => ReadConfig(e) } style={{display: 'none'}}/>
            <label htmlFor="configSelect" className={styles.selectionBtn}>
              <img src='upload-arrow.svg' className={styles.selectionBtnImg}/>
              <p>Upload Config</p>
            </label>
            <label className={styles.selectionBtn}>
              <img src='upload-arrow.svg' className={styles.selectionBtnImg} onClick={() => ReadLocalConfig('config_mp.cfg')} style={{ transform: 'rotate(90deg)'}}/>
              <p>Use Default</p>
            </label>
          </div>
        : null }
        { ready ?
          <>
            <div className={styles.toolbar}>
            </div>
            <h2>Game</h2>
            {/* <RadioButtons command={GetCommandByName('cg_fov', config)} 
              options={{values:[
                {name: 'hello', value: 104}, 
                {name: 'goodbye', value:65}, 
                {name: 'new', value:420}
                ]}}
              /> */}
            <CommandBox name='Field of View' command={GetCommandByName('cg_fov_default', config)} step={0} min={65} max={90}/>
            <CommandBox name='Max FPS' command={GetCommandByName('com_maxfps', config)} step={0} min={0} max={333}/>
            <CommandBox name='Sensitivity' command={GetCommandByName('sensitivity', config)} step={0.1} min={0} max={25}/>
            <CommandToggle name='Mouse Acceleration' command={GetCommandByName('cl_mouseAccel', config)}/>
            <h2>Graphics</h2>
            <CommandToggle name='Show Brass' command={GetCommandByName('cg_brass', config)}/>
            <CommandToggle name='Show Blood' command={GetCommandByName('cg_blood', config)}/>
            <CommandToggle name='Specular Lighting' command={GetCommandByName('r_specular', config)}/>
            <CommandToggle name='Depth of Field' command={GetCommandByName('r_dof_enable', config)}/>
            <CommandToggle name='Distortion Effect' command={GetCommandByName('r_distortion', config)}/>
            <CommandToggle name='Blur Effect' command={GetCommandByName('r_blur_allowed', config)}/>
            <h2>Network</h2>
            <CommandBox name='Max Packets' command={GetCommandByName('cl_maxpackets', config)} step={0} min={1} max={100}/>
            <CommandBox name='Snaps' command={GetCommandByName('snaps', config)} step={0} min={1} max={30}/>
            <CommandBox name='Max Rate' command={GetCommandByName('sv_maxRate', config)} step={100} min={10000} max={25000}/>
            {/* <button onClick={() => console.log(config)}>Print Config</button>
            <button onClick={() => console.log(RebuildConfig(config))}>Rebuild Config</button>
            <button onClick={() => PrintCommand('cg_brass')}>Print Command</button>
            <button onClick={() => ReadLocalConfig('config_mp.cfg')}>Read Local</button> */}
          </>
        : null }
      </main>
    </>
  )
}
