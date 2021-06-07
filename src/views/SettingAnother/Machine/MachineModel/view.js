import React, { Component } from "react";
import {   Card, CardBody, CardHeader,Row,Col } from "reactstrap";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import { Loading, Table } from "../../../../component/revel-strap";
import MachineModelModel from "../../../../models/MachineModelModel";
const machinemodel_model = new MachineModelModel();

class View extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
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
              machinemodel_model.deleteMachineModelByCode({ machine_model_code: code }).then((res) => {
                
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
                                      <Link key="update" to={`/settinganother/machine/machinemodel/update/${cell.machine_model_code}`} title="แก้ไขรายการ"  >
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
                                  onClick={() => this._onDelete(cell.machine_model_code)}>
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

export default View;