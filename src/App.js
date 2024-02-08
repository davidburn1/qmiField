// import React from 'react';
import * as THREE from 'three';
const { Form, Button , Container, Row, Col} = ReactBootstrap;

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { wedge , table, sample } from './src/threeComponent.js';



class ThreeRenderer extends React.Component {
  constructor(props) {
    super(props);

    // Set up the Three.js scene, camera, and renderer in the constructor
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

    this.sep1 = this.props.sep1;
    this.sep2 = this.props.sep2;
    this.rotation = this.props.rotation;
  }

  componentDidMount() {
    // Initialize the Three.js renderer in the componentDidMount lifecycle method
    // this.renderer.setSize(this.mount.clientWidth, this.mount.clientHeight);
    this.renderer.setSize( 800, 800 );
    this.mount.appendChild(this.renderer.domElement);

    const controls = new OrbitControls( this.camera, this.renderer.domElement );

    this.scene.background = new THREE.Color( 0xffffff );

    this.camera.position.set(-100, -200, 300);
    this.camera.lookAt(0,0,0);


    const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );
    this.scene.add( ambientLight );

    const pointLight = new THREE.PointLight( 0xaaaaaa, 1.5, 0, 0 ); // color, intensity, distance, decay
    pointLight.position.set(0, 250, 500);
    this.scene.add( pointLight );

    //DirectionalLight
    // const sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // sunLight.position.set(0, 0, 500);
    // this.scene.add(sunLight);


    const axesHelper = new THREE.AxesHelper( 50 );
    this.scene.add( axesHelper );



    const magnetTable = (table());
    this.scene.add(magnetTable);
    this.scene.add(sample());

    var separation = 40;
    const wedge1 = wedge().rotateZ(0*Math.PI);
    const wedge2 = wedge().rotateZ(1*Math.PI);
    const wedge3 = wedge().rotateZ(1/2*Math.PI);
    const wedge4 = wedge().rotateZ(3/2*Math.PI);

    magnetTable.add(wedge1);
    magnetTable.add(wedge2);
    magnetTable.add(wedge3);
    magnetTable.add(wedge4);



    // Create an animate function
    const animate = () => {
      requestAnimationFrame(animate);

      wedge1.position.y = -this.sep1/2;
      wedge2.position.y = this.sep1/2;

      wedge3.position.x = this.sep2/2;
      wedge4.position.x = -this.sep2/2;

      magnetTable.rotation.z = this.rotation/180 * Math.PI;

      // Render the scene
      this.renderer.render(this.scene, this.camera);
    };

    animate();
    window.addEventListener('resize', this.handleResize);
  }


  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, this.props);
    this.sep1 = this.props.sep1;
    this.sep2 = this.props.sep2;
    this.rotation = this.props.rotation;
  }



  handleResize = () => {
    // const { clientWidth, clientHeight } = this.mount;
    // console.log(clientWidth, clientHeight);
    // this.camera.aspect = clientWidth / clientHeight;
    // this.camera.updateProjectionMatrix();
    // this.renderer.setSize(clientWidth, clientHeight);

    // this.renderer.setSize( 500, 500 );
  };

  render() {
    // console.log(this.props);
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}





class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        sep1: 200,
        sep2: 200,
        rotation: 0,
      };
  }

  render() {
      return (
          <div >
            <Container>
              <Row>

                <Col>
                  <ThreeRenderer sep1={this.state.sep1} sep2={this.state.sep2} rotation={this.state.rotation}/>
                </Col>

                <Col>
                  <Form.Label>Separation 1</Form.Label>
                  <Form.Control value={this.state.sep1}           onChange={(e) => this.setState({sep1: parseInt(e.target.value)})}/>
                  <Form.Range   value={this.state.sep1} min={20} max={200} onChange={(e) => this.setState({sep1: parseInt(e.target.value)})} />

                  <br/>
                  <Form.Label>Separation 2</Form.Label>
                  <Form.Control value={this.state.sep2}           onChange={(e) => this.setState({sep2: parseInt(e.target.value)})}/>
                  <Form.Range   value={this.state.sep2} min={20} max={200} onChange={(e) => this.setState({sep2: parseInt(e.target.value)})} />

                  <br/>
                  <Form.Label>Field rotation</Form.Label>
                  <Form.Control value={this.state.rotation}           onChange={(e) => this.setState({rotation: e.target.value})}/>
                  <Form.Range   value={this.state.rotation} min={0} max={360} onChange={(e) => this.setState({rotation: e.target.value})} />
                </Col>

              </Row>
            </Container>
          </div>
      );
  }
}


ReactDOM.render(<App />, document.getElementById('root'));