import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import { Link } from 'react-router-dom'
class Machine extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount = () => {
    };

    render() {

        return (
            <div >
                <Row>
                    <Col md={2} />
                    <Col md={2}>
                        <Link exact to={`/settinganother/machine/machinemanagement`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>เครื่องจักร</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/machine/machinetype`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>ประเภทเครื่องจักร</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <Row>
                    <Col md={2} />
                    <Col md={2}>
                        <Link exact to={`/settinganother/machine/machinemodel`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>โมเดลเครื่องจักร</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/machine/machinebrand`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>แบนด์เครื่องจักร</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <Row className="app-footer">
                    <Col md={10}></Col>
                    <Col md={2}>
                        <Link to={`/settinganother`}>
                            <button
                                className="btn btn-dark">
                                กลับไปหน้าหลัก
                            </button>
                        </Link>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default Machine;
