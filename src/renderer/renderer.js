
// Use the exposed API from preload.js
window.electron.ipcRenderer.on('stats-update', (_, stats) => {
    console.log('Stats received in renderer:', stats);
    document.getElementById('cpu-temp').innerText = `${stats.cpu.temperature}`;
    document.getElementById('cpu-load').innerText = `CPU Load: ${stats.cpu.load}`;
    document.getElementById('cpu-power').innerText = `CPU Power: ${stats.cpu.power}`;
    
    document.getElementById('gpu-temp').innerText = `GPU Temperature: ${stats.gpu.temperature || 'N/A'}`;
    document.getElementById('gpu-load').innerText = `GPU Load: ${stats.gpu.load || 'N/A'}`;
    document.getElementById('gpu-fan').innerText = `GPU Fan Speed: ${stats.gpu.fanSpeed || 'N/A'}`;
    document.getElementById('gpu-power').innerText = `GPU Power: ${stats.gpu.power || 'N/A'}`;
    document.getElementById('gpu-memory-free').innerText = `GPU Memory Free: ${stats.gpu.memoryFree || 'N/A'}`;
    document.getElementById('gpu-memory-used').innerText = `GPU Memory Used: ${stats.gpu.memoryUsed || 'N/A'}`;

    document.getElementById('memory-load').innerText = `Memory Load: ${stats.memory.load}`;
    document.getElementById('used-memory').innerText = `Used Memory: ${stats.memory.used}`;
});
