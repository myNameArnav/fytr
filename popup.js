// popup.js
document.addEventListener('DOMContentLoaded', () => {
    console.info('[popup] Popup loaded');
    
    const radios = document.querySelectorAll('.period input[type="radio"]');
    console.info(`[popup] Found ${radios.length} radio buttons`);
    
    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selected = document.querySelector('.period input[name="Length"]:checked').id;
            console.info(`[popup] Selected filter: ${selected}`);
            
            chrome.storage.local.set({ 'fytr-time-filter': selected }, () => {
                console.info('[popup] Filter saved to storage');
                window.close();
            });
        });
    });
});
