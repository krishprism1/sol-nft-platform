import { useEffect, useState } from 'react';

type CountdownReturnType = {
    timer: [number, number, number, number] | null;
    text: string | null;
};

const useCountdown = (start: number, end: number): CountdownReturnType => {
    const [countDown, setCountDown] = useState<number | null>(null);
    const [text, setText] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();

            if (start > currentTime) {
                setCountDown(start - currentTime);
                setText("Start in");
            } else if (end > currentTime) {
                setCountDown(end - currentTime);
                setText("Ends in");
            } else if (end < currentTime) {
                setText("Ended");
                setCountDown(null);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [start, end]);

    const timer = countDown !== null ? getReturnValues(countDown) : null;

    return { timer, text };
};

const getReturnValues = (timeStamp: number): [number, number, number, number] => {
    const days = Math.floor(timeStamp / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeStamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeStamp % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeStamp % (1000 * 60)) / 1000);
    return [days, hours, minutes, seconds];
};

export { useCountdown };
