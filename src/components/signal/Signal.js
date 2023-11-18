import './Signal.css';
import signal from '../../assets/audio/segnale_orario_rai_cut.mp3';

function Signal() {
    let time = new Date();

    const utterTime = (time) => {
      let timeSpeech = new SpeechSynthesisUtterance();
      timeSpeech.text = "Ore " + time.getHours() + ":" + time.getMinutes();
      timeSpeech.rate = 0.8;
      window.speechSynthesis.speak(timeSpeech);
      timeSpeech.text = ''; // Needed to prevent TTS double trigger
    };

    const audioSignal = () => {
        const audio = new Audio(signal);
        audio.preload = "none";
        //audio.load();
        const playProm = audio.play();
        
        if (playProm !== undefined) {
            playProm
                .then(_ => {});
        }
    };

    const audioTrigger = () => {
        document.getElementById("trigger").play();
    }

    setInterval(() => {
        time = new Date();
        if (time.getSeconds() === 52) {
            audioTrigger();
        } else if (time.getSeconds() === 3) {
            utterTime(time);
        }
    }, 1000);

    // useEffect(() => {
      
    // }, []);

    return (
        <>
            <audio id="trigger" preload="none" src={signal}></audio>
        </>
    );
}

export default Signal;