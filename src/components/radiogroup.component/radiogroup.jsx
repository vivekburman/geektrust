import React from 'react';
import './radiogroup.scss';

const RadioGroup = ({items, handleCallback, name, index}) => {
    const handleOnChange = (e) => {
        const name = e.target.value;
        handleCallback(index, items.find(i => i.name == name));
    }
    return(
        <div className="ff-radiogroup-wrapper">
            <div className="flex flex-column">
                {
                    items.map((i, index) => {
                        return (
                            <div key={index} className={"margin-bottom-15 " + (i.disabled ? "ff-disabled": "")}>
                                <input type="radio" value={i.name} 
                                name={name}
                                onChange={handleOnChange}
                                disabled={i.disabled}
                                className={"margin-right-5 " + (i.disabled ? "" : "cursor-pointer")}/>
                                <label>{i.text}</label>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    ); 
}

export default RadioGroup;