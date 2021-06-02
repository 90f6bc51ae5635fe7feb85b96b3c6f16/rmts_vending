import React, { Component } from "react";
import { Col, Row, Card, CardBody,  CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import GLOBAL from "../../../../GLOBAL"
import MachineModel from "../../../../models/MachineModel";

const machine_model = new MachineModel();
class Machine extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      machine: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const machine = await machine_model.getMachineBy({
          params: params,
        });

        this.setState({
          loading: false,
          machine: machine,
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
          machine_model.deleteMachineByCode({ machine_code: code }).then((res) => {

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
            จัดการเครื่องจักร / Machine Management
              <Link to={`/settinganother/machine/machine/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i> เครื่องจักร
              </Link>
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.machine.data}
              dataTotal={this.state.machine.total}
              rowKey="machine_code"
              columns={[
                {
                  title: "รหัสเครื่องจักร",
                  dataIndex: "machine_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ประเภทเครื่องจักร",
                  dataIndex: "machine_type_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "โมเดล",
                  dataIndex: "machine_model_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "แบนด์",
                  dataIndex: "machine_brand_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "รายละเอียด",
                  dataIndex: "machine_detail",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: 'รูป',
                  dataIndex: 'machine_image',
                  render: (cell) => {

                    return (
                      <img className="image-list" src={GLOBAL.BASE_URL.URL_IMG + cell} style={{ width: "80px" }} alt="machine_image" />
                    )
                  },
                },
                {
                  title: "ชื่อ",
                  dataIndex: "machine_name",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "สถานะ",
                  dataIndex: "machine_status",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "หัวเจาะ",
                  dataIndex: "machine_spindle",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];


                    row_accessible.push(
                      <Link key="update" to={`/settinganother/machine/machine/update/${cell.machine_code}`} title="แก้ไขรายการ"  >

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
                        onClick={() => this._onDelete(cell.machine_code)}>
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