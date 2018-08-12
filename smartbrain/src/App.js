import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
 apiKey: '245f746d8470433682b6de5e9805104f'
});


const particlesOptions = {
  particles: {
      value: 30,
      density: {
        enable: true,
        value_area: 800 
    
    }
  }
}
class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box: {}

    }
  }

calculateFaceLocation = (data) => {

const clarifaiFace = data.outputs[0].data.regions[0].regions_info.bounding_box;
const image = document.getElementById('inputimage')
const width = Number(image.width);
const height = Number(image.height);
console.log(width.height);
}
  onInputChange = (event) => {
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(response => this.calculateFaceLocation(response))
    .catch(err => console.log(err))
    

  }
  render() {
    return ( 
      <div className="App">
         <Particles className='particles' 
              params={particlesOptions}
              />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm  
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition  imageUrl={this.setState.imageUrl}/>
      </div>
    );
  }
}

export default App;
