import { useCountdown } from '@/hooks/useCountdown';
import React from 'react';
import Spinner from './Spinner';

interface TimerProps {
    start: number; // Start time in milliseconds since epoch
    end: number;   // End time in milliseconds since epoch
    type: number;
}

const Timer: React.FC<TimerProps> = ({ start, end, type }) => {
    const { timer, text } = useCountdown(start, end);
    console.log(text, timer, "timer")

    if (text === "Ended") {
        return <>{
            type ? <div className="time-conatiner"><span>End</span></div> : <div className="number-first-box"><span>End</span></div>
        }</>;
    }
    return (
        <>
            {timer ? (
                type ?
                    <div className="time-conatiner">
                        <div>
                            <h3>{timer[0] ? timer[0] : "0"}</h3>
                            <span>Day</span>
                        </div>
                        <div>
                            <h3>{timer[1] ? timer[1] : "0"}</h3>
                            <span>Hours</span>
                        </div>
                        <div>
                            <h3>{timer[2] ? timer[2] : "0"}</h3>
                            <span>Minute</span>
                        </div>
                        <div>
                            <h3>{timer[3] ? timer[3] : "0"}</h3>
                            <span>Second</span>
                        </div>
                    </div>
                    :
                    <div className="number-first-box">
                        <div>
                            <span>{timer[0] ? timer[0] : "0"}</span>
                            <p>Days</p>
                        </div>
                        <div>
                            <span>{timer[2] ? timer[2] : "0"}</span>
                            <p>Minute</p>
                        </div>
                        <div>
                            <span>{timer[1] ? timer[1] : "0"}</span>
                            <p>Hours</p>
                        </div>
                        <div>
                            <span>{timer[3] ? timer[3] : "0"}</span>
                            <p>Second</p>
                        </div>
                    </div>
            ) : <Spinner />}
        </>
    );
};

export default Timer;
