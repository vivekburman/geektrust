import React, {Component} from 'react';
import './home.scss';
import Axios from 'axios';
import Loader from '../loader.component/loader';
import Header from '../header.component/header';

class Home extends Component{
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        };
    }
    componentDidMount() {
        Axios.post('https://findfalcone.herokuapp.com/token', null, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => this.setState({token: res.data.token}));
    }
    render() {
        return (
            <div className="ff-home-wrapper full-height">
                {
                    this.state.token.length ? 
                    <>
                        <Header />
                        {/* <Main /> */}
                    </>
                    :
                    <Loader size={2}/>
                }
            </div>
        );
    }
    
}
export default Home;