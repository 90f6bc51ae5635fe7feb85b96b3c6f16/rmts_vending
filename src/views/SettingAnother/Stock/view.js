import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import { Link } from 'react-router-dom'
class View extends Component {
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
                        <Link exact to={`/settinganother/stock/stock`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>คลัง</CardTitle>
                                    <CardTitle>(Stock)</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    </Col>
                    <Col md={2} />

                    <Col md={2}>
                        <Link exact to={`/settinganother/stock/stock-layout`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>แผนผังคลัง</CardTitle>
                                    <CardTitle>(Stock Layout)</CardTitle>
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

export default View;
