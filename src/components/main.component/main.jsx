import React, { Component } from 'react';
import Result from '../result.component/result';
import { Route, Switch, withRouter } from 'react-router';
import Dashboard from '../dashboard.component/dashboard';
import Axios from 'axios';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: {
                timeTaken: 0,
                status: null,
                planetFound: null
            }
        }
    }
    
    findFalcone = async (planets, vehicles, timeTaken) => {
        const _planets = planets.map(i => i.name);
        const _vehicles = vehicles.map(i => i.name);
        let res = await Axios.post('https://findfalcone.herokuapp.com/token', null, {
            headers: {
                Accept : 'application/json' 
            }
        })
        res = await Axios.post('https://findfalcone.herokuapp.com/find', {
            token: res.data.token,
            "planet_names": _planets,
            "vehicle_names": _vehicles
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (res.data.status) {
            this.setState({
                result: {timeTaken, planetFound: res.data.planet_name, status: true}
            });
        } else {
            this.setState({
                result: {
                    timeTaken: 0,
                    status: false,
                    planentFound: null
                }
            });
        }
        this.props.history.push('/result');
    }
    render() {
        return (
            <main className="full-height">
                <Switch>
                    <Route exact path="/">
                        <Dashboard findFalcone={this.findFalcone}/>
                    </Route>
                    <Route path="/result">
                        <Result status={this.state.result.status} timeTaken={this.state.result.timeTaken} planetName={this.state.result.planetFound}/>
                    </Route>
                </Switch>
                
            </main>
        );
    }
}
export default withRouter(Main);