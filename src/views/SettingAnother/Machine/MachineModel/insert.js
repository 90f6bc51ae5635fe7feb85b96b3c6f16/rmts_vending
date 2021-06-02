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



class Insert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data_modal:'',
            title_modal:'',
            loading: true,
            show_modal: false,
            machine_type_code: '',
            machine_type_name: '',

        }
    }

    componentDidMount() {
        this._fetchData();
    }

    async _fetchData() {
        const now = new Date();
        const last_code = await machinemodel_model.generateMachineModelLastCode({
            code: `SP${now.getFullYear()}${(now.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`,
            digit: 3,
        });

        this.setState({
            loading: false,
            machine_model_code: last_code.data,
        });
    }

    _handleSubmit(event) {
        event.preventDefault()
        if (this._checkSubmit()) {
            this.setState(
                {
                    loading: true,
                },
                async () => {
                    const res = await machinemodel_model.insertMachineModel({
                        machine_model_code: this.state.machine_model_code,
                        machine_model_name: this.state.machine_model_name,
                    });

                    if (res.require) {
                        Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
                        this.props.history.push("/machine-model");
                    } else {
                        this.setState(
                            {
                                loading: false,
                            },
                            () => {
                                Swal.fire({
                                    title: "เกิดข้อผิดพลาดในการบันทึก !",
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
        if (this.state.machine_model_code === "") {
            Swal.fire({
                title: "กรุณาระบุชื่อโมเดลเครื่่องจักร !",
                text: "Please Enter name",
                icon: "warning",
            });
            return false;
        } else if (this.state.machine_model_name === "") {
            Swal.fire({
                title: "กรุณาระบุชื่อโมเดลเครื่่องจักร !",
                text: "Please Enter Full Name",
                icon: "warning",
            });
            return false;
        } else {
            return true;
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
                        <h3 className="text-header">
                            เพิ่มโมเดลเครื่่องจักร / Add Machine Model
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
                                            onChange={(e) =>
                                                this.setState({ machine_model_name: e.target.value })
                                            }
                                            placeholder="ชื่อโมเดลเครื่่องจักร"
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
                            <Link to="/machine-model">
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