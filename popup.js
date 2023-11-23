// Add an event listener to the radio buttons
document.querySelectorAll('.period input[type="radio"]').forEach(function (radio) {
    radio.addEventListener('change', function () {
        const selectedFilter = document.querySelector('.period input[name="Length"]:checked').id;
        localStorage.setItem("fytr-time-filter", selectedFilter)
    });
});