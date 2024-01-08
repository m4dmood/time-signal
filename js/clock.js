let current = new Date();

window.onload = (e) => {
    document.getElementById("welcome-modal").style.display = "block";
};

setInterval(() => {
    current = new Date();
    let hh = current.getHours() >= 10 ? current.getHours() : '0' + current.getHours();
    let mm = current.getMinutes() >= 10 ? current.getMinutes() : '0' + current.getMinutes();
    let ss = current.getSeconds() >= 10 ? current.getSeconds() : '0' + current.getSeconds();
    document.getElementById("digital-clock").innerHTML = `${hh}:${mm}:${ss}`;
}, 1000);