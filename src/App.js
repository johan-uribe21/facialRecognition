import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Rank from './Components/Rank/Rank';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Particles from 'react-particles-js';
 
const particlesOptions = {
    particles: {
      number:{
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        },
      },
    }
};

const initialState = {
  input: '',
  imageURL:'',
  boxes: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
};

class App extends Component {
  constructor() {
    super();
    this.state=initialState
  };

  loaduser = (data) => {
    this.setState({user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }});
    console.log(data);
  };

  findAllFaces = (data) => {
    const allFaceBoxes = data.outputs[0].data.regions.map(face => this.calculateFaceLocation(face))
    console.log('All face boxes',allFaceBoxes)
    return allFaceBoxes; // an array box objects
  };

  calculateFaceLocation = (faceData) => {
    //console.log('face data ', faceData);
    const faceBox = faceData.region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: faceBox.left_col * width,
      topRow: faceBox.top_row * height,
      rightCol: width - (faceBox.right_col*width),
      bottomRow: height - (faceBox.bottom_row* height)
    };
  };

  displayFaceBox = (boxes) => {
    console.log('Face Boxes', boxes);
    this.setState({boxes: boxes}); // what actually renders this?
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  };
 
  onButtonSubmit = () => {
    let input = this.state.input
    this.setState({imageURL: input});
    const localUrl = "http://localhost:5000";
    const herokuUrl = "https://vast-wildwood-78447.herokuapp.com"
    let url ='';
    process.env.NODE_ENV==="development"?  url = localUrl: url = herokuUrl;

    fetch(url+'/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then( response => { 
        if (response){
          fetch(url+'/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(res => res.json())
          .then(count => {
            //object to assign function allows us to update param without changing others
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log);
          }
        this.displayFaceBox (this.findAllFaces(response))
      })
      .catch( err => console.log(err) ) 
  };

  onRouteChange = (route) => {
    if (route === 'signout'){
      // reset the state to the initial clear values on signout
      this.setState(initialState);
    } else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  };

  render() {
    const {isSignedIn, imageURL, route, boxes} =  this.state;
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOptions} />
        <Navigation 
          isSignedIn={isSignedIn} 
          onRouteChange = {this.onRouteChange} 
          />
        {route === 'home' 
          ? <div>
              <Logo />
              <Rank 
                name={this.state.user.name} 
                entries={this.state.user.entries}/>
              <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition boxes = {boxes}  imageURL={imageURL} />
            </div>
          : (
             route === 'signin'
             ?<Signin onRouteChange = {this.onRouteChange} loadUser = {this.loaduser}/>
             :<Register 
              onRouteChange = {this.onRouteChange} 
              loadUser = {this.loaduser}/>
          )
        }
      </div>
    );
  }
};

export default App;
