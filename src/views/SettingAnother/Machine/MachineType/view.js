import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, } from "reactstrap";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { Loading, Table } from "../../../../component/revel-strap";

import MachineTypeModel from "../../../../models/MachineTypeModel";
const machinetype_model = new MachineTypeModel();

class MachineType extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            machinetype: [],
        };
    }

    componentDidMount() {
        this._fetchData();
    }

    _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
        this.setState(
            {
                loading: true,
            },
            async () => {
                const machinetype = await machinetype_model.getMachineTypeBy({
                    params: params,
                });
                console.log("machinetype", machinetype);
                this.setState({
                    loading: false,
                    machinetype: machinetype,
                });
            }
        );
    }
    _onDelete(code) {
        console.log(code);
        Swal.fire({
            title: "Are you sure ?",
            text: "Confirm to delete this item",
            icon: "warning",
            showCancelButton: true,
        }).then((result) => {

            if (result.value) {
                this.setState({
                    loading: true,
                }, () => {
                    machinetype_model.deleteMachineTypeByCode({ machine_type_code: code }).then((res) => {

                        if (res.require) {
                            Swal.fire("Success Deleted!", "", "success");
                            this._fetchData();
                        } else {
                            this.setState({
                                loading: false,
                            }, () => {
                                Swal.fire("Sorry, Someting worng !", "", "error");
                            });
                        }
                    });
                });
            }
        });
    }

    render() {

        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        จัดการประเภทเครื่องจักร / Machine Type Management
                        <Link to={`/settinganother/machine/machinetype/insert`} className="btn btn-success float-right" >
                            <i className="fa fa-plus" aria-hidden="true"></i> ประเภทเครื่องจักร
                        </Link>
                    </CardHeader>
                    <CardBody>
                        <Table
                            onChange={(e) => this._fetchData(e)}
                            showRowNo={true}
                            dataSource={this.state.machinetype.data}
                            dataTotal={this.state.machinetype.total}
                            rowKey="machine_type_code"
                            columns={[
                                {
                                    title: "รหัสประเภทเครื่องจักร",
                                    dataIndex: "machine_type_code",
                                    filterAble: true,
                                    ellipsis: true,
                                    width: 240,
                                },

                                {
                                    title: "ชื่อประเภทเครื่องจักร",
                                    dataIndex: "machine_type_name",
                                    filterAble: true,
                                    ellipsis: true,
                                },

                                {
                                    title: "",
                                    dataIndex: "",
                                    render: (cell) => {

                                        const row_accessible = [];

                                        row_accessible.push(
                                            <Link key="update" to={`/settinganother/machine/machinetype/update/${cell.machine_type_code}`} title="แก้ไขรายการ"  >
                                                <button
                                                    style={{ width: "58.6px" }}
                                                    className="btn btn-info">
                                                    แก้ไข
                                                </button>
                                            </Link>
                                        );

                                        row_accessible.push(
                                            <button
                                                style={{ width: "58.6px" }}
                                                className="btn btn-danger"
                                                onClick={() => this._onDelete(cell.machine_type_code)}>
                                                ลบ
                                            </button>
                                        );

                                        return row_accessible;

                                    },
                                    width: 80,
                                },
                            ]}
                        />
                    </CardBody>
                </Card>
                <Row className="app-footer">
                    <Col md={10}></Col>
                    <Col md={2}>
                        <Link to={`/settinganother/machine`}>
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

export default MachineType;