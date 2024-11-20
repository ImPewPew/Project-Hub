const { app, BrowserWindow, ipcMain} = require('electron');
const http = require('http');
const path = require('path');

let mainWindow;

// Function to create the window
const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 350,
        height: 1080,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'), // Path to your preload script
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'));

    // Ensure you are referring to the mainWindow here
    mainWindow.once('ready-to-show', () => {
        mainWindow.webContents.insertCSS(`
            body {
            -webkit-app-region: drag;  /* Allow dragging of the window */
        }
        #close-btn {
            -webkit-app-region: no-drag;  /* Prevent the close button from being dragged */
        }
        `);
        mainWindow.show();  
    });

};

// Electron app ready event
app.whenReady().then(() => {
    createWindow();
    setInterval(fetchData, 1000);
});

ipcMain.on('app-close', () => {
    console.log('app-close event received in main process');
    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Function to fetch the data
const fetchData = () => {
    http.get('http://192.168.254.101:8085/data.json', (res) => {
        let data = '';

        res.on('data', chunk => {
            data += chunk;
        });

        res.on('end', () => {
            try {
                
                const jsonData = JSON.parse(data);
                
                let cpuPackageTemp = null, cpuTotalLoad = null, cpuPower = null;
                let gpuCoreTemp = null, gpuLoad = null, gpuFanSpeed = null, gpuPower = null, gpuMemoryFree = null, gpuMemoryUsed = null;
                let memoryLoad = null, usedMemory = null; // New variables for memory
                
                const findValues = (item) => {
                    // CPU Data
                    if (item.Text === "Temperatures") {
                        item.Children.forEach(child => {
                            if (child.id === 44) cpuPackageTemp = child;
                        });
                    }
                    if (item.Text === "Load") {
                        item.Children.forEach(child => {
                            if (child.id === 47) cpuTotalLoad = child;
                            if (child.id === 65) memoryLoad = child; // Find memory load
                        });
                    }
                    if (item.Text === "Powers") {
                        item.Children.forEach(child => {
                            if (child.id === 55) cpuPower = child;
                        });
                    }

                    // GPU Data
                    if (item.id === 74) {
                        gpuCoreTemp = item.Children.find(child => child.id === 75);
                    }
                    if (item.id === 76) {
                        gpuLoad = item.Children.find(child => child.id === 77);
                    }
                    if (item.id === 82) {
                        gpuFanSpeed = item.Children.find(child => child.id === 83);
                    }
                    if (item.id === 86) {
                        gpuPower = item.Children.find(child => child.id === 87);
                    }
                    if (item.id === 88) {
                        gpuMemoryFree = item.Children.find(child => child.id === 89);
                        gpuMemoryUsed = item.Children.find(child => child.id === 90);
                    }

                    // Memory Data
                    if (item.Text === "Data") {
                        item.Children.forEach(child => {
                            if (child.id === 67) usedMemory = child; // Find used memory
                        });
                    }

                    if (item.Children && item.Children.length > 0) {
                        item.Children.forEach(findValues);
                    }
                };

                findValues(jsonData);

                // Update the UI in the renderer process with the collected data
                if (cpuPackageTemp && cpuTotalLoad && cpuPower && memoryLoad && usedMemory) {
                    
                    mainWindow.webContents.send('stats-update', {
                        cpu: {
                            temperature: cpuPackageTemp.Value,
                            load: cpuTotalLoad.Value,
                            power: cpuPower.Value
                        },
                        gpu: {
                            temperature: gpuCoreTemp?.Value,
                            load: gpuLoad?.Value,
                            fanSpeed: gpuFanSpeed?.Value,
                            power: gpuPower?.Value,
                            memoryFree: gpuMemoryFree?.Value,
                            memoryUsed: gpuMemoryUsed?.Value
                        },
                        memory: {
                            load: memoryLoad.Value,
                            used: usedMemory.Value
                        }
                    });
                }
            } catch (err) {
                console.error('Error parsing JSON:', err.message);
            }
        });
    }).on('error', err => {
        console.error('Error fetching temperature data:', err.message);
    });
};

