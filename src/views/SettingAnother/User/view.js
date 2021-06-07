import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import { Link } from 'react-router-dom'
class User extends Component {
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
                        <Link exact to={`/settinganother/user/user`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>ผู้ใช้งาน</CardTitle>
                                    <CardTitle>(User)</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/user/premission`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>สิทธิ์การใช้งาน</CardTitle>
                                    <CardTitle>(Premission)</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2}></Col>
                </Row>

                <Row>
                    <Col md={2} />
                    <Col md={2}>
                        <Link exact to={`/settinganother/user/department`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>แผนก</CardTitle>
                                    <CardTitle>(Department)</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/user/user-type`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>ประเภท</CardTitle>
                                    <CardTitle>(User Type)</CardTitle>
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
                                className="btn btn-secondary">
                                ย้อนกลับ
                            </button> 
                        </Link>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default User;