import { useState } from 'react';
import './MosquitoKillerMobile.css';

const MosquitoKillerMobile = () => {
    const [hitCount, setHitCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isStarted, setIsStarted] = useState(false);
    const [timer, setTimer] = useState("");
    const [startBtnText, setStartBtnText] = useState("Start Game");
    const [value, setValue] = useState("500");
    const [timeIntervals, setTimeIntervals] = useState([]);

    const handleChange = (e) => {
        setIsStarted(false);
        setHitCount(0);
        setGameOver(false);
        setTimer("");
        setStartBtnText("Start Game");
        const speedVal = e.target.value;
        setValue(parseInt(speedVal));
        clearAllTimeOuts();
    }

    const clearAllTimeOuts = () => {
        for (let i = 0; i < timeIntervals.length; ++i) {
            clearTimeout(timeIntervals[i]);
        }
        setTimeIntervals([]);
    }

    const startGame = () => {
        clearAllTimeOuts();
        setIsStarted(true);
        setHitCount(0);
        setGameOver(false);
        setStartBtnText("Restart Game");

        let totalSeond = 30;
        setTimer(`00:00:${totalSeond}`);

        const timer = setInterval(() => {
            totalSeond--;
            setTimer(`00:00:${totalSeond}`);
        }, 1000);
        setTimeIntervals((items) => items.concat(timer));

        const mosquitoMovetime = setInterval(() => {
            const mosquito = document.getElementById("mosquito");
            let i = Math.floor(Math.random() * 280) + 1;
            let j = Math.floor(Math.random() * 300) + 1;
            mosquito.style.left = i + 'px';
            mosquito.style.top = j + 'px';
        }, value);
        setTimeIntervals((items) => items.concat(mosquitoMovetime));

        const setTimeOut30 = setTimeout(() => {
            setGameOver(true);
            clearTimeout(mosquitoMovetime);
            clearTimeout(timer);
            setIsStarted(false);
        }, 30000);

        setTimeIntervals((items) => items.concat(setTimeOut30));
    }

    const hitCounter = () => {
        if (isStarted) {
            setHitCount(hitCount + 1);
        }
    }

    return (
        <div className="MosquitoKillerMobile">
            <span>
                <h2>Kill Mosquito💥</h2>
                <div className='level'>
                    <select value={value} onChange={handleChange}>
                        <option value="1000">Easy</option>
                        <option value="500">Mediam</option>
                        <option value="360">Hard</option>
                    </select>
                </div>
            </span>
            {timer &&
                <div className='ScoreSectionMobile'>
                    <p>Total Score : {hitCount}</p>
                    <p> Time Remaining  {timer}</p>
                </div>
            }
            <div className="MobilePlayground">
                <img id='mosquito' onClick={hitCounter} src="images/mosquito.png" alt="mosquito" />
                {gameOver &&
                    <div className='GameOver'>
                        <h1>Game Over !</h1>
                        <h2>Try Again</h2>
                    </div>
                }
                {!isStarted && !gameOver &&
                    <div className='HowToSection'>
                        <p>How to play?</p>
                        <p>Click the start button</p>
                        <p>Touch the mosquito to kill it</p>
                        <p>You have only 30 seconds at a time</p>
                        <p>If you want you can change difficulty level : Easy, Medium or Hard</p>
                    </div>
                }
            </div>
            <button onClick={startGame}>{startBtnText}</button>
        </div>
    )
}

export default MosquitoKillerMobile;