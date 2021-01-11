import React from 'react';
import './header.scss';

const Header = () => {
    return (
        <header className="ff-home-header">
            <div className="flex flex-row justify-content-end align-items-center">
                <button className="ff-btn-primary margin-right-15">Reset</button>
                <span className="margin-right-15">|</span>
                <a href="https://www.geektrust.in/" target="_blank" className="ff-link-primary">Geek Trust Home</a>
            </div>
            <h1 className="text-align-center">Finding Falcon!</h1>
        </header>
    )
}
export default Header;