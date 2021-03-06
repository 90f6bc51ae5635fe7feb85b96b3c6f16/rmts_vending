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

import { Loading, Select } from "../../../../component/revel-strap"
import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

import UserTypeModel from "../../../../models/UserTypeModel";
import DepartmentModel from "../../../../models/DepartmentModel";
import LicenseModel from "../../../../models/LicenseModel";
import UserModel from "../../../../models/UserModel";

const department_model = new DepartmentModel();
const usertype_model = new UserTypeModel();
const license_model = new LicenseModel();
const user_model = new UserModel();

class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: '',
      data_modal: '',
      user_code: "",
      user_type_code: "",
      department_code: "",
      license_code: "",
      user_fisrtname: "",
      user_lastname: "",
      user_username: "",
      user_password: "",
      user_type_code: "",
      department_code: "",
      user_tel: "",
      addby: "",
      adddate: "",

      license: [],
      usertype: [],
      department: [],

    }
  }

  async componentDidMount() {
    const date = new Date();
    const last_code = await user_model.getUserLastCode({
      code: "MTP-U" + date.getFullYear(),
      digit: 3,
    });

    const license = await license_model.getLicenseBy();
    const usertype = await usertype_model.getUserTypeBy();
    const department = await department_model.getDepartmentBy();

    this.setState({
      loading: false,
      user_code: last_code.data,
      license: license.data,
      usertype: usertype.data,
      department: department.data,
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    this.setState({
      loading: true,
    }, async () => {
      if (this._checkSubmit()) {

        const res = await user_model.insertUser({
          user_code: this.state.user_code.trim(),
          user_fisrtname: this.state.user_fisrtname.trim(),
          user_lastname: this.state.user_lastname.trim(),
          user_username: this.state.user_username.trim(),
          user_password: this.state.user_password.trim(),
          user_type_code: this.state.user_type_code.trim(),
          department_code: this.state.department_code.trim(),
          license_code: this.state.license_code.trim(),
          user_tel: this.state.user_tel,
          // addby: this.props.USER.user_code,
          adddate: "",
        });

        if (res.require) {

          Swal.fire({ title: "?????????????????????????????????????????????????????? !", icon: "success", })
          this.props.history.push("/settinganother/user/user")
        } else {
          this.setState({
            loading: false,
          }, () => {
            Swal.fire({ title: "??????????????????????????????????????????????????????????????????????????? !", icon: "error", })
          })
        }
      }

    })
  }

  _checkSubmit() {

    //todo
    if (this.state.user_fisrtname === "") {
      Swal.fire("??????????????????????????????????????? !", "", "error");
    } else if (this.state.user_lastname === "") {
      Swal.fire("???????????????????????????????????????????????? !", "", "error");

    } else if (this.state.user_username === "") {
      Swal.fire("??????????????????????????????????????????????????????????????????????????? !", "", "error");

    } else if (this.state.user_password === "") {
      Swal.fire("??????????????????????????????????????????????????? !", "", "error");

    } else if (this.state.department_code === "") {
      Swal.fire("??????????????????????????????????????? !", "", "error");

    } else if (this.state.user_type_code === "") {
      Swal.fire("????????????????????????????????????????????? !", "", "error");

    } else if (this.state.license === "") {
      Swal.fire("???????????????????????????????????????????????????????????????????????? !", "", "error");

    } else if (this.state.user_tel === "") {
      Swal.fire("??????????????????????????????????????????????????? !", "", "error");

    } else {
      return true
    }

  }
  _inputdata = (e) => {
    if (this.state.title_modal === '????????????') {
      this.setState({
        user_fisrtname: e,
      })
    }
    else if (this.state.title_modal === '?????????????????????') {
      this.setState({
        user_lastname: e,
      })
    }
    else if (this.state.title_modal === '????????????????????????????????????????????????') {
      this.setState({
        user_username: e,
      })
    }
    else if (this.state.title_modal === '????????????????????????') {
      this.setState({
        user_password: e,
      })
    }
    else if (this.state.title_modal === '????????????????????????') {
      this.setState({
        user_tel: e,
      })
    }
  }

  render() {
    const license_options = this.state.license.map((item) => ({
      value: item.license_code,
      label: item.license_name,
    }));
    const usertype_options = this.state.usertype.map((item) => ({
      value: item.user_type_code,
      label: item.user_type_name,
    }));
    const department_options = this.state.department.map((item) => ({
      value: item.department_code,
      label: item.department_name,
    }));
    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>???????????????????????????????????? / Add Employee</CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col >
                  <label>
                    ??????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.user_code}
                    readOnly
                    onChange={(e) =>
                      this.setState({ user_code: e.target.value })
                    }
                    placeholder="?????????????????????????????????????????????????????????"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col >
                  <label>
                    {" "}
                    ????????????
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.user_fisrtname}
                    placeholder="????????????"
                    onClick={() => this.setState({
                      show_modal: true,
                      title_modal: '????????????',
                      data_modal: this.state.user_fisrtname,
                    })}
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col >
                  <label>
                    ?????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.user_lastname}
                    placeholder="?????????????????????"
                    onClick={() => this.setState({
                      show_modal: true,
                      title_modal: '?????????????????????',
                      data_modal: this.state.user_lastname,
                    })}
                  />
                  <p className="text-muted">Example :</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    ?????????????????????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Select
                    options={license_options}
                    value={this.state.license_code}
                    onChange={(e) =>
                      this.setState({ license_code: e })
                    }

                  />
                  <p className="text-muted">Example :</p>

                </Col>
                <Col>
                  <label>
                    ????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Select
                    options={department_options}
                    value={this.state.department_code}
                    onChange={(e) =>
                      this.setState({ department_code: e })
                    }

                  />
                  <p className="text-muted">Example :</p>

                </Col>
                <Col>
                  <label>
                    ????????????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Select
                    options={usertype_options}
                    value={this.state.user_type_code}
                    onChange={(e) =>
                      this.setState({ user_type_code: e })
                    }
                    placeholder="?????????????????????"
                  />
                  <p className="text-muted">Example :</p>

                </Col>
              </Row>
              <Row>
                <Col>
                  <label>
                    ????????????????????????????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    value={this.state.user_username}
                    placeholder="????????????????????????????????????????????????"
                    onClick={() => this.setState({
                      show_modal: true,
                      title_modal: '????????????????????????????????????????????????',
                      data_modal: this.state.user_username,
                    })}
                  />
                  <p className="text-muted">Example :</p>

                </Col>
                <Col>
                  <label>
                    ????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="password"
                    value={this.state.user_password}
                    placeholder="????????????????????????"
                    onClick={() => this.setState({
                      show_modal: true,
                      title_modal: '????????????????????????',
                      data_modal: this.state.user_password,
                    })}
                  />
                  <p className="text-muted">Example :</p>

                </Col>
                <Col>
                  <label>
                    ????????????????????????{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </label>
                  <Input
                    type="text"
                    className="float "
                    value={this.state.user_tel}
                    placeholder="????????????????????????"
                    onClick={() => this.setState({
                      show_modal: true,
                      title_modal: '????????????????????????',
                      data_modal: this.state.user_tel,
                    })}
                  />
                  <p className="text-muted">Example :</p>

                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <Button type="submit" color="success">
                Save
              </Button>
              <Button 
              type="reset" 
              color="danger"
              onClick={()=>this.setState({
                user_fisrtname:'',
                user_lastname:'',
                user_username:'',
                user_username:'',
                user_password:'',
                department_code:'',
                user_type_code:'',
                license:'',
                user_tel:'',
              })}
              >
                Reset
              </Button>
              <Link to="/settinganother/user/user">
                <Button type="button"> Back </Button>
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