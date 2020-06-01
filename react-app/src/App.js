import React, { useState, useEffect } from 'react';
import '../node_modules/react-vis/dist/style.css';
import Plot from './components/Plot'
import Menu from './components/Menu'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0,
      points: [
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
      ],
      centerPoints: []
    };
  }

  addPoint = (x, y) => {
    let index = this.state.points.indexOf(this.state.points.find(p => p.x == x && p.y == y))
    if(index == -1) {
      let points = this.state.points
      points.push({x, y})
      this.setState({
        points
      })
      console.log(points)
    }
  }

  removePoint = (x, y) => {
    let index = this.state.points.indexOf(this.state.points.find(p => p.x == x && p.y == y))
    if(index >= 0) {
      this.state.points.splice(index, 1)
      this.setState(this.state)
    }
  }

  addCenterPoint = (x, y) => {
    let index = this.state.centerPoints.indexOf(this.state.centerPoints.find(p => p.x == x && p.y == y))
    if(index == -1) {
      let points = this.state.centerPoints
      points.push({x, y})
      this.setState({
        centerPoints: points
      })
      console.log(points)
    }
  }

  removeCenterPoint = (x, y) => {
    let index = this.state.centerPoints.indexOf(this.state.centerPoints.find(p => p.x == x && p.y == y))
    if(index >= 0) {
      this.state.centerPoints.splice(index, 1)
      this.setState(this.state)
    }
  }

  render() {
    const { height, width } = this.state    
    const sidebarWidth = 350
    const padding = 40
    const p2 = padding / 2
    console.log(this.state.centerPoints)
    return (
      <div className="App" style={{ width: "100%", overflow: "hidden" }}>
        <div>
          <div style={{ width: width - sidebarWidth, float: "left", margin: p2 }}>
            <Plot
              height={height - padding}
              width={width} 
              data={this.state.points} 
              centerPoints={this.state.centerPoints}
              sidebarWidth={sidebarWidth}
            />
          </div>
          <div style={{ marginLeft: width - sidebarWidth + padding, height }}>
            <Menu 
              addPoint={this.addPoint}
              removePoint={this.removePoint}
              addCenterPoint={this.addCenterPoint}
              removeCenterPoint={this.removeCenterPoint}
            />
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
  
  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
}
