import React from 'react';
import 'react-vis/dist/style.css';
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { render } from 'react-dom';

export default class Plot extends React.Component {

    onChange = e => {
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div class="pt-5 pr-4">
                <Form>
                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Input type="number" name="x" id="x" placeholder="x" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Input type="number" name="y" id="y" placeholder="y" onChange={this.onChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
                <Button onClick={() => this.props.addPoint(this.state.x, this.state.y)}>Dodaj</Button>
            </div>
        )
    }
}