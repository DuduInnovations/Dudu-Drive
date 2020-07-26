import React from 'react';
import UploadBox from './Upload';
import '../CSS/App.css';
import { simpleAction } from '../actions/simpleAction';
import { connect } from 'react-redux';


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

    simpleAction = (event) => {
        this.props.simpleAction();
    }

    render() {
        return (
            <div>
                <UploadBox />
                <pre>
              {
                JSON.stringify(this.props)
              }
            </pre>
            <button onClick={this.simpleAction}>Test redux action</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

