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

import DepartmentModel from "../../../../models/DepartmentModel";
const depament_model = new DepartmentModel();

class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: '',
      data_modal: '',
      code_validate: {
        value: '',
        status: '',
        class: '',
        text: '',
      },
      department_code: '',
      department_name: '',
      addby: '',
      adddate: '',
      updateby: '',
      lastupdate: '',

    }
  }

  componentDidMount() {
    this._fetchData()
  }

  async _fetchData() {
    const now = new Date()
     const last_code = await depament_model.getDepartmentLastCode({
       code: `DC${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}`,
      digit: 3,
   })

    this.setState({
      loading: false,
      department_code: last_code.data,
    })
  }

  _handleSubmit(event) {
    event.preventDefault()

    if (this._checkSubmit()) {
      this.setState({
        loading: true,
      }, async () => {
        const res = await depament_model.insertDepartment({
          department_code: this.state.department_code,
            department_name: this.state.department_name,
         
          
        })

        if (res.require) {
          
          Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success", })
          this.props.history.push("/settinganother/user/department")
        } else {
          this.setState({
            loading: false,
          }, () => {
            Swal.fire({ title: "เกิดข้อผิดพลาดในการบันทึก !", icon: "error", })
          })
        }
      })
    }
  }

  _checkSubmit() {
    if (this.state.department_code === '') {
      Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter name", icon: "warning", })
      return false
    } else if (this.state.department_code === '') {
      Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
      return false
    } else {
      return true
    }
  }



  _inputdata = (e) => {
    if (this.state.title_modal === 'ชื่อแผนก') {
      this.setState({
        department_name: e,
      })
    }
  }

  render() {

    return (
      <div>
    <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">เพิ่มแผนก / Add Department</h3>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={4}>
                  <label>รหัสแผนก <font color="#F00"><b>*</b></font></label>
                  <Input
                    type="text"
                    value={this.state.department_code}
                    disabled
                    onChange={(e) => this.setState({ department_code: e.target.value })}
                    placeholder="รหัสแผนก"
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>ชื่อผู้แผนก <font color="#F00"><b>*</b></font></label>
                    <Input
                      type="text"
                      value={this.state.department_name}
                      // onChange={(e) => this.setState({ department_name: e.target.value })}
                      placeholder="ชื่อแผนก"
                      onClick={() => this.setState({
                        show_modal: true,
                        title_modal: 'ชื่อแผนก',
                        data_modal: this.state.department_name,
                      })}
                    />
                    <p className="text-muted"> Example : </p>
                  </FormGroup>
                </Col>
              
              </Row>
              
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Button 
              type="reset" 
              color="danger"
              onClick={() => this.setState({
                department_name: '',
              })}
              >Reset</Button>
              <Link to="/settinganother/user/department">
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