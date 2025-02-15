// content.js
async function getTimeFilterChoice(choice) {
    console.info(`[getContent] Getting time filter choice for: ${choice}`);
    if (choice === "short") return [0, 300];
    if (choice === "medium") return [301, 1200];
    if (choice === "long") return [1201, Infinity];
    console.warn(`[getContent] Invalid filter choice: ${choice}`);
    return [0, 0];
}

function getYtElements() {
    const elements = document.querySelectorAll('ytd-rich-item-renderer');
    console.info(`[getContent] Found ${elements.length} YouTube elements`);
    return elements;
}

async function convertTimeToSeconds(timeStr) {
    console.info(`[getContent] Converting time string: ${timeStr}`);
    try {
        const timeParts = timeStr.split(':').reverse();
        let seconds = 0;
        
        if (timeParts.length >= 1) seconds += parseInt(timeParts[0]);
        if (timeParts.length >= 2) seconds += parseInt(timeParts[1]) * 60;
        if (timeParts.length >= 3) seconds += parseInt(timeParts[2]) * 3600;
        
        console.info(`[getContent] Converted time to seconds: ${seconds}`);
        return seconds;
    } catch (error) {
        console.error(`[getContent] Failed to parse time: ${error}`);
        return 0;
    }
}

function resetView() {
    const elements = getYtElements();
    console.info(`[getContent] Resetting ${elements.length} elements`);
    elements.forEach(element => element.style.display = "");
}

async function ytFilter() {
    console.info('[getContent] Starting filter process');
    const elements = getYtElements();
    
    // Get filter from storage
    const filterResult = await chrome.storage.local.get('fytr-time-filter');
    const selectedFilter = filterResult['fytr-time-filter'] || 'medium';
    console.info(`[getContent] Selected filter: ${selectedFilter}`);
    
    const [min, max] = await getTimeFilterChoice(selectedFilter);
    console.info(`[getContent] Filtering videos between ${min} and ${max} seconds`);
    
    elements.forEach(async (element, index) => {
        const txt = element.innerText;
        if (!txt.includes("#shorts")) {
            const timeMatch = txt.match(/\d+:\d+(?:\:\d+)?/);
            if (timeMatch) {
                const timeSeconds = await convertTimeToSeconds(timeMatch[0]);
                const shouldHide = timeSeconds < min || timeSeconds > max;
                console.log({
                    element: index,
                    text: txt.substring(0, 50),
                    timeSeconds: timeSeconds,
                    shouldHide: shouldHide
                });
                
                if (shouldHide) {
                    element.style.display = "none";
                    console.info(`[getContent] Hiding element ${index}`);
                }
            }
        }
    });
    
    console.info('[getContent] Filter process complete');
}

// Initial filter application
console.info('[getContent] Initializing content script');
ytFilter();

// Mutation observer for dynamic content
const observer = new MutationObserver((mutations) => {
    console.info('[getContent] Detected DOM changes');
    if (mutations.some(m => m.addedNodes.length > 0)) {
        console.info('[getContent] Applying filter to new elements');
        ytFilter();
    }
});

// Get the main container to observe
const container = document.querySelector('#content'); // or '#contents' if that exists
if (container) {
    console.info('[getContent] Observing container:', container);
    observer.observe(container, { 
        childList: true,
        subtree: true
    });
} else {
    console.error('[getContent] Could not find container to observe');
}
