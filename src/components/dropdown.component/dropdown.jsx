import {useState } from "react";
import './dropdown.scss';

const DropDown = ({ items, handleCallback, index }) => {
    const [selectOptions, setSelectOptions] = useState(items);
    const [searchText, setSearchText] = useState('');
    const [toggle, setToggle] = useState(false);
    const handleOnSearch = (e) => {
        const val = e.target.value;
        setToggle(true);
        setSearchText(val);
        // filter results on search
        
        val && val.length ? setSelectOptions(items.filter((i) => i.name.toLowerCase().includes(val))) : setSelectOptions(items);
    }
    const handleOnToggle = () => {
        setToggle(!toggle);
    }
    const handleOnSelect = (e) => {
        if (+e.currentTarget.getAttribute('data-disabled') == 0) return;
        const val = e.currentTarget.getAttribute('data-value');
        setSearchText(val);
        setToggle(false);
        handleCallback(index, val);
    }

    return (
        <div className="ff-dropdownwrapper pos-relative">
            <div className={"ff-dropdown-searchwrapper flex align-items-center " + (!toggle ? '' : 'ff-active')}>
                <input type="text" className="ff-dropdown-searchbox" 
                    value={searchText} 
                    onChange={handleOnSearch}
                    onClick={handleOnToggle}
                    placeholder="Search"/>
                <i className="ff-dropdown-icon fa fa-angle-down cursor-pointer margin-left-5 margin-right-5" onClick={handleOnToggle} aria-hidden="true"></i>
            </div>
            <div className={'ff-dropdown-selectwrapper full-width pos-absolute ' + (toggle ? '' : 'ff-hide')}>
                {
                    selectOptions.length ? selectOptions.map((i) => {
                        return (
                            <div className={"ff-dropdown-item " + (i.disabled ? "ff-disabled" : "cursor-pointer")}
                            data-disabled={i.disabled ? 0 : 1}
                            key={i.name} 
                            data-value={i.name} 
                            onClick={handleOnSelect}>{i.name}</div>
                        );
                    }) : <div>No result found</div>
                }
            </div>
        </div>
    );
}

export default DropDown;