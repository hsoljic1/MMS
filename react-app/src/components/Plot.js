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
            animation={'wobble'}
            key={JSON.stringify(this.props.data)}
            data={this.props.data}
            size={pointSize}
          />
          {this.props.centerPoints.map((center, i) => (
            <MarkSeries
              animation={'wobble'}
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
          {this.props.newCenterPoints.map((center, i) => (
            <MarkSeries
              animation={'wobble'}
              key={JSON.stringify(center)}
              data={[center]}
              size={centerSize}
              color={this.myPalette[i]}
            />
          ))}
          {this.props.clusters.map((cluster, i) => (
            <MarkSeries
              animation={'wobble'}
              key={JSON.stringify(cluster)}
              data={cluster}
              size={pointSize}
              color={this.myPalette[i]}
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