import React from 'react';
import 'react-vis/dist/style.css';
import { Button, Form, FormGroup, Label, Input, Row, Col, Card } from 'reactstrap';
import { render } from 'react-dom';

export default class Plot extends React.Component {
  state = {
    x: 0,
    y: 0,
    xx: 0,
    yy: 0
  }

  onChange = e => {
    const value = parseInt(e.target.value)
    this.setState({
      [e.target.name]: value
    })
  }

  render() {
    return (
      <div class="pt-5 pr-4">
        <Card body>
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Input type="number" name="x" id="x" placeholder="x" onChange={this.onChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Input type="number" name="y" id="y" placeholder="y" onChange={this.onChange} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button color="info" onClick={() => this.props.addPoint(this.state.x, this.state.y)} className="m-1"> Dodaj tačku </Button>
          <Button color="danger" onClick={() => this.props.removePoint(this.state.x, this.state.y)} className="m-1"> Obriši tačku </Button>
        </Card>

        <Card body className="mt-4">
          <Form>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Input type="number" name="xx" id="x" placeholder="x" onChange={this.onChange} />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Input type="number" name="yy" id="y" placeholder="y" onChange={this.onChange} />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button color="info" onClick={() => this.props.addCenterPoint(this.state.xx, this.state.yy)} className="m-1"> Dodaj centar </Button>
          <Button color="danger" onClick={() => this.props.removeCenterPoint(this.state.xx, this.state.yy)} className="m-1"> Obriši centar </Button>
        </Card>
      </div>
    )
  }
}