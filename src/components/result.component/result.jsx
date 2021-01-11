import React from 'react';

const Result = ({status, planetName, timeTaken}) => {
    return (
        <div className="text-align-center">
            {
                status ?
                    <div>
                        <div>Success &#128512; &#128512; &#128512;</div>
                        <div>Time Taken: {timeTaken}</div>
                        <div>Planet Name: {planetName}</div>
                    </div>
                    : <div>Failure &#128542; &#128542; &#128542;</div>
            }
        </div>
    )
}

export default Result;