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
import MachineBrandModel from "../../../../models/MachineBrandModel";

const machinebrand_model = new MachineBrandModel();

class Insert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data_modal: '',
            title_modal: '',
            loading: true,
            show_modal: false,
            machine_brand_code: "",
            machine_brand_name: "",

        }
    }

    componentDidMount() {
        this._fetchData();
    }

    async _fetchData() {
        const now = new Date();
        const last_code = await machinebrand_model.generateMachineLastCode({
            code: `MBC${now.getFullYear()}${(now.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`,
            digit: 3,
        });

        this.setState({
            loading: false,
            machine_brand_code: last_code.data,
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
                    const res = await machinebrand_model.insertMachineBrand({
                        machine_brand_code: this.state.machine_brand_code,
                        machine_brand_name: this.state.machine_brand_name,
                    });

                    if (res.require) {
                        Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
                        this.props.history.push("/settinganother/machine/machinebrand");
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
        if (this.state.machine_brand_code === "") {
            Swal.fire({
                title: "กรุณาระบุรหัส !",
                text: "Please Enter name",
                icon: "warning",
            });
            return false;
        } else if (this.state.machine_brand_name === "") {
            Swal.fire({
                title: "กรุณาระบุชื่อ !",
                text: "Please Enter  Name",
                icon: "warning",
            });
            return false;
        } else {
            return true;
        }
    }

    _inputdata = (e) => {
        this.setState({
            machine_brand_name: e,
        })
    }

    render() {


        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        <h3 className="text-header">
                            เพิ่มแบนด์เครื่องจักร / Add Machine brand
                        </h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <label>
                                        รหัสแบนด์เครื่องจักร{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Input
                                        type="text"
                                        value={this.state.machine_brand_code}
                                        readOnly
                                        onChange={(e) =>
                                            this.setState({ machine_brand_code: e.target.value })
                                        }
                                        placeholder="รหัสแบนด์เครื่องจักร"
                                    />
                                    <p className="text-muted">Example : </p>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>
                                            ชื่อแบนด์เครื่องจักร{" "}
                                            <font color="#F00">
                                                <b>*</b>
                                            </font>
                                        </label>
                                        <Input
                                            type="text"
                                            value={this.state.machine_brand_name}
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อแบนด์เครื่องจักร',
                                                data_modal: this.state.machine_brand_name,
                                            })}
                                            // onChange={(e) =>
                                            //     this.setState({ machine_brand_name: e.target.value })
                                            // }
                                            placeholder="ชื่อแบนด์เครื่องจักร"
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
                            <Link to="/settinganother/machine/machinebrand">
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