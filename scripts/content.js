let firstRun = true

async function getTimeFilterChoice(choice) {
    if (choice == "short") return [0, 300]
    else if (choice == "medium") return [301, 1200]
    else if (choice == "long") return [1201, 1000000]
    else return [0, 0]
}

async function getYtElements() {
    let elements = document.getElementsByTagName("ytd-rich-item-renderer");
    return Array.from(elements);
}

async function getYtElementsLength() {
    return Array.from(document.getElementsByTagName("ytd-rich-item-renderer")).length;
}

async function resetView() {
    let elementList = await getYtElements()
    for (element of elementList) {
        element.style.display = "";
    }
}

async function convertTimeToSeconds(time) {
    let timeLen = time.split(':').length;
    if (timeLen >= 2) {
        if (timeLen == 2) {
            time = "00:" + time
        }
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const timeInSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds)
        return timeInSeconds
    }
    return false
}

async function ytFilter(elementList) {
    console.log("Running ytFilter");
    let choiceMax = 0, choiceMin = 0;

    for (element of elementList) {
        let txt = element.innerText;
        if (!txt.includes("#shorts")) {
            let match = txt.substring(0, txt.indexOf("\n"));
            let choiceInSeconds = await convertTimeToSeconds(match);
            if (choiceInSeconds) {
                [choiceMin, choiceMax] = await getTimeFilterChoice("medium");
                let works = choiceInSeconds >= choiceMin && choiceInSeconds <= choiceMax
                console.log({ "text": txt.trim().slice(0, 25), "time": choiceInSeconds, "min": choiceMin, "max": choiceMax, "works": works });
                if (!works) {
                    element.style.display = "none";
                }
            }
        }
    }
}

async function handleStateChange(mutations) {
    if (document.getElementById("time-status")) {
        console.log("State changed");
        await ytFilter(await getYtElements());
    }
}

const observer = new MutationObserver(handleStateChange);
observer.observe(document.body, { subtree: true, childList: true });
