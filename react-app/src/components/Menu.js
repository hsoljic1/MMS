import React from 'react';
import 'react-vis/dist/style.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { render } from 'react-dom';

export default class Plot extends React.Component {
  state = {
    x: 0,
    y: 0,
    xx: 0,
    yy: 0,
    numberOfPoints: 10,
    numberOfCenters: 2,
    metric: "Euclid",
    speed: 500

  }

  onChange = e => {
    const value = parseInt(e.target.value)
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    const running = this.props.running
    return (
      <div class="pt-4 pr-4">
        <Card body>
          Choose distance:
          <FormGroup check>
            <Row>
              <Col sm="6">
                <Input type="radio" name="radio1" onChange={() => this.setState({metric: "Euclid"})} checked={this.state.metric == "Euclid"}/>{' '}
                  Euclidean
                </Col>
              <Col sm="6">
                <Input type="radio" name="radio1" onChange={() => this.setState({metric: "Manhattan"})} checked={this.state.metric != "Euclid"}/>{' '}
                Manhattan
              </Col>
            </Row>
          </FormGroup>
        </Card>
        <Card body className="mt-2">
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> x </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="x" id="x" value={this.state.x} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="info" onClick={() => this.props.addPoint(this.state.x, this.state.y)} className=""> Add point</Button>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> y </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number"  name="y" id="y" value={this.state.y} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="danger" onClick={() => this.props.removePoint(this.state.x, this.state.y)} className="mt-1"> Remove point</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card body className="mt-2">
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> x </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="xx" id="xx" value={this.state.xx} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="info" onClick={() => this.props.addCenterPoint(this.state.xx, this.state.yy)} className=""> Add centroid </Button>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> y </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number"  name="yy" id="yy" value={this.state.yy} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="danger" onClick={() => this.props.removeCenterPoint(this.state.xx, this.state.yy)} className="mt-1"> Remove centroid </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card body className="mt-2">
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> Points </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="numberOfPoints" id="numberOfPoints" min="0" max="1000" value={this.state.numberOfPoints} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-0">
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> Centroids </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="numberOfCenters" id="numberOfCenters" min="0" max="8" value={this.state.numberOfCenters} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm="6">
                <Button disabled={running} size="sm" block color="info" onClick={() => this.props.generateRandom(this.state.numberOfPoints)} className="mt-1"> Generate</Button>
                <Button disabled={running} size="sm" block color="info" onClick={() => this.props.generateRandomCenters(this.state.numberOfCenters)} className="mt-3"> Generate</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <div className="p-3">
          <fieldset class="form-group">
            <label for="customRange1">Speed: {this.state.speed} ms</label>
            <input disabled={running} type="range" class="custom-range" min="500" max="2500" step="100" onChange={(e) => {this.setState({speed: e.target.value})}} id="customRange1"></input>
          </fieldset>
          <Row>
            <Col sm="6">
              <Button size="sm" block color="info" onClick={() => this.props.stepByStep(this.state.metric, this.state.speed)} className=""> Run </Button>
              <Button size="sm" block color="info" onClick={() => this.props.step(this.state.metric, this.state.speed)} className=""> Run iteration </Button>
              <Button size="sm" block color="info" onClick={() => this.props.smallStep(this.state.metric)} className=""> Next step </Button>
            </Col>
            <Col sm="6">
              <Button size="sm" block color="danger" onClick={() => this.props.reset()} className=""> Reset </Button>
              <Button size="sm" block color="info" onClick={() => this.props.iterationStep(this.state.metric)} className=""> Next iteration </Button>
              <Button size="sm" block color="info" onClick={() => this.props.findSolution(this.state.metric)} className=""> Solution </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}