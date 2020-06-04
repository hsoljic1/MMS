import React, { useState, useEffect } from 'react';
import '../node_modules/react-vis/dist/style.css';
import 'react-notifications/lib/notifications.css';
import Plot from './components/Plot'
import Menu from './components/Menu'
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default class App extends React.Component {

  getInitialState = () => {
    return { 
      width: window.innerWidth, 
      height: window.innerHeight,
      points: [],
      centerPoints: [],
      running: false,
      newCenterPoints: [],
      clusters: []
    };
  }

  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  addPoint = (x, y) => {
    let index = this.state.points.indexOf(this.state.points.find(p => p.x == x && p.y == y))
    if(index == -1) {
      let points = this.state.points
      points.push({x, y})
      this.setState({
        points
      })
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
    }
  }

  removeCenterPoint = (x, y) => {
    let index = this.state.centerPoints.indexOf(this.state.centerPoints.find(p => p.x == x && p.y == y))
    if(index >= 0) {
      this.state.centerPoints.splice(index, 1)
      this.setState(this.state)
    }
  }

  run = () => {
    this.setState({
      running: !this.state.running
    })
  }

  step = () => {
    if(this.state.centerPoints.length == 0) {
      NotificationManager.error("Trebate dodati bar jedan centar");
    }
    if(this.state.points.length == 0) {
      NotificationManager.error("Trebate dodati tačke");
    }
    const points = this.state.points
    const centerPoints = this.state.centerPoints
    if(centerPoints.length == 0) {
      return {
        newCenterPoints: [],
        clusters: []
      }
    }
    this.setState({
      running: true
    })
    let clusters = []
    for(let i = 0; i < centerPoints.length; i++) {
      clusters.push([])
    }
    for(let i = 0; i < points.length; i++) {
      let myCluster = 0
      for(let c = 0; c < centerPoints.length; c++) {
        if(Math.hypot(points[i].x - centerPoints[c].x, points[i].y - centerPoints[c].y) < 
           Math.hypot(points[i].x - centerPoints[myCluster].x, points[i].y - centerPoints[myCluster].y)) {
            myCluster = c
        }
      }
      clusters[myCluster].push(points[i])
    }
    let newCenterPoints = []
    for(let i = 0; i < centerPoints.length; i++) {
      newCenterPoints.push({
        x: centerPoints[i].x,
        y: centerPoints[i].y
      })
    }
    for(let c = 0; c < clusters.length; c++) {
      let x = 0, y = 0
      for(let i = 0; i < clusters[c].length; i++) {
        x += clusters[c][i].x
        y += clusters[c][i].y
      }
      if(clusters[c].length > 0) {
        newCenterPoints[c] = {
          x: x / clusters[c].length,
          y: y / clusters[c].length
        }
      }
    }
    this.setState({
      newCenterPoints: []
    })
    this.setState({
      newCenterPoints,
      clusters,
      centerPoints: newCenterPoints
    })
    /*
    return {
      newCenterPoints,
      clusters,
      centerPoints: newCenterPoints
    }
    */
  }

  reset = () => {
    this.setState(this.getInitialState());
  }

  generateRandom = numberOfPoints => {
    const from = 0, to = Math.max(10, 2 * Math.ceil(Math.sqrt(numberOfPoints)))
    const points = []
    for(let i = 0; i < numberOfPoints; i++) {
      const point = {
        x: Math.floor(from + (to - from) * Math.random()),
        y: Math.floor(from + (to - from) * Math.random()),
      }
      if(points.find(p => p.x == point.x && p.y == point.y)) {
        i--;
      }
      else {
        points.push(point)
      }
    }
    console.log(points)
    this.setState({
      points
    })
  }

  render() {
    const { height, width } = this.state    
    const sidebarWidth = Math.floor(width / 3)
    const padding = 40
    const p2 = padding / 2
    return (
      <div className="App" style={{ width: "100%", overflow: "hidden" }}>
        <NotificationContainer/>
        <div>
          <div style={{ width: width - sidebarWidth, float: "left", margin: p2 }}>
            <Plot
              height={height - padding}
              width={width} 
              data={this.state.points} 
              centerPoints={this.state.centerPoints}
              sidebarWidth={sidebarWidth}
              running={this.state.running}
              newCenterPoints={this.state.newCenterPoints}
              clusters={this.state.clusters}
            />
          </div>
          <div style={{ marginLeft: width - sidebarWidth + padding, height }}>
            <Menu 
              addPoint={this.addPoint}
              removePoint={this.removePoint}
              addCenterPoint={this.addCenterPoint}
              removeCenterPoint={this.removeCenterPoint}
              step={this.step}
              running={this.state.running}
              reset={this.reset}
              generateRandom={this.generateRandom}
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


