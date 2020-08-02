import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
var FileSaver = require('file-saver');
class UploadBox extends Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: [],
        loaded:0, 
        files: []
      }

    //this.loadFiles = this.loadFiles.bind(this);
    
  }

  componentDidMount() {
    this.loadFiles();
  }

  loadFiles = ()=> {
    fetch('http://localhost:5000/files')
      .then(res => res.json())
      .then(files => {
        if (files.message) {
          console.log('No Files');
          this.setState({ files: [] })
        } else {
          console.log(files)
          this.setState({ files })
        }
      });
  }

  deleteFile=(event)=> {
    event.preventDefault();
    const id = event.target.id;
    fetch('http://localhost:5000/files/'+id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(response => {
        if (response.success) {
          this.loadFiles();
          console.log('deleted')
        }else {
          alert('Delete Failed');}
      })
  }


  download = (event) => {
    event.preventDefault();
    const fileName = event.target.id;
    axios({
      method: "GET",
      url: 'http://localhost:5000/download/'+fileName,
      responseType: "blob"
    })
      .then(response => {
        this.setState({ fileDownloading: true }, () => {
          FileSaver.saveAs(response.data, fileName);
        });
      })
      .then(() => {
        this.setState({ fileDownloading: false });
        console.log("Completed");
      });
  };
  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }
  maxSelectFile=(event)=>{
    let files = event.target.files
        if (files.length > 3) { 
           const msg = 'Only 3 images can be uploaded at a time'
           event.target.value = null
           toast.warn(msg)
           return false;
      }
    return true;
 }
 checkFileSize=(event)=>{
  let files = event.target.files
  let size = 2000000 
  let err = []; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
};
for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
  // discard selected file
 toast.error(err[z])
 event.target.value = null
}
return true;
}
onChangeHandler=event=>{
  var files = event.target.files
  if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
  // if return true allow to setState
     this.setState({
     selectedFile: files,
     loaded:0
  })
}
}
  onClickHandler = () => {
    const data = new FormData() 
    for(var x = 0; x<this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x])
    }

    if (this.state.selectedFile.length > 0){
    axios.post("http://localhost:5000/upload", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        })
      },
    })
      .then(res => { // then print response status
        toast.success('upload success')
        this.loadFiles()
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
      })
    }
    else {
        toast.error('must upload at least one file')
    }
}

  render() {
    return (
      <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
               <div className="form-group files">
                <label>Upload Your File </label>
                <input type="file" className="form-control" multiple onChange={this.onChangeHandler}/>
              </div>  
              <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        
              </div> 
              
              <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

	      </div>
      </div>  
       <div>
               {/* <input type="file" onChange={this.fileChanged.bind(this)}/> */}
               <table className="App-table">
                 <thead>
                   <tr>
                       <th>File</th>
                       <th>Uploaded</th>
                       <th>Size</th>
                       <th></th>
                   </tr>
                 </thead>
                 <tbody>
                   {this.state.files.length > 0 && this.state.files.map((file, index) => {
                     var d = new Date(file.uploadDate);
                     return (
                       <tr key={index}>
                         <td><a href={`http://localhost:5000/files/${file.filename}`}>{file.filename}</a></td>
                         <td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
                         <td>{(Math.round(file.length/100) / 10)+'KB'}</td>
                         <td><button onClick={this.deleteFile} id={file._id}>Remove</button></td>
                         <td><button onClick={this.download} id={file.filename}>download</button></td>

                       </tr>
                     )
                   })}
                 </tbody>
               </table>
        </div>
    </div>
    );
  }
}

export default UploadBox;