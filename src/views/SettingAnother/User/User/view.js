import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import UserModel from "../../../../models/UserModel";

const user_model = new UserModel()

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      users: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState({
      loading: true,
    }, async () => {
      const users = await user_model.getUserBy({
        params: params,
      })

      this.setState({
        loading: false,
        users: users,
      })
    })
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
        }, async () => {
          user_model.deleteUserByCode({ user_code: code }).then(res => {
            if (res.require) {
              Swal.fire('Success Deleted!', '', 'success')
              this._fetchData()
            } else {
              this.setState({ loading: false })
              Swal.fire('Sorry, Someting worng !', '', 'error')
            }
          })
        })
      }
    })
  }

  render() {

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            จัดการผู้ใช้ / User

              <Link to={`/settinganother/user/user/insert`} className="btn btn-success float-right">
              <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มผู้ใช้
              </Link>


          </CardHeader> 
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.users.data}
              dataTotal={this.state.users.total}
              rowKey='user_code'
              columns={[
                {
                  title: "รหัสพนักงาน",
                  dataIndex: "user_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ชื่อ",
                  dataIndex: "fullname",
                  filterAble: true,
                  ellipsis: true,
                },

                {
                  title: "สิทธิ์การใช้งาน",
                  dataIndex: "license_name",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "แผนก ",
                  dataIndex: "department_name",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ประเภทผู้ใช้ ",
                  dataIndex: "user_type_name",
                  filterAble: true,
                  ellipsis: true,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = []


                    row_accessible.push(
                      <Link key="update" to={`/settinganother/user/user/update/${cell.user_code}`} title="แก้ไขรายการ"  >
                        {/* <i style={{ fontSize: "18px", marginLeft: "8px" }} className="fa fa-pencil-square-o" aria-hidden="true" ></i> */}
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info">
                          แก้ไข
                        </button>
                      </Link>
                    )


                    row_accessible.push(
                      // <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.user_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
                      <button
                      style={{ width: "58.6px" }}
                      className="btn btn-danger"
                      onClick={() => this._onDelete(cell.user_code)}
                    >
                      ลบ
                    </button>
                    )

                    return row_accessible
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