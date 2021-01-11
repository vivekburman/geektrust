import React from 'react';
import { useHistory } from "react-router-dom";

const Result = ({status, planetName, timeTaken}) => {
    const history = useHistory();
    return (
        <div className="text-align-center">
            {
                status ?
                    <div>
                        <div>Success &#128512; &#128512; &#128512;</div>
                        <div>Time Taken: {timeTaken}</div>
                        <div className="margin-bottom-15">Planet Name: {planetName}</div>
                        <div><button className="cursor-pointer"
                        onClick={() => history.push("/")}>Start Again</button></div>
                    </div>
                    : <div>Failure &#128542; &#128542; &#128542;</div>
            }
        </div>
    )
}

export default Result;