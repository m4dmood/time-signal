let current = new Date();

window.onload = (e) => {
    document.getElementById("welcome-modal").style.display = "block";
};

setInterval(() => {
    current = new Date();
    let hh = current.getHours() >= 10 ? current.getHours() : '0' + current.getHours();
    document.getElementById("hr").style.transform = `rotate( ${(hh * 360) / 12}deg )`;

    let mm = current.getMinutes() >= 10 ? current.getMinutes() : '0' + current.getMinutes();
    document.getElementById("min").style.transform = `rotate( ${(mm * 360) / 60}deg )`;

    let ss = current.getSeconds() >= 10 ? current.getSeconds() : '0' + current.getSeconds();
    document.getElementById("sec").style.transform = `rotate( ${(ss * 360) / 60}deg )`;
    
    document.getElementById("digital-clock").innerHTML = `${hh}:${mm}:${ss}`;
}, 1000);