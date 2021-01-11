import React from 'react';
import './loader.scss';

const getSizeClass = (size = 0) => {
    switch(size) {
        case 0:
            return "ff-small";
        case 1:
            return "ff-medium";
        case 2:
            return "ff-large";
    }
}

const Loader = ({size}) => {
    return (
        <div className="flex flex-row full-height justify-content-center align-items-center">
            <div className={`ff-loader ${getSizeClass(size)} display-inlineblock`}></div>
        </div>
    );
}

export default Loader;