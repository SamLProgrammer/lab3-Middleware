const socket = io();
socket.on('message', (arg) => {
    const ramIndicator = document.createElement('')
    console.log(arg.ram + ' ' + arg.cpu)
})