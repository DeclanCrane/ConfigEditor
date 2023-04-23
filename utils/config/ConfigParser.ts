export type Command = {
    name: string,
    value: number | string,
    prefix: string,
    line: number // Index used for resturcturing config
}

export type Bind = {
    key: string,
    action: string,
    prefix: string,
    line: number // Index used for resturcturing config
}

type Line = {
    command: string,
    line: number
}

export type Config = {
    commands: Command[],
    binds: Bind[]
    unknown: Line[]
}

function ParseLine(commandLine: string, idx: number, config: Config) {
    let prefix = '';
    for(let i = 0; i < commandLine.length; i++) {
        prefix += commandLine[i];

        if(prefix == 'bind2' || prefix == 'bind') {
            ParseBind(commandLine, idx, config);
            return;
        }

        if(prefix == 'seta') {
            ParseCommand(commandLine, idx, config);
            return;
        }
    }
    // No match
    if(commandLine == '' || commandLine == ' ') // Empty string
        return;
    config.unknown.push({ command: commandLine, line: idx});
}

function ParseBind(commandLine: string, idx: number, config: Config) {
    let bind : Bind = {prefix: '', key: '', action: '', line: idx};

    // Get the value of the first ", this is where the command value begins
    const valueIdx = commandLine.indexOf('"');
    // Slice value from commandline
    const value = commandLine.slice(valueIdx);
    // Get individual commands before value
    const sections = commandLine.slice(0, valueIdx).split(' ');

    if(sections.length == 3) {
        bind.prefix = sections[0]; // Prefix
        bind.key = sections[1]; // Key 
        bind.action = value.replaceAll('"', ""); // Command
    } else {
        console.log(`Bind Parse Error ${commandLine}`);
        return false;
    }

    config.binds.push(bind);
    return true;
}

function ParseCommand(commandLine: string, idx: number, config: Config) {
    const valueIdx = commandLine.indexOf('"');

    const value = commandLine.slice(valueIdx);

    const sections = commandLine.slice(0, valueIdx).split(' ');
    if(sections.length == 3) {
        config.commands.push({prefix: sections[0], name: sections[1], value: value.replaceAll('"', ""), line: idx});
    } else {
        console.log(`Command Parse Error ${commandLine}`);
        return false;
    }
}

function ParseConfig(fileText: string) {
    const config = { commands: [], binds: [], unknown: [] };
    const strings = fileText.split('\n');

    strings.map((string, idx) => {
        ParseLine(string, idx, config);
    });

    if(config.commands.length <= 0 && config.commands.length <= 0) {
        console.log('Error Parsing Config');
    } else {
        return config;
    }
}

function RebuildConfig(config: Config) : string {
    const configStrings : string[] = [];
    config.unknown.map(unk => configStrings.splice(unk.line, 0, `${unk.command}\n`));
    config.binds.map(bind => configStrings.splice(bind.line, 0, `${bind.prefix} ${bind.key} "${bind.action}"\n`));
    config.commands.map(command => configStrings.splice(command.line, 0, `${command.prefix} ${command.name} "${command.value}"\n`));

    let configText = '';
    configStrings.map(str => {
        configText = configText.concat(str);
    })
    return configText;
}

function GetCommandByName(commandName: string, config: Config) {
    const com = config.commands.filter(command => {
        if(command.name === commandName)
            return command;
    })
    return com[0];
}

export default ParseConfig;
export { GetCommandByName, RebuildConfig }