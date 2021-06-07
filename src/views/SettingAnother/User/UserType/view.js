import React, { Component } from "react";
import { Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import UserTypeModel from "../../../../models/UserTypeModel";


const usertype_model = new UserTypeModel()

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      usertype: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState({
      loading: true,
    }, async () => {
      const usertype = await usertype_model.getUserTypeBy({
        params: params,
      })

      this.setState({
        loading: false,
        usertype: usertype,
      })
    })
  }
  _onDelete(code) {
    console.log("code", code);
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
          usertype_model.deleteUserTypeByCode({ user_type_code: code }).then(res => {
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
            จัดการประเภทผู้ใช้ / UserType
              <Link to={`/settinganother/user/user-type/insert`} className="btn btn-success float-right">
              <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มประเภทผู้ใช้
              </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.usertype.data}
              dataTotal={this.state.usertype.total}
              rowKey='user_type_code'
              columns={[
                {
                  title: "รหัสประเภท",
                  dataIndex: "user_type_code",
                  filterAble: true,
                  ellipsis: true,
                },
                {
                  title: "ชื่อประเภท",
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
                      <Link key="update" to={`/settinganother/user/user-type/update/${cell.user_type_code}`} title="แก้ไขรายการ"  >
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info">
                          แก้ไข
                        </button>
                      </Link>
                    )

                    row_accessible.push(
                      <button
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.user_type_code)}
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
      </div>
    );
  }
}

export default View;