import React, { Component } from "react";
import {   Card, CardBody, CardHeader } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import MachineModelModel from "../../../../models/MachineModelModel";
const machinemodel_model = new MachineModelModel();

class MachineModel extends Component {
    constructor() {
        super();
        this.state = {
            machinemodel: [],
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
            const machinemodel = await machinemodel_model.getMachineModelBy({
              params: params,
            });
    
            this.setState({
              loading: false,
              machinemodel: machinemodel,
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
                        จัดการโมเดลเครื่องจักร / Machine Model Management
                
                            <Link to={`/settinganother/machine/machinemodel/insert`} className="btn btn-success float-right" >
                                <i className="fa fa-plus" aria-hidden="true"></i> โมเดลเครื่องจักร
                            </Link>
                        
                    </CardHeader>
                    <CardBody>
                        <Table
                            onChange={(e) => this._fetchData(e)}
                            showRowNo={true}
                            dataSource={this.state.machinemodel.data}
                            dataTotal={this.state.machinemodel.total}
                            rowKey="machine_model_code"
                            columns={[
                                {
                                    title: "รหัสโมเดลเครื่องจักร",
                                    dataIndex: "machine_model_code",
                                    filterAble: true,
                                    ellipsis: true,
                                    width: 240,
                                },

                                {
                                    title: "ชื่อโมเดลเครื่องจักร",
                                    dataIndex: "machine_model_name",
                                    filterAble: true,
                                    ellipsis: true,
                                },

                                {
                                    title: "",
                                    dataIndex: "",
                                    render: (cell) => {
                                        const row_accessible = [];

                                        
                                            row_accessible.push(
                                                <Link key="update" to={`/machine-model/update/${cell.machine_model_code}`} title="แก้ไขรายการ"  >
                                                    <i style={{ fontSize: "18px", marginLeft: "8px" }} className="fa fa-pencil-square-o" aria-hidden="true" ></i>
                                                </Link>
                                            );
                                       
                                        row_accessible.push(
                                            <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.machine_model_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
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

export default MachineModel;