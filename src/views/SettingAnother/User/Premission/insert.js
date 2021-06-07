import React from "react"
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

import { Loading } from "../../../../component/revel-strap"
import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

import LicenseModel from "../../../../models/LicenseModel";
import PermissionModel from "../../../../models/PermissionModel";

const license_model = new LicenseModel();
const permission_model = new PermissionModel();


class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: '',
      data_modal: '',
      code_validate: {
        value: "",
        status: "",
        class: "",
        text: "",
      },
      license_code: "",
      license_name: "",
      permissions: [],
    };

  }

  componentDidMount() {
    this._fetchData()
  }


  async _fetchData() {
    const now = new Date();

    const last_code = await license_model.getLicenseLastCode({
      code: `L${now.getFullYear()}`,
      digit: 4,
    })

    const permissions = await permission_model.getPermissionBy();

    this.setState({
      loading: false,
      code_validate: {
        value: last_code.data,
        status: "VALID",
        class: "",
        text: "",
      },
      license_code: last_code.data,
      permissions: permissions.data,
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      this.setState(
        {
          loading: true,
        },
        async () => {
          const res = await license_model.insertLicense({
            license_code: this.state.license_code.trim(),
            license_name: this.state.license_name.trim(),
            permissions: this.state.permissions.map((item) => ({
              menu_code: item.menu_code,
              permission_view: item.permission_view ? 1 : 0,
              permission_add: item.permission_add ? 1 : 0,
              permission_edit: item.permission_edit ? 1 : 0,
              permission_approve: item.permission_approve ? 1 : 0,
              permission_cancel: item.permission_cancel ? 1 : 0,
              permission_delete: item.permission_delete ? 1 : 0,
            })),
            // addby: this.props.USER.user_code,
          });

          if (res.require) {
            Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
            this.props.history.push("/settinganother/user/premission");
          } else {
            this.setState(
              {
                loading: false,
              },
              () => {
                Swal.fire({
                  title: "เกิดข้อผิดพลาด !",
                  text: "ไม่สามารถดำเนินการได้ !",
                  icon: "error",
                });
              }
            );
          }
        }
      );
    }
  }

  _checkSubmit() {
    if (this.state.code_validate.status !== "VALID") {
      Swal.fire({ text: this.state.code_validate.text, icon: "warning" });
      return false;
    } else if (this.state.license_name.trim() === "") {
      Swal.fire({
        title: "กรุณาระบุชื่อสิทธิ์การใช้งาน / Please input Name !",
        icon: "error",
      });
      return false;
    } else {
      return true;
    }
  }

  async _checkCode() {
    const code = this.state.license_code.trim();

    if (code.length) {
      if (this.state.code_validate.value !== code) {
        const license = await license_model.getLicenseByCode({
          license_code: code,
        });

        if (license.data.length) {
          this.setState({
            code_validate: {
              value: code,
              status: "INVALID",
              class: "is-invalid",
              text: "This code already exists.",
            },
          });
        } else {
          this.setState({
            code_validate: {
              value: code,
              status: "VALID",
              class: "is-valid",
              text: "",
            },
          });
        }
      }
    } else {
      this.setState({
        code_validate: { value: code, status: "", class: "", text: "" },
      });
    }
  }

  _checkedAll(e, permission) {
    const { checked } = e.target;

    this.setState((state) => {
      state.permissions.forEach((item) => {
        if (permission === "view") {
          item.permission_view = checked;

          if (!checked) {
            item.permission_add = false;
            item.permission_edit = false;
            item.permission_approve = false;
            item.permission_cancel = false;
            item.permission_delete = false;
          }
        } else {
          if (checked) item.permission_view = checked;

          if (permission === "add") {
            item.permission_add = checked;
          } else if (permission === "edit") {
            item.permission_edit = checked;
          } else if (permission === "approve") {
            item.permission_approve = checked;
          } else if (permission === "cancel") {
            item.permission_cancel = checked;
          } else if (permission === "delete") {
            item.permission_delete = checked;
          }
        }
      });

      return { permissions: state.permissions };
    });
  }

  _checked(e, idx, permission) {
    const { checked } = e.target;

    this.setState((state) => {
      if (permission === "view") {
        state.permissions[idx].permission_view = checked;

        if (!checked) {
          state.permissions[idx].permission_add = false;
          state.permissions[idx].permission_edit = false;
          state.permissions[idx].permission_approve = false;
          state.permissions[idx].permission_cancel = false;
          state.permissions[idx].permission_delete = false;
        }
      } else {
        if (checked) state.permissions[idx].permission_view = checked;

        if (permission === "add") {
          state.permissions[idx].permission_add = checked;
        } else if (permission === "edit") {
          state.permissions[idx].permission_edit = checked;
        } else if (permission === "approve") {
          state.permissions[idx].permission_approve = checked;
        } else if (permission === "cancel") {
          state.permissions[idx].permission_cancel = checked;
        } else if (permission === "delete") {
          state.permissions[idx].permission_delete = checked;
        }
      }

      return { permissions: state.permissions };
    });
  }
  _inputdata = (e) => {
    if (this.state.title_modal === 'ชื่อสิทธิ์การใช้งาน') {
      this.setState({
        license_name: e,
      })
    }
  }

  render() {
    const menu_groups = [

      {
        menu_group: "account",
        menu_group_name: "การบัญชี",
        menu_group_color: "#fea213",
      },
      {
        menu_group: "master",
        menu_group_name: "ข้อมูลพื้นฐาน",
        menu_group_color: "#ffb97b",
      },
      { menu_group: "", menu_group_name: "", menu_group_color: "#dddddd" },

    ];
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">เพิ่มสิทธิ์การใช้งาน / Add License</h3>
          </CardHeader>
          <Form onSubmit={this._handleSubmit.bind(this)}>
            <CardBody>
              <Row>
                <Col md={3}>
                  <FormGroup>
                    <label>
                      รหัสสิทธิ์การใช้งาน{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.license_code}
                      className={this.state.code_validate.class}
                      onChange={(e) =>
                        this.setState({ license_code: e.target.value })
                      }
                      onBlur={() => this._checkCode()}
                      required
                    />
                    <p className="text-muted">Example : L20200001.</p>
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <label>
                      ชื่อสิทธิ์การใช้งาน{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </label>
                    <Input
                      type="text"
                      value={this.state.license_name}
                      // onChange={(e) =>
                      //   this.setState({ license_name: e.target.value })
                      // }
                      onClick={() => this.setState({
                        show_modal: true,
                        title_modal: 'ชื่อสิทธิ์การใช้งาน',
                        data_modal: this.state.license_name,
                      })}
                    />
                    <p className="text-muted">Example : ผู้ดูแล.</p>
                  </FormGroup>
                </Col>
              </Row>
              <h1>สิทธิ์การใช้งาน</h1>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th style={{ width: 48, textAlign: "center" }}>#</th>
                    <th className="text-center">เมนู</th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "view")}
                        />{" "}
                        ดู
                      </label>
                    </th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "add")}
                        />{" "}
                        เพิ่ม
                      </label>
                    </th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "edit")}
                        />{" "}
                        เเก้ไข
                      </label>
                    </th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "approve")}
                        />{" "}
                        อนุมัติ
                      </label>
                    </th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "cancel")}
                        />{" "}
                        ยกเลิก
                      </label>
                    </th>
                    <th style={{ width: 90, textAlign: "center" }}>
                      <label style={{ marginBottom: 0 }}>
                        <input
                          type="checkbox"
                          onChange={(e) => this._checkedAll(e, "delete")}
                        />{" "}
                        ลบ
                      </label>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.permissions.map((item, idx) => {
                    let display_menu = [];
                    if (
                      idx !== 0 &&
                      item.menu_group !==
                      this.state.permissions[idx - 1].menu_group &&
                      item.menu_group !== ""
                    ) {
                      let menu_group = menu_groups.find(
                        (val) => val.menu_group === item.menu_group
                      );

                      if (menu_group !== undefined) {
                        display_menu.push(
                          <tr
                            key={menu_group.menu_group}
                            style={{
                              backgroundColor: menu_group.menu_group_color,
                            }}
                          >
                            <td colSpan={9}>{menu_group.menu_group_name}</td>
                          </tr>
                        );
                      }
                    }

                    display_menu.push(
                      <tr key={idx}>
                        <td className="text-center">{idx + 1}</td>
                        <td>{item.menu_name}</td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_view}
                            onChange={(e) => this._checked(e, idx, "view")}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_add}
                            onChange={(e) => this._checked(e, idx, "add")}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_edit}
                            onChange={(e) => this._checked(e, idx, "edit")}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_approve}
                            onChange={(e) => this._checked(e, idx, "approve")}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_cancel}
                            onChange={(e) => this._checked(e, idx, "cancel")}
                          />
                        </td>
                        <td className="text-center">
                          <input
                            type="checkbox"
                            checked={item.permission_delete}
                            onChange={(e) => this._checked(e, idx, "delete")}
                          />
                        </td>
                      </tr>
                    );

                    return display_menu;
                  })}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">
                Save
              </Button>
              <Button type="reset" color="danger">
                Reset
              </Button>
              <Link to="/settinganother/user/premission">
                <Button type="button">Back</Button>
              </Link>
            </CardFooter>
          </Form>
        </Card>
        <Modalkeyboard
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />
      </div>
    )
  }
}

export default Insert