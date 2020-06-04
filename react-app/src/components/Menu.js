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
    numberOfPoints: 10
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
      <div class="pt-5 pr-4">
        <Card body>
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
                <Button disabled={running} block size="sm" color="info" onClick={() => this.props.addPoint(this.state.x, this.state.y)} className=""> Dodaj tačku </Button>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> y </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="y" id="y" value={this.state.y} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="danger" onClick={() => this.props.removePoint(this.state.x, this.state.y)} className="mt-1"> Obriši tačku </Button>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card body className="mt-4">
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
                <Button disabled={running} block size="sm" color="info" onClick={() => this.props.addCenterPoint(this.state.xx, this.state.yy)} className=""> Dodaj centar </Button>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> y </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="yy" id="yy" value={this.state.yy} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
                <Button disabled={running} block size="sm" color="danger" onClick={() => this.props.removeCenterPoint(this.state.xx, this.state.yy)} className="mt-1"> Obriši centar </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card body className="mt-4">
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText> Broj tačaka </InputGroupText>
                    </InputGroupAddon>
                    <Input type="number" name="numberOfPoints" id="numberOfPoints" value={this.state.numberOfPoints} onChange={this.onChange} />
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col sm="6">
                <Button disabled={running} size="sm" block color="warning" onClick={() => this.props.generateRandom(this.state.numberOfPoints)} className="mt-1"> Generiši </Button>
              </Col>
            </Row>
          </Form>
        </Card>
        <div className="p-4">
          <Button size="sm" block color="success" onClick={() => this.props.step()} className=""> Korak </Button>
          <Button size="sm" block color="warning" onClick={() => this.props.reset()} className="mt-1"> Resetuj </Button>
        </div>
      </div>
    )
  }
}