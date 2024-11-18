// Use the exposed API from preload.js
window.electron.ipcRenderer.on('stats-update', (_, stats) => {

    document.getElementById('cpu-temp').innerText = `${stats.cpu.temperature}`;

    let cpuTemperature = parseFloat(stats.cpu?.temperature);
    const tempPercentage = Math.min(Math.max(cpuTemperature, 0), 100);
    document.getElementById('cpu-temp-percentage').innerText = `${tempPercentage}%`;
    
    // Update the progress bar dynamically
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${tempPercentage}%`;



    // Cpu load stats updates
    document.getElementById('cpu-load').innerText = `${stats.cpu.load}`;
    let cpuLoad = parseFloat(stats.cpu.load);
    const cpuLoadPercentage = Math.min(Math.max(cpuLoad, 0), 100);
    document.getElementById('cpu-load-percentage').innerText = `${cpuLoadPercentage}%`;

    // Update the progress bar dynamically
    const progressBarCpuLoad = document.getElementById('progress-bar-cpuload');
    progressBarCpuLoad.style.width = `${cpuLoadPercentage}%`;



    // CPU power stats updates
    document.getElementById('cpu-power').innerText = `${stats.cpu.power}`;
    let cpuPower = parseFloat(stats.cpu.power);
    const cpuPowerPercentage = Math.min(Math.max(cpuPower, 0), 100);
    document.getElementById('cpu-power-watts').innerText = `${cpuPowerPercentage}W`;

    // Update the progress bar dynamically
    const progressBarCpuPower = document.getElementById('progress-bar-cpupower');
    progressBarCpuPower.style.width = `${cpuPowerPercentage}%`;



    // Other stats updates
    document.getElementById('gpu-temp').innerText = `${stats.gpu.temperature || 'N/A'}`;
    document.getElementById('gpu-load').innerText = `GPU Load: ${stats.gpu.load || 'N/A'}`;
    document.getElementById('gpu-fan').innerText = `GPU Fan Speed: ${stats.gpu.fanSpeed || 'N/A'}`;
    document.getElementById('gpu-power').innerText = `GPU Power: ${stats.gpu.power || 'N/A'}`;
    document.getElementById('gpu-memory-free').innerText = `GPU Memory Free: ${stats.gpu.memoryFree || 'N/A'}`;
    document.getElementById('gpu-memory-used').innerText = `GPU Memory Used: ${stats.gpu.memoryUsed || 'N/A'}`;

    document.getElementById('memory-load').innerText = `Memory Load: ${stats.memory.load}`;
    document.getElementById('used-memory').innerText = `Used Memory: ${stats.memory.used}`;
});
