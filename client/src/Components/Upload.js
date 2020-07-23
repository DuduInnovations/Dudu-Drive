import React from 'react';
import axios from 'axios';
import { Upload, message, Button } from 'antd';

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};



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
                <div className="container">
                    <div className='row'>
                        <div className="offset-md-3 col-md-6">
                            <div className="form-group files">
                                <label>Uplaod</label>
                                <input type="file" name="file" className="form-control" onChange={this.onChangeHandler} />
                            </div>
                        </div>
                    </div>
                </div>
                <Button type="primary" onClick={this.onClickHandler}>Upload</Button>
            </div>
        );
    }
}


export default UploadBox;