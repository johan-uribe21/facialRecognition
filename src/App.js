import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation.js'
import Logo from './Components/Logo/Logo.js';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'

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
    }
  }

  calculateFaceLocation = (data) => {
    //console.log(data);
    const faceBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log(faceBox);
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
      .then( response => this.displayFaceBox (this.calculateFaceLocation(response)  ) )
      .catch( err => console.log(err) ) ;
        // there was an error
  }

  render() {
    return (
      <div className="App">
        <Particles className = 'particles' params={particlesOptions} />
        <Navigation/>
        <Logo />
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box = {this.state.box}  imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
