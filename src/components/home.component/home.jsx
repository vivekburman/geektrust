import React, {Component} from 'react';
import './home.scss';
import Main from '../main.component/main';
import Footer from '../footer.component/footer';

class Home extends Component{
    render() {
        return (
            <div className="ff-home-wrapper full-height flex flex-column">
                <>
                    <Main className="flex-grow"/>
                    <Footer />
                </> 
            </div>
        );
    }
    
}
export default Home;