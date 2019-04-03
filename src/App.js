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
import Clarifai from 'clarifai'
// import { timingSafeEqual } from 'crypto';
 
const app = new Clarifai.App({
  apiKey: 'b59200e5e03144488902c88b98899af9'
 });

const particlesOptions = {
    particles: {
      number:{
        value: 100,
        density: {
          enable: true,
          value_area: 800,
        }},
      
    }
}

class App extends Component {
  constructor() {
    super();
    this.state={
      input: '',
      imageURL:'',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  };

  loaduser = (data) => {
    this.setState({user: { 
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }})
    console.log(data);
  };

  calculateFaceLocation = (data) => {
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
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

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(this.state.input)
  }
 
  onButtonSubmit = () => {
    let input = this.state.input
    this.setState({imageURL: input});
    //console.log('submit', this.state.imageURL ) ;
    app.models
      .predict(
        "a403429f2ddf4b49b307e318f00e528b", 
        this.state.input
      )
      .then( response => { 
        if (response){
          fetch('http://localhost:3000/image', {
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
          
        }
        this.displayFaceBox (this.calculateFaceLocation(response))
      })
      .catch( err => console.log(err) ) ;
        // there was an error
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageURL, route, box} =  this.state;
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
              <FaceRecognition box = {box}  imageURL={imageURL} />
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
}

export default App;
