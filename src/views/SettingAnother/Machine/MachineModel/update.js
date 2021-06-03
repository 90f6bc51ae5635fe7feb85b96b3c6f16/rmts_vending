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
import Modalkeyboard from "./ModalKeyboard"
import MachineModelModel from "../../../../models/MachineModelModel"
const machinemodel_model = new MachineModelModel();

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data_modal: '',
            title_modal: '',
            loading: true,
            show_modal: false,
            machine_type_code: '',
            machine_type_name: '',

        }
    }

    componentDidMount() {
        this.setState(
          {
            loading: true,
          },
          async () => {
            const { code } = this.props.match.params;
    
            const machinemodel = await machinemodel_model.getMachineModelByCode({
              machine_model_code: code,
            });
    
            if (machinemodel.require === false) {
              Swal.fire({
                title: "ข้อผิดพลาด !",
                text: "ไม่สามารถโหลดข้อมูล",
                icon: "error",
              });
              this.props.history.push("/machine-model");
            } else if (machinemodel.data.length === 0) {
              Swal.fire({
                title: "ไม่พบรายการนี้ในระบบ !",
                text: code,
                icon: "warning",
              });
              this.props.history.push("/machine-model");
            } else {
              const { machine_model_code, machine_model_name } =
                machinemodel.data[0];
    
              this.setState({
                loading: false,
                machine_model_code: machine_model_code,
                machine_model_name: machine_model_name,
              });
            }
          }
        );
      }
    

      async _handleSubmit(event) {
        event.preventDefault();
    
        if (this._checkSubmit()) {
          const res = await machinemodel_model.updateMachineModelBy({
            machine_model_code: this.state.machine_model_code,
            machine_model_name: this.state.machine_model_name,
          });
    
          if (res.require) {
            Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
            this.props.history.push("/settinganother/machine/machinemodel");
          } else {
            Swal.fire("เกิดข้อผิดพลาด !", "", "error");
          }
        }
      }
    
      _checkSubmit() {
        if (this.state.machine_model_code === "") {
          Swal.fire("กรุณาระบุชื่อผู้ขาย / Please Enter name");
          return false;
        } else if (this.state.machine_model_name === "") {
          Swal.fire("กรุณาระบุชื่อตามใบกำกับภาษี / Please Enter Full Name");
          return false;
        } else {
          return true;
        }
      }

    _inputdata = (e) => {
        this.setState({
            machine_model_name: e,
        })
    }

    render() {


        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        <h3 className="text-header">
                        แก้ไขโมเดลเครื่องจักร / Update Machine Model
                        </h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <label>
                                        รหัสโมเดลเครื่่องจักร{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Input
                                        type="text"
                                        value={this.state.machine_model_code}
                                        disabled
                                        onChange={(e) =>
                                            this.setState({ machine_model_code: e.target.value })
                                        }
                                        placeholder="รหัสโมเดลเครื่่องจักร"
                                    />
                                    <p className="text-muted">Example : </p>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>
                                            ชื่อโมเดลเครื่่องจักร{" "}
                                            <font color="#F00">
                                                <b>*</b>
                                            </font>
                                        </label>
                                        <Input
                                            type="text"
                                            value={this.state.machine_model_name}
                                            placeholder="ชื่อโมเดลเครื่่องจักร"
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อโมเดลเครื่่องจักร',
                                                data_modal: this.state.machine_model_name,
                                            })}
                                        // onChange={(e) =>
                                        //     this.setState({ machine_model_name: e.target.value })
                                        // }

                                        />
                                        <p className="text-muted"> Example : </p>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button type="submit" color="success">
                                Save
                            </Button>
                            <Button type="reset" color="danger">
                                Reset
                            </Button>
                            <Link to="/settinganother/machine/machinemodel">
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