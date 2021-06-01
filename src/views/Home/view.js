import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import { NavLink } from 'react-router-dom';


class Home extends Component {
    constructor() {
        super();
        this.state = {
        };
    }
    componentDidMount = () => {
    };

    render() {
        return (
            <div className="container">
                <Row>
                    <Col md={3}>
                        <NavLink exact to={`/receiveTool`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>รับเข้าอุปกรณ์</CardTitle>
                                </CardBody>
                            </Card>
                        </NavLink>
                    </Col>
                    <Col md={3}>
                        <NavLink exact to={`/takeoutTool`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>เบิกออกอุปกรณ์</CardTitle>
                                </CardBody>
                            </Card>
                        </NavLink>
                    </Col>
                    <Col md={3}>
                        <NavLink exact to={`/settingmachine`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>ตั้งค่าเครื่อง</CardTitle>
                                </CardBody>
                            </Card>
                        </NavLink>
                    </Col>
                    <Col md={3}>
                        <NavLink exact to={`/settinganother`} style={{ width: '100%' }}>
                            <Card className="btn">
                                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                                <CardBody>
                                    <CardTitle>ตั้งค่าอื่นๆ</CardTitle>
                                </CardBody>
                            </Card>
                        </NavLink>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Home;
