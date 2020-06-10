import React, { useState, useEffect } from 'react';
import 'react-vis/dist/style.css';
import { XYPlot, MarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';


export default class Plot extends React.Component {
  constructor(props) {
    super(props)
    const myPalette = [
      "#173f5f",
      "#20639b",
      "#3caea3",
      "#f6d55c",
      "#ed553b",
      "#900c3f",
      "#b6cec7",
      "#a37f6f",
      "#eacfac",
    ]
    this.myPalette = shuffle(myPalette)
  }
  render() {
    const centerSize = 8
    const pointSize = 4
    if (!this.props.running) {
      return (
        <XYPlot
          height={this.props.height}
          width={this.props.width - this.props.sidebarWidth}
        >
          <XAxis />
          <YAxis />
          <VerticalGridLines />
          <HorizontalGridLines />
          <MarkSeries
            data={[{x: 0, y: 0}, {x: 9, y: 9}]}
            size={0}
          />
          {this.props.data.map((point, i) => (
            <MarkSeries
              animation={'noWobble'}
              key={JSON.stringify(point)}
              data={[point]}
              size={this.props.pointCluster[i] == -1 ? 10 : pointSize}
              color={this.myPalette[this.props.pointCluster[i]] || 0}
            />
          ))}
          {this.props.centerPoints.map((center, i) => (
            <MarkSeries
              animation={'noWobble'}
              key={JSON.stringify(center)}
              data={[center]}
              size={centerSize}
              color={this.myPalette[i]}
            />
          ))}
        </XYPlot>
      )
    }
    else {
      return (
        <XYPlot
          height={this.props.height}
          width={this.props.width - this.props.sidebarWidth}
        >
          <XAxis />
          <YAxis />
          <VerticalGridLines />
          <HorizontalGridLines />
          <MarkSeries
            data={[{x: 0, y: 0}, {x: 9, y: 9}]}
            size={0}
          />
          {this.props.centerPoints.map((center, i) => (
            <MarkSeries
              animation={'noWobble'}
              key={JSON.stringify(center)}
              data={[center]}
              size={centerSize}
              color={this.myPalette[i]}
            />
          ))}
          {this.props.data.map((point, i) => (
            <MarkSeries
              animation={'noWobble'}
              key={JSON.stringify(point)}
              data={[point]}
              size={this.props.pointCluster[i] == -1 ? 10 : pointSize}
              color={this.myPalette[this.props.pointCluster[i]] || 0}
            />
          ))}
        </XYPlot>
      )
    }
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}