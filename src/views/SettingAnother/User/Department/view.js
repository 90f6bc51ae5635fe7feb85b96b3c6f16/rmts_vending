import React, { Component } from "react";
import { Card, CardBody, CardHeader, Row, Col } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import DepartmentModel from "../../../../models/DepartmentModel";

const depament_model = new DepartmentModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      department: [],
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
        const department = await depament_model.getDepartmentBy({
          params: params,
        });

        this.setState({
          loading: false,
          department: department,
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
          // loading: true,
        }, () => {
          depament_model.deleteDepartmentByCode({ department_code: code }).then((res) => {

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
            จัดการแผนก / department

              <Link to={`/settinganother/user/department/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i> แผนก
              </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.department.data}
              dataTotal={this.state.department.total}
              rowKey="department_code"
              columns={[
                {
                  title: "รหัสแผนก",
                  dataIndex: "department_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อแผนก",
                  dataIndex: "department_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                    row_accessible.push(
                      <Link key="update" to={`/settinganother/user/department/update/${cell.department_code}`} title="แก้ไขรายการ"  >
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
                        onClick={() => this._onDelete(cell.department_code)}
                      >
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
            <Link to={`/settinganother/user`}>
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