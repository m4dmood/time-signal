import './Clock.css';
const { useState, useEffect, default: React } = require('react');

function Clock() {

    const [current, setCurrent] = useState(new Date());

    setInterval(() => {
        setCurrent(new Date());
    }, 1000);

    return (
      <>
        <div className="clock-box">
          <div className="hrs">{current.getHours() >= 10 ? current.getHours() : '0' + current.getHours()}</div>
          <div className="col">:</div>
          <div className="min">{current.getMinutes() >= 10 ? current.getMinutes() : '0' + current.getMinutes()}</div>
          <div className="col">:</div>
          <div className="sec">{current.getSeconds() >= 10 ? current.getSeconds() : '0' + current.getSeconds()}</div>
        </div>
      </>
    );
}

export default Clock;