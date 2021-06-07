import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";

import LicenseModel from "../../../../models/LicenseModel";

const license_model = new LicenseModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      license: [],
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
        const license = await license_model.getLicenseBy({
          params: params,
        });

        this.setState({
          loading: false,
          license: license,
        });
      }
    );
  }

  _onDelete(code) {

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
          license_model.deleteLicenseByCode({ license_code: code }).then((res) => {

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
            จัดการสิทธิ์การใช้งาน / License

              <Link to={`/settinganother/user/premission/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i>เพิ่มสิทธิ์การใช้งาน
              </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.license.data}
              dataTotal={this.state.license.total}
              rowKey="license_code"
              columns={[
                {
                  title: "รหัสสิทธิ์การใช้งาน",
                  dataIndex: "license_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื้อสิทธิ์การใช้งาน",
                  dataIndex: "license_name",
                  filterAble: true,
                  ellipsis: true,
                },


                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];


                    row_accessible.push(
                      <Link key="update" to={`/settinganother/user/premission/update/${cell.license_code}`} title="แก้ไขรายการ"  >
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
                        onClick={() => this._onDelete(cell.license_code)}
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