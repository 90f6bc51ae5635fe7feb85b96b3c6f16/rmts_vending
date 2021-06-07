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

import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

import UserTypeModel from "../../../../models/UserTypeModel";


const usertype_model = new UserTypeModel()

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show_modal: false,
            title_modal: '',
            data_modal: '',
            user_type_code: '',
            user_type_name: '',
        }
    }

    componentDidMount() {
      this.setState({
        loading: true,
      }, async () => {
        const { code } = this.props.match.params
  
        const usertype = await usertype_model.getUserTypeByCode({ user_type_code: code })
  
        if (usertype.require === false) {
          Swal.fire({ title: "ข้อผิดพลาด !", text: 'ไม่สามารถโหลดข้อมูล', icon: "error", })
          this.props.history.push('/user-type')
        } else if (usertype.data.length === 0) {
          Swal.fire({ title: "ไม่พบรายการนี้ในระบบ !", text: code, icon: "warning", })
          this.props.history.push('/user-type')
        } else {
          const {
            user_type_code,
            user_type_name,
          
          } = usertype.data[0]
  
          this.setState({
            loading: false,
            user_type_code: user_type_code,
            user_type_name: user_type_name,
          
          })
        }
      })
    }



    async _handleSubmit(event) {
      event.preventDefault()
  
      if (this._checkSubmit()) {
        const res = await usertype_model.updateUserTypeBy({
          user_type_code: this.state.user_type_code,
          user_type_name: this.state.user_type_name,
         
        })
       
        if (res.require) {
          Swal.fire('อัพเดตข้อมูลสำเร็จ !', '', 'success')
          this.props.history.push('/settinganother/user/user-type')
        } else {
          Swal.fire("เกิดข้อผิดพลาด !", '', 'error')
        }
      }
    }
      _checkSubmit() {
        if (this.state.user_type_code === '') {
          Swal.fire({ title: "กรุณาระบุรหัส !", text: "Please Enter name", icon: "warning", })
          return false
        } else if (this.state.user_type_name === '') {
          Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
          return false
        } else {
          return true
        }
      }
    

    _inputdata = (e) => {
        if (this.state.title_modal === 'ชื่อประเภทผู้ใช้') {
            this.setState({
                user_type_name: e,
            })
        }
    }

    render() {


        return (
            <div>
       
            <Card>
              <CardHeader>
                <h3 className="text-header">แก้ไข ประเภทผู้ใช้/ Update User Type</h3>
              </CardHeader>
              <Form onSubmit={(event) => this._handleSubmit(event)}>
                <CardBody>
                  <Row>
                    <Col md={4}>
                      <label>รหัสประเภทผู้ใช้ <font color="#F00"><b>*</b></font></label>
                      <Input
                        type="text"
                        value={this.state.user_type_code}
                        disabled
                        onChange={(e) => this.setState({ user_type_code: e.target.value })}
                        placeholder="รหัสประเภทผู้ใช้"
                      />
                      <p className="text-muted">Example :</p>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <label>ชื่อประเภทผู้ใช้ <font color="#F00"><b>*</b></font></label>
                        <Input
                          type="text"
                          value={this.state.user_type_name}
                        //   onChange={(e) => this.setState({ user_type_name: e.target.value })}
                          placeholder="ชื่อประเภทผู้ใช้"
                          onClick={() => this.setState({
                            show_modal: true,
                            title_modal: 'ชื่อประเภทผู้ใช้',
                            data_modal: this.state.user_type_name,
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
                  onClick={()=>this.setState({
                  user_type_name:'',
                  })}
                  >Reset</Button>
                  <Link to="/settinganother/user/user-type">
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

export default Update