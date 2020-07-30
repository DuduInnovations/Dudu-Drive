import React from 'react';
import UploadBox from './Upload';
import Navbar from './Navbar/Navbar';
import Particle from './Particle';
import '../CSS/App.css';
import { simpleAction } from '../actions/simpleAction';
import { connect } from 'react-redux';
import GlobalStyle from './Navbar/GlobalStyle';

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction())
  })
  
  /* 
   * mapStateToProps
  */
const mapStateToProps = state => ({
    ...state
  })

class App extends React.Component {

  state = {
    navbarOpen: false
  }
  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }
    simpleAction = (event) => {
        this.props.simpleAction();
    }

    render() {
        return (
       
          <div>
          <Particle />
          <Navbar 
        navbarState={this.state.navbarOpen} 
        handleNavbar={this.handleNavbar}
          />
          <GlobalStyle />
          <div>
              <UploadBox />
              <pre>
            {
              JSON.stringify(this.props)
            }
          </pre>
          <button onClick={this.simpleAction}>Test redux action</button>
          </div>
          </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

