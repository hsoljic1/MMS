import React, { useState, useEffect } from 'react';
import '../node_modules/react-vis/dist/style.css';
import Plot from './components/Plot'
import Menu from './components/Menu'

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      data: [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        {x: 4, y: 1},
        {x: 5, y: 7},
        {x: 6, y: 6},
        {x: 7, y: 3},
        {x: 8, y: 2},
        {x: 9, y: 0}
      ]
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  render() {
    const {height, width } = this.state    
    const sidebarWidth = 300
    const padding = 40
    const points = [
      {x: 0, y: 8},
      {x: 1, y: 5},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 1},
      {x: 5, y: 7},
      {x: 6, y: 6},
      {x: 7, y: 3},
      {x: 8, y: 2},
      {x: 9, y: 0}
    ]
    const p2 = padding / 2
    const addPoint = (x, y) => {
      let data = this.state.data
      data.push({x, y})
      console.log(data)
      this.setState({
        data
      })
    }
    return (
      <div className="App" style={{ width: "100%", overflow: "hidden" }}>
        <div>
          <div style={{ width: width - sidebarWidth, float: "left", margin: p2 }}>
            <Plot height={height - padding} width={width} data={this.state.data} sidebarWidth={sidebarWidth}/>
          </div>
          <div style={{ marginLeft: width - sidebarWidth + padding, height }}>
            <Menu addPoint={addPoint}/>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}
