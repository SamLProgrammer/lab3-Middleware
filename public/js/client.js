window.onload = () => {
    const id_input = document.getElementById('id_input');
    const queryButton = document.getElementById('queryButton');
    const launchInstanceButton = document.getElementById('launch_instance_button');
    launchInstanceButton.addEventListener('click', function (event) {launchNewInstance(event, launchInstanceButton)})
    queryButton.addEventListener('click', function (event) { sendQueryData(event, id_input) })
}

function launchNewInstance(event, launchInstanceButton) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:8000/newInstance', true);
    xhr.onload = () => {
        alert(JSON.stringify(xhr.response))
    }
    xhr.send(null);
}

function sendQueryData(event, id_input) {
    const xhr = new XMLHttpRequest();
    alert(id_input.getAttribute('id'))
    xhr.open("GET", 'http://localhost:8000/query' + "?id=" + id_input.value, true);
    xhr.onload = () => {
        alert(JSON.stringify(xhr.response))
    }
    xhr.send(null);
}

const socket = io();
socket.on('message', (arg) => {
    //aquí vamos dude ->> continuar
    let stats = [];
    const container = document.getElementById('statsContainer')
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridRow = 'auto auto auto auto auto auto auto auto auto auto';
    container.style.position = 'relative';
    container.style.top = '0px';
    container.style.height = '200px';
    container.style.overflow = 'scroll';

    for(let i = 0; i < 10; i++) {
    const ramIndicator = document.createElement('div')
    const cpuIndicator = document.createElement('div')

    ramIndicator.style.backgroundColor = 'green';
    cpuIndicator.style.backgroundColor = 'red';
    ramIndicator.style.position = 'absolute';
    cpuIndicator.style.position = 'absolute';

    ramIndicator.style.bottom = '0px';
    cpuIndicator.style.bottom = '0px';
    ramIndicator.style.left = (i*10) + '%';
    ramIndicator.style.height = arg.ram + 'px';
    cpuIndicator.style.height = arg.cpu + 'px';
    ramIndicator.style.width = 5 + '%';
    cpuIndicator.style.width = 5 + '%';
    cpuIndicator.style.left = (5 + (10*i)) + '%';
    container.appendChild(ramIndicator);
    container.appendChild(cpuIndicator);
    }
})