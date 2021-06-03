import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { Loading, Table } from "../../../../component/revel-strap";
import MachineBrandModel from "../../../../models/MachineBrandModel";

const machinebrand_model = new MachineBrandModel();
class MachineBrand extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            machinebrand: [],
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
                const machinebrand = await machinebrand_model.getMachineBrandBy({
                    params: params,
                });

                this.setState({
                    loading: false,
                    machinebrand: machinebrand,
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
                    machinebrand_model.deleteMachineBrandByCode({ machine_brand_code: code }).then((res) => {

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
                        จัดการแบนด์เครื่องจักร/ Machine Brand Management

            <Link to={`/settinganother/machine/machinebrand/insert`} className="btn btn-success float-right" >
                            <i className="fa fa-plus" aria-hidden="true"></i> แบนด์เครื่องจักร
            </Link>

                    </CardHeader>
                    <CardBody>
                        <Table
                            onChange={(e) => this._fetchData(e)}
                            showRowNo={true}
                            dataSource={this.state.machinebrand.data}
                            dataTotal={this.state.machinebrand.total}
                            rowKey="machine_brand_code"
                            columns={[
                                {
                                    title: "รหัสแบนด์เครื่องจักร",
                                    dataIndex: "machine_brand_code",
                                    filterAble: true,
                                    ellipsis: true,
                                    width: 240,
                                },

                                {
                                    title: "ชื่อแบนด์เครื่องจักร",
                                    dataIndex: "machine_brand_name",
                                    filterAble: true,
                                    ellipsis: true,
                                },

                                {
                                    title: "",
                                    dataIndex: "",
                                    render: (cell) => {
                                        const row_accessible = [];


                                        row_accessible.push(
                                            <Link key="update" to={`/settinganother/machine/machinebrand/update/${cell.machine_brand_code}`} title="แก้ไขรายการ"  >
                                                {/* <i style={{ fontSize: "18px", marginLeft: "8px" }} className="fa fa-pencil-square-o" aria-hidden="true" ></i> */}
                                                <button
                                                    style={{ width: "58.6px" }}
                                                    className="btn btn-info">
                                                    แก้ไข
                                                </button>
                                            </Link>

                                        );


                                        row_accessible.push(
                                            // <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.machine_brand_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
                                            <button
                                                style={{ width: "58.6px" }}
                                                className="btn btn-danger"
                                                onClick={() => this._onDelete(cell.machine_brand_code)}>
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

export default MachineBrand;