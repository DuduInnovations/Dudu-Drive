import React from 'react';
import axios from 'axios';
import '../CSS/App.css';


class UploadBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        }

    }


    onChangeHandler = event => {

        this.setState({
            selectedFile: event.target.files,
            loaded: 0,
        })
        console.log(event.target.files, "On change handler")
    }


    onClickHandler = () => {
        const data = new FormData()
        for (var x = 0; x < this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }


        axios.post("http://localhost:8000/upload", data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText)
                console.log(data, "This is the click handler")
            })

    }



    render() {
        return (
            <div>
            <div className='topContainer'  style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>
                <div className="container">
                    <div className='row'>
                        <div className="offset-md-3 col-md-6">
                            <div className="form-group files">
                                <label>Uplaod</label>
                                <input type="file" name="file" className="form-control-file" onChange={this.onChangeHandler} />
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button> 
                </div>
            </div>
            </div>
        );
    }
}


export default UploadBox;