let time = new Date();

document.getElementById("welcome-modal").onclick = (e) => {
    console.log('close modal');
    document.getElementById("welcome-modal").style.display = "none";
};

const utterTime = (time) => {
    let timeSpeech = new SpeechSynthesisUtterance();
    timeSpeech.text = "Ore " + time.getHours() + ":" + time.getMinutes();
    timeSpeech.rate = 0.8;
    window.speechSynthesis.speak(timeSpeech);
    timeSpeech.text = ''; // Needed to prevent TTS double trigger
};

const audioTrigger = () => {
    document.getElementById("trigger").volume = 0.7;
    document.getElementById("trigger").play();
}

setInterval(() => {
    time = new Date();
    if (time.getSeconds() === 52) {
        audioTrigger();
        console.log('===== SEGNALE ORARIO =====');
    } else if (time.getSeconds() === 3) {
        utterTime(time);
        console.log('===== VOICE SYNTH =====');
    }
}, 1000);