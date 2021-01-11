import React, {Component} from 'react';
import RadioGroup from '../radiogroup.component/radiogroup';
import DropDown from '../dropdown.component/dropdown';
import Loader from '../loader.component/loader';
import Axios from 'axios';
import './dashboard.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planets: null,
            selectedPlanets: [null, null, null, null],
            selectedVehicles: [null, null, null, null],
            vehicles: null,
            timeTaken: 0
        }
    }
    componentDidMount() {
        Promise.all([
            Axios.get('https://findfalcone.herokuapp.com/planets'),
            Axios.get('https://findfalcone.herokuapp.com/vehicles')
        ]).then(res => {
            this.setState({
                planets: res[0].data,
                vehicles: res[1].data,
            });
        });
    }
    handleDDSelect = (index, value) => {
        const temp = [...this.state.selectedPlanets];
        temp[index - 1] = this.state.planets.filter((i) => i.name == value)[0];
        this.setState({
            selectedPlanets: temp
        }); 
    }
    handleRGSelect = (index, item) => {
        const temp = [...this.state.selectedVehicles];
        const vehicles = this.state.vehicles;
        if (temp[index - 1]) {
            vehicles[vehicles.findIndex(i => i.name == temp[index - 1].name)].total_no += 1;
            temp[index - 1] = vehicles.filter(i => i.name == item.name)[0];
        } else {
            temp[index - 1] = vehicles.filter(i => i.name == item.name)[0];
        }
        vehicles[vehicles.findIndex(i => i.name == temp[index - 1].name)].total_no -= 1;
        let timeTaken = 0;
        for(let i = 0; i < this.state.selectedPlanets.length; i++) {
            if (!this.state.selectedPlanets[i]) break;
            timeTaken += temp[i] ? (this.state.selectedPlanets[i].distance / temp[i].speed) : 0;
        }
        this.setState({
            selectedVehicles: temp,
            vehicles: [...vehicles],
            timeTaken: timeTaken
        });

    }
    renderDD() {
        const temp = [];
        const DDitems = this.state.planets.map(i => {
            if (this.state.selectedPlanets.findIndex(j =>  j && j.name == i.name) != -1) {
                i.disabled = true;
            } else {
                i.disabled = false;
            }
            return i;
        });
        const RGitems = this.state.vehicles.map(i => {
            i.value = i.name;
            i.text = `${i.value} (${i.total_no})`; 
            i.disabled = i.total_no == 0;
            return i;
        });
        const filterRG = (RGitems, index) => {
            const distance = this.state.selectedPlanets[index].distance;
            return RGitems.map((i) => {
                return i.disabled || distance <= i.max_distance ? i : {...i, disabled: true};
            });
        }
        for(let i =0; i < 4; i++) {
            temp.push(
                <div key={i}>
                    <div className="margin-bottom-5">Destination {i + 1}</div>
                    <DropDown 
                    index={i + 1}
                    items={DDitems} 
                    handleCallback={this.handleDDSelect}/>
                    {this.state.selectedPlanets[i] !=null && <RadioGroup
                    items={filterRG(RGitems, i)}
                    index={i + 1}
                    name={`ff(${i})`}
                    handleCallback = {this.handleRGSelect} 
                    />}
                </div>
            );
        }
        return temp;
    }
    isDisabled = () => {
        return this.state.selectedPlanets.findIndex(i => i == null) != -1 || this.state.selectedVehicles.findIndex(i => i == null) != -1
        ? true : false;
    }
    render() {
        return (
            <>
            {
                this.state.planets ? 
                <div className="ff-dashboard-wrapper flex flex-column full-height">
                    <header className="text-align-center margin-bottom-15">Select Planets you want to search in: </header>
                    <div className="flex flex-row justify-content-spacebetween flex-grow">
                        {
                            this.renderDD()
                        }
                        <div className="ff-text-header">Time Taken: {this.state.timeTaken}</div>
                    </div>
                    <footer className="text-align-center margin-bottom-15">
                        <button 
                        className="cursor-pointer"
                        onClick={() => this.props.findFalcone(this.state.selectedPlanets, this.state.selectedVehicles, this.state.timeTaken)}
                        disabled={this.isDisabled()}>Find Falcone!</button>
                    </footer>
                </div>
                :
                <Loader size={2}/>
            }
            </>
        )
    }
}

export default Dashboard;