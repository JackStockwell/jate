const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Removes the instant downloading of the PWA, give us access to download it ourselves.
window.addEventListener('beforeinstallprompt', (event) => {
    window.defferedPrompt = event;

    butInstall.classList.toggle('hidden', false);
});

// Event listener to install the PWA.
butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;

    if (!promptEvent) {
        return;
    }

    promptEvent.prompt();

    window.defferedPrompt = null;

    butInstall.classList.toggle('hidden', true);
});

// If the app is install, it will avoid downloading.
window.addEventListener('appinstalled', (event) => {
    window.defferedPrompt = null;
});
