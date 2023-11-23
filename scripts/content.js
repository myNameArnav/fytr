let firstRun = true

async function getTimeFilterChoice(choice) {
    if (choice == "short") {
        // returns min and max seconds
        return [0, 300]
    }
    else if (choice == "medium") {
        return [301, 1200]
    }
    else if (choice == "long") {
        return [1201, 1000000]
    }
    else {
        return [0, 0]
    }
}

async function getYtElements() {
    let elements = document.getElementsByTagName("ytd-rich-item-renderer");
    return Array.from(elements);
}

async function getYtElementsLength() {
    return Array.from(document.getElementsByTagName("ytd-rich-item-renderer")).length;
}


async function convertTimeToSeconds(time){
    if (time.split(':').length == 2){
        time = "00:" + time
    }
    const [hours, minutes, seconds] = time.split(':').map(Number);
    const timeInSeconds = (parseInt(hours) * 3600) + (parseInt(minutes) * 60) + parseInt(seconds)

    return timeInSeconds
}

async function ytFilter(elementList) {
    console.log("Running ytFilter");
    let choiceMax = 0, choiceMin = 0;

    for (element of elementList) {
        let txt = element.innerText;
        if (!txt.includes("#shorts")) {
            let match = txt.substring(0, txt.indexOf("\n"));
            if (match) {
                let choiceInSeconds = await convertTimeToSeconds(match);
                [choiceMin, choiceMax] = await getTimeFilterChoice("short");
                let works = choiceInSeconds >= choiceMin && choiceInSeconds <= choiceMax
                console.log({"text": txt.trim().slice(0, 25), "time": choiceInSeconds, "min": choiceMin, "max": choiceMax, "works": works});
                if (!(choiceInSeconds >= choiceMin && choiceInSeconds <= choiceMax)) {
                    element.style.display = "none";
                }
            }
        }
    }
}

async function stateDiffChecker() {
    let ytElements = await getYtElementsLength();
    setTimeout(async function () {
        let ytElementsNew = await getYtElementsLength();

        if (ytElements !== ytElementsNew) {
            console.log({"state": "Different State"});
            await ytFilter(await getYtElements());
        } else {
            console.log({"state": "Same State"});
        }
    }, 1000)
}

setInterval(stateDiffChecker, 5000);
