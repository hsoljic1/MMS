import React, { useState, useEffect } from 'react';
import 'react-vis/dist/style.css';
import {XYPlot, MarkSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';

export default class Plot extends React.Component {

    
    render() {
        console.log(5)
        return (
            <XYPlot height={this.props.height} width={this.props.width - this.props.sidebarWidth}>
                <XAxis />
                <YAxis />
                <VerticalGridLines />
                <HorizontalGridLines />
                <MarkSeries key={JSON.stringify(this.props.data)} data={this.props.data} />
            </XYPlot>
        )
    }
}