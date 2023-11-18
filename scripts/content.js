
setTimeout(function () {
    console.log("5 seconds have passed. Now executing the code.");
    var timeRegex = /\b(\d{1,2}:\d{1,2})\b/;
    var elements = document.getElementsByTagName("ytd-rich-item-renderer");
    var elementList = Array.from(elements);

    elementList.forEach(element => {
        var txt = element.innerText;
        var match = txt.match(timeRegex);
        if (match) {
            // console.log(txt, match[0]);
            var [hours, minutes, seconds] = match[0].split(':');
            console.log(txt, hours, minutes, seconds)
            if (hours < 10) {
                element.style = "display: none;"
            }
        }
    })
}, 10000);