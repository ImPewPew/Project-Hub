// Use the exposed API from preload.js

document.getElementById('close-btn').addEventListener('click', () => {
    console.log('Close button clicked');
    window.electron.ipcRenderer.send('app-close');
});



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


    // GPU Temp stats updates
    document.getElementById('gpu-temp').innerText = `${stats.gpu.temperature || 'N/A'}`;
    let gpuTemperature = parseFloat(stats.gpu.temperature);
    const gpuTemperaturePercentage = Math.min(Math.max(gpuTemperature, 0), 100);
    document.getElementById('gpu-temp-val').innerText = `${gpuTemperaturePercentage}%`;

    // Update the progress bar dynamically
    const progressBarGpuTemp = document.getElementById('progress-bar-gputemp');
    progressBarGpuTemp.style.width = `${gpuTemperaturePercentage}%`;


    // GPU LOAD stats updates
    document.getElementById('gpu-load').innerText = `${stats.gpu.load || 'N/A'}`;
    let gpuLoad = parseFloat(stats.gpu.load);
    const gpuLoadPercentage = Math.min(Math.max(gpuLoad, 0), 100);
    document.getElementById('gpu-load-val').innerText = `${gpuLoadPercentage}%`;

    // Update the progress bar dynamically
    const progressBarGpuLoad = document.getElementById('progress-bar-gpuload');
    progressBarGpuLoad.style.width = `${gpuLoadPercentage}%`;


    // GPU FAN stats updates
    const fanSpeedText = `${stats.gpu.fanSpeed || 'N/A'}`;

    // Check if the value contains "RPM" and split it
    if (fanSpeedText.includes('RPM')) {
        const [fanSpeedValue, unit] = fanSpeedText.split(' '); // Splits into ["3500", "RPM"]
        document.getElementById('gpu-fan').innerText = `${fanSpeedValue || 'N/A'}`;
        document.getElementById('gpu-fan-val').innerText = `${unit}`;
    } else {
        console.log('Fan Speed:', fanSpeedText); // Handle 'N/A' or other cases
    }

    // GPU POW stats updates
    document.getElementById('gpu-power').innerText = `${stats.gpu.power || 'N/A'}`;
    let gpuPower = parseFloat(stats.gpu.power);
    const gpuPowerPercentage = Math.min(Math.max(gpuPower, 0), 100);
    document.getElementById('gpu-power-val').innerText = `${gpuPowerPercentage}%`;

    // Update the progress bar dynamically
    const progressBarPowerLoad = document.getElementById('progress-bar-gpupower');
    progressBarPowerLoad.style.width = `${gpuPowerPercentage}%`;


   // Extract memory free in MB as a string
    const memoryFreeMB = stats.gpu.memoryFree || 'N/A';
   
    let memoryFreeGB = memoryFreeMB !== 'N/A' ? (parseFloat(memoryFreeMB) / 1024).toFixed(2) : memoryFreeMB;
    document.getElementById('gpu-memory-free').innerText = memoryFreeGB !== 'N/A' ? `${memoryFreeGB} GB` : memoryFreeMB;

    
    
    
    const memoryUsedMB = stats.gpu.memoryUsed || 'N/A';
   
    let memoryUsedGB = memoryUsedMB !== 'N/A' ? (parseFloat(memoryUsedMB) / 1024).toFixed(2) : memoryUsedMB;
    document.getElementById('gpu-memory-used').innerText = memoryUsedGB !== 'N/A' ? `${memoryUsedGB} GB` : memoryUsedGB;

    document.getElementById('memory-load').innerText = `${stats.memory.load}`;
    document.getElementById('used-memory').innerText = `${stats.memory.used}`;

   
});


