
setInterval(function () {
    console.log("3 seconds has passed. Now executing the code.");
    var timeRegex = /\b(\d{1,2}:\d{1,2})\b/;
    var elements = document.getElementsByTagName("ytd-rich-item-renderer");
    var elementList = Array.from(elements);

    elementList.forEach(element => {
        var txt = element.innerText;
        var match = txt.match(timeRegex);
        if (match) {
            var [hours, minutes, seconds] = match[0].split(':');
            console.log(txt, hours, minutes, seconds);
            if (parseInt(hours) < 10) {
                element.style.display = "none";
            }
        }
    });
}, 3000);
