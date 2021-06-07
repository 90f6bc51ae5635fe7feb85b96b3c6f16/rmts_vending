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

import StockModel from "../../../../models/StockModel";

const Stock_model = new StockModel();

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show_modal: false,
            title_modal: '',
            data_modal: '',
            stock_code: "",
            stock_name: "",
            remark: "",
        }
    }

    componentDidMount() {
        this.setState(
          {
            loading: true,
          },
          async () => {
            const { code } = this.props.match.params;
            const stock = await Stock_model.getStockByCode({ stock_code: code });
    
            if (stock.require === false) {
              Swal.fire({
                title: "ข้อผิดพลาด !",
                text: "ไม่สามารถโหลดข้อมูล",
                icon: "error",
              });
              this.props.history.push("/settinganother/stock/stock");
            } else if (stock.data.length === 0) {
              Swal.fire({
                title: "ไม่พบรายการนี้ในระบบ !",
                text: code,
                icon: "warning",
              });
              this.props.history.push("/stock");
            } else {
              const { stock_code, stock_name, remark } = stock.data[0];
    
              this.setState({
                loading: false,
                stock_code: stock_code,
                stock_name: stock_name,
                remark: remark,
              });
            }
          }
        );
      }

      async _handleSubmit(event) {
        event.preventDefault();
    
        if (this._checkSubmit()) {
          const res = await Stock_model.updateStock({
            stock_code: this.state.stock_code,
            stock_name: this.state.stock_name,
            remark: this.state.remark,
          });
    
          if (res.require) {
            Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
            this.props.history.push("/settinganother/stock/stock");
          } else {
            Swal.fire("เกิดข้อผิดพลาด !", "", "error");
          }
        }
      }

    _checkSubmit() {
        if (this.state.stock_code === "") {
            Swal.fire({
                title: "กรุณาระบุรหัส !",
                text: "Please Enter name",
                icon: "warning",
            });
            return false;
        } else if (this.state.stock_name === "") {
            Swal.fire({
                title: "กรุณาระบุชื่อ !",
                text: "Please Enter Full Name",
                icon: "warning",
            });
            return false;
        } else {
            return true;
        }
    }

    _inputdata = (e) => {
        if (this.state.title_modal === 'ชื่อคลัง') {
            this.setState({
                stock_name: e,
            })
        }
        else if (this.state.title_modal === 'คำอธิบาย') {
            this.setState({
                remark: e,
            })
        }
    }

    render() {


        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                    <h3 className="text-header">แก้ไขคลัง/ Edit Stock</h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <label>
                                        รหัสคลัง
                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Input
                                        readOnly
                                        type="text"
                                        value={this.state.stock_code}
                                        onChange={(e) =>
                                            this.setState({ stock_code: e.target.value })
                                        }
                                        placeholder="รหัสคลัง"
                                    />
                                    <p className="text-muted">Example : SC001</p>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>
                                            ชื่อคลัง
                          <font color="#F00">
                                                <b>*</b>
                                            </font>
                                        </label>
                                        <Input
                                            type="text"
                                            value={this.state.stock_name}
                                            placeholder="ชื่อคลัง"
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อคลัง',
                                                data_modal: this.state.stock_name,
                                            })}
                                        />
                                        <p className="text-muted"> Example :</p>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>คำอธิบาย</label>
                                        <Input
                                            type="text"
                                            value={this.state.remark}
                                            placeholder="คำอธิบาย"
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'คำอธิบาย',
                                                data_modal: this.state.remark,
                                            })}
                                        />
                                        <p className="text-muted"> Example :</p>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button type="submit" color="success">
                                Save
                  </Button>
                            <Button
                                type="reset"
                                color="danger"
                                onClick={() =>
                                    this.setState({
                                        stock_code: "",
                                        stock_name: "",
                                        remark: "",
                                    })
                                }
                            >
                                Reset
                  </Button>
                            <Link to="/settinganother/stock/stock">
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