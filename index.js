import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';

console.log('\n🍄 Barry\'s Bot 🍄');
const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

// Mostrar información personalizada del bot
say('Barry\nBot', { font: 'block', align: 'center', colors: ['white'] });
say(`Multi Device`, { font: 'chrome', align: 'center', colors: ['red'] });
say(`Developed By • Tu Nombre`, { font: 'console', align: 'center', colors: ['yellow'] });
say(`Version: 1.0.0`, { font: 'console', align: 'center', colors: ['cyan'] });

// Control de ejecución del bot
let isRunning = false;

function start(file) {
    if (isRunning) return;
    isRunning = true;
    let args = [join(__dirname, file), ...process.argv.slice(2)];
    say([process.argv[0], ...args].join(' '), { font: 'console', align: 'center', colors: ['green'] });
    
    setupMaster({ exec: args[0], args: args.slice(1) });
    let p = fork();
    
    p.on('message', data => {
        switch (data) {
            case 'reset':
                p.process.kill();
                isRunning = false;
                start.apply(this, arguments);
                break;
            case 'uptime':
                p.send(process.uptime());
                break;
        }
    });
    
    p.on('exit', (_, code) => {
        isRunning = false;
        console.error('🚩 Error:\n', code);
        process.exit();
    });
    
    watchFile(args[0], () => {
        unwatchFile(args[0]);
        start(file);
    });

    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
    if (!opts['test']) {
        if (!rl.listenerCount()) rl.on('line', line => {
            p.emit('message', line.trim());
        });
    }
}

process.on('warning', (warning) => {
    if (warning.name === 'MaxListenersExceededWarning') {
        console.warn('🚩 Se excedió el límite de Listeners en:');
        console.warn(warning.stack);
    }
});

// Iniciar el bot con el archivo principal
start('sixfin.js');