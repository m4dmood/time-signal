import { wait } from '@testing-library/user-event/dist/utils';
import './Clock.css';
import ReactDOM from 'react-dom';
const { useState, useEffect, default: React } = require('react');

function Clock() {

    // Original JavaScript code by Chirp Internet: www.chirpinternet.eu

    function SoundPlayer(audioContext, filterNode) {

        this.audioCtx = audioContext;
        this.gainNode = this.audioCtx.createGain();
      
        if(filterNode) {
          // run output through extra filter (already connected to audioContext)
          this.gainNode.connect(filterNode);
        } else {
          this.gainNode.connect(this.audioCtx.destination);
        }
      
        this.oscillator = null;
      }
      
      SoundPlayer.prototype.setFrequency = function(val, when) {
        if(this.oscillator !== null) {
          if(when) {
            this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime + when);
          } else {
            this.oscillator.frequency.setValueAtTime(val, this.audioCtx.currentTime);
          }
        }
        return this;
      };
      
      SoundPlayer.prototype.setVolume = function(val, when) {
        if(when) {
          this.gainNode.gain.exponentialRampToValueAtTime(val, this.audioCtx.currentTime + when);
        } else {
          this.gainNode.gain.setValueAtTime(val, this.audioCtx.currentTime);
        }
        return this;
      };
      
      SoundPlayer.prototype.setWaveType = function(waveType) {
        this.oscillator.type = waveType;
        return this;
      };
      
      SoundPlayer.prototype.play = function(freq, vol, wave, when) {
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.connect(this.gainNode);
        this.setFrequency(freq);
        if(wave) {
          this.setWaveType(wave);
        }
        this.setVolume(1/1000);
      
        if(when) {
          this.setVolume(1/1000, when - 0.02);
          this.oscillator.start(when - 0.02);
          this.setVolume(vol, when);
        } else {
          this.oscillator.start();
          this.setVolume(vol, 0.02);
        }
      
        return this;
      };
      
      SoundPlayer.prototype.stop = function(when) {
        if(when) {
          this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime + when - 0.05, 0.02);
          this.oscillator.stop(this.audioCtx.currentTime + when);
        } else {
          this.gainNode.gain.setTargetAtTime(1/1000, this.audioCtx.currentTime, 0.02);
          this.oscillator.stop(this.audioCtx.currentTime + 0.05);
        }
        return this;
      };

      // Original JavaScript code by Chirp Internet: www.chirpinternet.eu (END)

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audio = new AudioContext();
    const compressor = audio.createDynamicsCompressor();
    compressor.connect(audio.destination);

    const standardToneSequence = [
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.06},
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.06},
        {f: 2500.0, d: 0.06},
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.06},
        {f: 2500.0, d: 0.06},
        {f: 2000.0, d: 0.03},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.06},
        {f: 2500.0, d: 0.03},
        {f: 2000.0, d: 0.06},
        {f: 2500.0, d: 0.06}
    ];

    const timer = ms => new Promise(res => setTimeout(res, ms));

    const signal = async (freq, duration) => {
        (new SoundPlayer(audio, compressor)).play(freq, 0.8, "sine").stop(duration);
        await timer(duration);
    };

    const multiSignal = async (tones) => {
        for (let i = 0; i < tones.length; i++) {
            (new SoundPlayer(audio, compressor)).play(tones[i].f, 0.8, "sine").stop(tones[i].d * 10);
            await timer(tones[i].d * 10 + 20);
        }
    };

    const utterTime = (time) => {
      let timeSpeech = new SpeechSynthesisUtterance();
      timeSpeech.text = "Ore " + time.getHours() + ":" + time.getMinutes();
      timeSpeech.rate = 0.8;
      window.speechSynthesis.speak(timeSpeech);
      timeSpeech.text = ''; // Needed to prevent TTS double trigger
    };

    setInterval(() => {
        let current = new Date();
        
        const deg = 6;
        const hr = document.querySelector('#hr');
        const mn = document.querySelector('#mn');
        const sc = document.querySelector('#sc');

        let hh = current.getHours() * 30;
        let mm = current.getMinutes() * deg;
        let ss = current.getSeconds() * deg;

        ReactDOM.findDOMNode(hr).style.transform = `rotateZ(${hh+(mm/12)}deg)`;
        ReactDOM.findDOMNode(mn).style.transform = `rotateZ(${mm}deg)`;
        ReactDOM.findDOMNode(sc).style.transform = `rotateZ(${ss}deg)`;

        if (current.getSeconds() === 52) {
            multiSignal(standardToneSequence);
        } else if ((current.getSeconds() >= 54 && current.getSeconds() <= 58) || current.getSeconds() === 0) {
            signal(1000.0, 0.1);
        } else if (current.getSeconds() === 3) {
          utterTime(current);
        }
    }, 1000);

    return (
            <div className="circle">
                <div className="hour">
                    <div className="hr" id="hr"></div>
                </div>
                <div className="min">
                    <div className="mn" id="mn"></div>
                </div>
                <div className="sec">
                    <div className="sc" id="sc"></div>
                </div>
            </div>
    );
}

export default Clock;