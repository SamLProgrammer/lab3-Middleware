window.onload = () => {
    const id_input = document.getElementById('id_input');
    const queryButton = document.getElementById('queryButton');
    queryButton.addEventListener('click', function (event) { sendQueryData(event, id_input) })
}

function sendQueryData(event, id_input) {
    const xhr = new XMLHttpRequest();
    alert(id_input.getAttribute('id'))
    xhr.open("GET", 'http://localhost:8000/query' + "?id=" + id_input.value, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(JSON.stringify(xhr.response))
        }
    }
    xhr.send(null);
}

const socket = io();
socket.on('message', (arg) => {
    const container = document.getElementById('statsContainer')
    container.style.display = 'grid';
    container.style.gridRow = 'auto auto';
    container.style.position = 'relative';
    container.style.top = '0px';
    container.style.height = '100px';
    container.style.overflow = 'scroll';
    const ramIndicator0 = document.createElement('div')
    const cpuIndicator0 = document.createElement('div')

    ramIndicator0.style.backgroundColor = 'green';
    cpuIndicator0.style.backgroundColor = 'red';
    ramIndicator0.style.position = 'absolute';
    cpuIndicator0.style.position = 'absolute';

    ramIndicator0.style.height = arg.ram + 'px';
    cpuIndicator0.style.height = arg.cpu + 'px';
    ramIndicator0.style.width = 20 + '%';
    cpuIndicator0.style.width = 20 + '%';
    cpuIndicator0.style.left = 50 + '%';
    console.log('aja')

    container.appendChild(ramIndicator0);
    container.appendChild(cpuIndicator0);
})