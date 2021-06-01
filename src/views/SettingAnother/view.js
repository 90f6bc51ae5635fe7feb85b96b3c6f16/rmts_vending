import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import { Link } from 'react-router-dom'

class SettingAnother extends Component {
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
                        <Link exact to={`/settinganother/user`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>จัดการผู้ใช้งาน</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/stock`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>จัดการคลัง</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <Row>
                    <Col md={2} />
                    <Col md={2}>
                        <Link exact to={`/settinganother/machine`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>จัดการเครื่องจักร</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/product`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>จัดการเครื่องมือ</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <Row className="app-footer">
                    <Col md={10}></Col>
                    <Col md={2}>
                        <Link to={`/`}>
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

export default SettingAnother;
