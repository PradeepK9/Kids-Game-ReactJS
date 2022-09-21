import { useState } from 'react';
import './MosquitoKillerDesktop.css';

const MosquitoKillerDesktop = () => {
    const [hitCount, setHitCount] = useState(0);
    const [gameStatus, setGameStatus] = useState("");
    const [isStarted, setIsStarted] = useState(false);
    const [timer, setTimer] = useState("");
    const [startBtnText, setStartBtnText] = useState("Start Game");
    const [timeIntervals, setTimeIntervals] = useState([]);
    const [value, setValue] = useState("1000");

    const clearAllTimeOuts = () => {
        for (let i = 0; i < timeIntervals.length; ++i) {
            clearTimeout(timeIntervals[i]);
        }
        setTimeIntervals([]);
    }

    const handleChange = (e) => {
        setIsStarted(false);
        setHitCount(0);
        setTimer("");
        setStartBtnText("Start Game");
        setGameStatus("");
        const speedVal = e.target.value;
        setValue(parseInt(speedVal));
        clearAllTimeOuts();
    }

    const startGame = () => {
        clearAllTimeOuts();
        setIsStarted(true);
        setHitCount(0);
        setGameStatus("Game Started....");
        setStartBtnText("Restart Game");
        const statusEle = document.getElementById("status");
        statusEle.style.color = "green";

        let totalSeond = 30;
        setTimer(`00:00:${totalSeond}`);
        const timer = setInterval(() => {
            totalSeond--;
            setTimer(`00:00:${totalSeond}`);
        }, 1000);
        
        setTimeIntervals((items) => items.concat(timer));

        const time = setInterval(() => {
            const mosquito = document.getElementById("mosquito");
            let i = Math.floor(Math.random() * 360) + 1;
            let j = Math.floor(Math.random() * 380) + 1;
            mosquito.style.left = i + 'px';
            mosquito.style.top = j + 'px';
        }, value);

        
        setTimeIntervals((items) => items.concat(time));

        const timeout = setTimeout(() => {
            setGameStatus("Game Over!");
            statusEle.style.color = "red";
            clearTimeout(time);
            clearTimeout(timer);
            setIsStarted(false);
        }, 30000);
        
        setTimeIntervals((items) => items.concat(timeout));
    }

    const hitCounter = () => {
        if (isStarted) {
            setHitCount(hitCount + 1);
        }
    }

    return (
        <div className="MosquitoKillerDesktop">
            <div className="Playground">
                <img id='mosquito' onClick={hitCounter} src="images/mosquito.png" alt="mosquito" />
                {gameStatus === "Game Over" &&
                    <h1>Game Over !</h1>
                }
            </div>
            <div className="ScoreSection">
                <div className='level'>
                    <select value={value} onChange={handleChange}>
                        <option value="1600">Easy</option>
                        <option value="1000">Mediam</option>
                        <option value="500">Hard</option>
                    </select>
                </div>
                {timer &&
                    <p>Time Remaining {timer}</p>
                }
                <h1>Kill Mosquito💥</h1>
                <h4>Start the game and click on mosquito to kill it</h4>
                <h3 id='status'>{gameStatus}</h3>
                <h3>Your Total Score : {hitCount}</h3>
                <button onClick={startGame}>{startBtnText}</button>
            </div>
        </div>
    )
}

export default MosquitoKillerDesktop;