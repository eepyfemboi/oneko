const localVersion = '1';

async function checkForUpdate() {
    try {
        const response = await fetch('https://sleepie.uk/oneko-version.txt');
        if (!response.ok) {
            throw new Error('Failed to fetch version information');
        }

        const remoteVersion = await response.text();
        
        if (remoteVersion.trim() !== localVersion) {
            notifyUser(remoteVersion.trim());
        }
    } catch (error) {
        console.error('Error checking for update:', error);
    }
}

function notifyUser(newVersion) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'images/128.png',
        title: 'Oneko Update Available',
        message: `A new version (${newVersion}) of the Oneko extension is available. Please update by going to https://eepy.io/Oneko/Update`,
        priority: 2
    });
}

chrome.alarms.create('checkForUpdate', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === 'checkForUpdate') {
        checkForUpdate();
    }
});

checkForUpdate();
