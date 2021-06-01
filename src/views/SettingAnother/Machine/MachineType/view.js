import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, CardTitle, } from "reactstrap";
import { Link, NavLink } from 'react-router-dom'
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
                console.log("machinetype",machinetype);
                this.setState({
                    loading: false,
                    machinetype: machinetype,

                });
            }

        );
        
    }

    render() {
        
        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        จัดการประเภทเครื่องจักร / Machine Type Management
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

                                        // if (permission_edit) {
                                        //   row_accessible.push(
                                        //     <Link key="update" to={`/machine-type/update/${cell.machine_type_code}`} title="แก้ไขรายการ"  >
                                        //       <i style={{ fontSize: "18px", marginLeft: "8px" }} className="fa fa-pencil-square-o" aria-hidden="true" ></i>
                                        //     </Link>
                                        //   );
                                        // }

                                        row_accessible.push(
                                            <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.machine_type_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
                                        );


                                        return row_accessible;
                                    },
                                    width: 80,
                                },
                            ]}
                        />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default MachineType;