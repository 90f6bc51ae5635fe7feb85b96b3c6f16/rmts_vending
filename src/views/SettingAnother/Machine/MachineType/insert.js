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

import MachineTypeModel from "../../../../models/MachineTypeModel"
import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

const machinetype_model = new MachineTypeModel()

class Insert extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: '',
      data_modal: '',
      machine_type_code: '',
      machine_type_name: '',

    }
  }

  componentDidMount() {
    this._fetchData()
  }

  async _fetchData() {
    const now = new Date()
    const last_code = await machinetype_model.getMachineTypeLastCode({
      code: `MTC${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}`,
      digit: 3,
    })

    this.setState({
      loading: false,

      machine_type_code: last_code.data,
    })
  }

  _handleSubmit(event) {
    event.preventDefault()

    if (this._checkSubmit()) {
      this.setState({
        loading: true,
      }, async () => {
        const res = await machinetype_model.insertMachineType({
          machine_type_code: this.state.machine_type_code,
          machine_type_name: this.state.machine_type_name,
        })

        if (res.require) {
          Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success", })
          this.props.history.push("/settinganother/machine/machinetype")
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
    if (this.state.machine_type_code === '') {
      Swal.fire({ title: "กรุณาระบุรหัส !", text: "Please Enter name", icon: "warning", })
      return false
    } else if (this.state.machine_type_name === '') {
      Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
      return false
    } else {
      return true
    }
  }

  _inputdata = (e) => {
    this.setState({
      machine_type_name: e
    })
  }

  render() {


    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">เพิ่มประเภทเครื่องจักร / Add Machine Type</h3>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={4}>
                  <label>รหัสประเภทเครื่องจักร  <font color="#F00"><b>*</b></font></label>
                  <Input
                    type="text"
                    value={this.state.machine_type_code}
                    readOnly
                    onChange={(e) => this.setState({ machine_type_code: e.target.value })}
                    placeholder="รหัสประเภทเครื่องจักร "
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>ชื่อประเภทเครื่องจักร<font color="#F00"><b>*</b></font></label>
                    <Input
                      type="text"
                      placeholder="ชื่อประเภทเครื่องจักร "
                      value={this.state.machine_type_name}
                      // onChange={(e) => this.setState({ machine_type_name: e.target.value })}
                      onClick={() => this.setState({
                        show_modal: true,
                        title_modal: 'ชื่อประเภทเครื่องจักร',
                        data_modal: this.state.machine_type_name,
                      })}


                    />
                    <p className="text-muted"> Example : </p>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Button type="reset" color="danger">Reset</Button>
              <Link to="/settinganother/machine/machinetype">
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