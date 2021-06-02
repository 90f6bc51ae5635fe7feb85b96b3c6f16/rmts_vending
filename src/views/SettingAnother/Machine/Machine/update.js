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
import GLOBAL from "../../../../GLOBAL"
import { Select, Loading } from "../../../../component/revel-strap"
import { BaseServerFile } from "../../../../utils"
import MachineModel from "../../../../models/MachineModel"
import MachineTypeModel from "../../../../models/MachineTypeModel"
import MachineBrandModel from "../../../../models/MachineBrandModel"
import MachineModelModel from "../../../../models/MachineModelModel"
import Modalkeyboard from "./ModalKeyboard"

const base_server_file = new BaseServerFile()
const machine_model = new MachineModel()
const machinetype_model = new MachineTypeModel()
const machinemodel_model = new MachineModelModel()
const machinebrand_model = new MachineBrandModel()
class Update extends React.Component {
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
            machine_code: '',
            machine_type_code: '',
            machine_model_code: '',
            machine_brand_code: '',
            machine_detail: '',
            machine_image: {
                src: `${GLOBAL.BASE_URL.URL_IMG}default.png`,
                file: null,
                old: '',
            },
            upload_path: 'machine/',
            machine_name: '',
            machine_status: '',
            machine_spindle: '',
            addby: '',
            adddate: '',
            update: '',
            lastupdate: '',
            machine_type: [],
            machine_model: [],
            machine_brand: [],
        }
    }

    componentDidMount() {
        this._fetchData();
        this.setState(
            {
                loading: true,
            },
            async () => {
                const { code } = this.props.match.params;

                const machine = await machine_model.getMachineByCode({
                    machine_code: code,
                });

                if (machine.require === false) {
                    Swal.fire({
                        title: "ข้อผิดพลาด !",
                        text: "ไม่สามารถโหลดข้อมูล",
                        icon: "error",
                    });
                    this.props.history.push("/machine");
                } else if (machine.data.length === 0) {
                    Swal.fire({
                        title: "ไม่พบรายการนี้ในระบบ !",
                        text: code,
                        icon: "warning",
                    });
                    this.props.history.push("/machine");
                } else {
                    const {
                        machine_code,
                        machine_name,
                        machine_type_code,
                        machine_model_code,
                        machine_brand_code,
                        machine_detail,
                        machine_status,
                        machine_spindle,
                        machine_image,
                        addby,
                        adddate,
                        updateby,
                        lastupdate,
                    } = machine.data[0];
                    console.log(machine);

                    this.setState({
                        loading: false,
                        machine_code: machine_code,
                        machine_name: machine_name,
                        machine_type_code: machine_type_code,
                        machine_model_code: machine_model_code,
                        machine_brand_code: machine_brand_code,
                        machine_detail: machine_detail,
                        machine_image: {
                            src: `${GLOBAL.BASE_URL.URL_IMG}${machine_image === "" ? "default.png" : machine_image
                                }`,
                            file: null,
                            old: machine_image,
                        },
                        machine_status: machine_status,
                        machine_spindle: machine_spindle,
                        addby: addby,
                        adddate: adddate,
                        updateby: updateby,
                        lastupdate: lastupdate,
                    });
                }
            }
        );
    }

    async _fetchData() {
        const machinetype = await machinetype_model.getMachineTypeBy();
        const machinebrand = await machinebrand_model.getMachineBrandBy();
        const machinemodel = await machinemodel_model.getMachineModelBy();
        this.setState({
            loading: false,

            machine_type: machinetype.data,
            machine_brand: machinebrand.data,
            machine_model: machinemodel.data,
        });
    }


    async _handleSubmit(event) {
        event.preventDefault()

        event.preventDefault();

        if (this._checkSubmit()) {
            const res = await machine_model.updateMachineBy({
                machine_code: this.state.machine_code,
                machine_name: this.state.machine_name,
                machine_type_code: this.state.machine_type_code,
                machine_model_code: this.state.machine_model_code,
                machine_brand_code: this.state.machine_brand_code,
                machine_detail: this.state.machine_detail,
                machine_image: await base_server_file.uploadFile({
                    src: this.state.machine_image,
                    upload_path: this.state.upload_path,
                }),
                machine_status: this.state.machine_status,
                machine_spindle: this.state.machine_spindle,
                addby: this.state.addby,
                adddate: this.state.adddate,
                updateby: this.state.updateby,
                lastupdate: this.state.lastupdate,
            });

            if (res.require) {
                Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
                this.props.history.push("/settinganother/machine/machine");
            } else {
                Swal.fire("เกิดข้อผิดพลาด !", "", "error");
            }
        }
    }

    _checkSubmit() {
        if (this.state.machine_code === '') {
            Swal.fire({ title: "กรุณาระบุรหัสเครื่องจักร !", text: "Please Enter name", icon: "warning", })
            return false
        } else if (this.state.machine_name === '') {
            Swal.fire({ title: "กรุณาระบุชื่อรหัสเครื่องจักร  !", text: "Please Enter Full Name", icon: "warning", })
            return false
        } else {
            return true
        }
    }
    _handleImageChange(img_name, e) {
        if (e.target.files.length) {
            let file = new File([e.target.files[0]], e.target.files[0].name, { type: e.target.files[0].type, })

            if (file) {
                let reader = new FileReader()

                reader.onloadend = () => {
                    this.setState((state) => {
                        if (img_name === "machine_image") {
                            return {
                                machine_image: {
                                    src: reader.result,
                                    file: file,
                                    old: state.machine_image.old,
                                },
                            }
                        }
                    })
                }
                reader.readAsDataURL(file)
            }
        }
    }
    _inputdata = (e) => {

        if (this.state.title_modal === "ชื่อเครื่องจักร") {
            this.setState({
                machine_name: e,
            })
        }
        else if (this.state.title_modal === "รายละเอียด") {
            this.setState({
                machine_detail: e,
            })
        }
        else if (this.state.title_modal === "หัวจับเครื่องจักร") {
            this.setState({
                machine_spindle: e,
            })
        }

    }
    render() {

        const machine_type_options = this.state.machine_type.map((item) => ({
            value: item.machine_type_code, label: item.machine_type_name,

        }))
        const machine_brand_options = this.state.machine_brand.map((item) => ({
            value: item.machine_brand_code, label: item.machine_brand_name,

        }))
        const machine_model_options = this.state.machine_model.map((item) => ({
            value: item.machine_model_code,
            label: item.machine_model_name,

        }))
        const machine_status_options = [
            { value: "Active", label: "ทำงาน" },
            { value: "Inactive", label: "เลิกทำงาน" },

        ]

        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        <h3 className="text-header">เพิ่มเครื่องจักร / Add Machine</h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <label>รหัสเครื่องจักร <font color="#F00"><b>*</b></font></label>
                                    <Input
                                        type="text"
                                        value={this.state.machine_code}
                                        placeholder="รหัสเครื่องจักร"
                                        disabled
                                        onChange={(e) => this.setState({ machine_code: e.target.value })}

                                    />
                                    <p className="text-muted">Example : .</p>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>ชื่อเครื่องจักร <font color="#F00"><b>*</b></font></label>
                                        <Input
                                            type="text"
                                            value={this.state.machine_name}
                                            placeholder="ชื่อเครื่องจักร"
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อเครื่องจักร',
                                                data_modal: this.state.machine_name,
                                            })}
                                        />
                                        <p className="text-muted"> Example : .</p>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <label>รูปเครื่องจักร </label>
                                    <FormGroup className="text-center">
                                        <img style={{ maxWidth: 280 }} src={this.state.machine_image.src} alt="machine_image" />
                                    </FormGroup>
                                    <FormGroup className="text-center">
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) => this._handleImageChange("machine_image", e)}
                                        />
                                    </FormGroup>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>ประเภทเครื่องจักร <font color="#F00"><b>*</b></font></label>
                                        <Select
                                            options={machine_type_options}
                                            value={this.state.machine_type_code}
                                            onChange={(e) => {
                                                this.setState({ machine_type_code: e })
                                            }}
                                        // onClick={() => this.setState({
                                        //     show_modal: true,
                                        //     title_modal: 'ประเภทเครื่องจักร',
                                        //     data_modal: this.state.machine_type_code,
                                        // })}
                                        />
                                        <p className="text-muted">Example .</p>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>ยี่ห่อเครื่องจักร <font color="#F00"><b>*</b></font></label>
                                        <Select
                                            options={machine_brand_options}
                                            value={this.state.machine_brand_code}
                                            onChange={(e) => this.setState({ machine_brand_code: e })}
                                        />
                                        <p className="text-muted">Example : .</p>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>โมเดลเครื่องจักร <font color="#F00"><b>*</b></font></label>
                                        <Select
                                            options={machine_model_options}
                                            value={this.state.machine_model_code}
                                            onChange={(e) => {
                                                this.setState({ machine_model_code: e })
                                            }}
                                        />
                                        <p className="text-muted">Example : .</p>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>รายละเอียด</label>
                                        <Input
                                            type="textarea"
                                            rows={5}
                                            value={this.state.machine_detail}
                                            // onChange={(e) => this.setState({ machine_detail: e.target.value })}
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'รายละเอียด',
                                                data_modal: this.state.machine_detail,
                                            })}

                                        />
                                        <p className="text-muted">Example : .</p>

                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <label>สถานะ</label>
                                    <FormGroup>
                                        <Select
                                            options={machine_status_options}
                                            value={this.state.machine_status}
                                            onChange={(e) => {
                                                this.setState({ machine_status: e })
                                            }}
                                        />
                                        <p className="text-muted">Example : ทำงาน</p>
                                    </FormGroup>
                                </Col>
                                <Col md={2}>
                                    <FormGroup>
                                        <label>หัวจับเครื่องจักร</label>
                                        <Input
                                            type="text"
                                            value={this.state.machine_spindle}
                                            // onChange={(e) => this.setState({ machine_spindle: e.target.value })}
                                            placeholder="หัวจับเครื่องจักร"
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'หัวจับเครื่องจักร',
                                                data_modal: this.state.machine_spindle,
                                            })}

                                        />
                                        <p className="text-muted"> Example : 30x30 mm. </p>

                                    </FormGroup>
                                </Col>

                            </Row>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button type="submit" color="success">Save</Button>
                            <Button type="reset" color="danger">Reset</Button>
                            <Link to="/settinganother/machine/machine">
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