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

import ProductTypeModel from "../../../../models/ProductTypeModel";

import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

const producttype_model = new ProductTypeModel();

class Update extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show_modal: false,
            title_modal: '',
            data_modal: '',
            product_type_code: '',
            product_type_name: '',
        }
    }

    componentDidMount() {
        this.setState(
          {
            loading: true,
          },
          async () => {
            const { code } = this.props.match.params;
    
            const producttype = await producttype_model.getProductTypeByCode({
              product_type_code: code,
            });
    
            if (producttype.require === false) {
              Swal.fire({
                title: "ข้อผิดพลาด !",
                text: "ไม่สามารถโหลดข้อมูล",
                icon: "error",
              });
              this.props.history.push("/product-type");
            } else if (producttype.data.length === 0) {
              Swal.fire({
                title: "ไม่พบรายการนี้ในระบบ !",
                text: code,
                icon: "warning",
              });
              this.props.history.push("/product-type");
            } else {
              const { product_type_code, product_type_name } = producttype.data[0];
    
              this.setState({
                loading: false,
                product_type_code: product_type_code,
                product_type_name: product_type_name,
              });
            }
          }
        );
      }


      async _handleSubmit(event) {
        event.preventDefault();
    
        if (this._checkSubmit()) {
          const res = await producttype_model.updateProductTypeBy({
            product_type_code: this.state.product_type_code,
            product_type_name: this.state.product_type_name,
          });
    
          if (res.require) {
            Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
            this.props.history.push("/settinganother/product/product-type");
          } else {
            Swal.fire("เกิดข้อผิดพลาด !", "", "error");
          }
        }
      }

    _checkSubmit() {
        if (this.state.product_type_code === '') {
            Swal.fire({ title: "กรุณาระบุรหัส !", text: "Please Enter name", icon: "warning", })
            return false
        } else if (this.state.product_type_name === '') {
            Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
            return false
        } else {
            return true
        }
    }

    _inputdata = (e) => {
   
            this.setState({
                product_type_name: e,
            })
     

    }

    render() {


        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        <h3 className="text-header">แก้ไขประเภทเครื่องมือ / Update Product Type</h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={4}>
                                    <label>รหัสประเภทเครื่องมือ <font color="#F00"><b>*</b></font></label>
                                    <Input
                                        type="text"
                                        value={this.state.product_type_code}
                                        readOnly
                                        onChange={(e) => this.setState({ product_type_code: e.target.value })}
                                        placeholder="รหัสประเภทเครื่องมือ"
                                    />
                                    <p className="text-muted">Example : </p>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label>ชื่อประเภทเครื่องมือ <font color="#F00"><b>*</b></font></label>
                                        <Input
                                            type="text"
                                            value={this.state.product_type_name}
                                            placeholder="ชื่อประเภทเครื่องมือ"
                                            // onChange={(e) => this.setState({ product_type_name: e.target.value })}
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อประเภทเครื่องมือ',
                                                data_modal: this.state.product_type_name,
                                              })}
                                        />
                                        <p className="text-muted"> Example :</p>
                                    </FormGroup>
                                </Col>

                            </Row>

                        </CardBody>
                        <CardFooter className="text-right">
                            <Button type="submit" color="success">Save</Button>
                            <Button type="reset" color="danger">Reset</Button>
                            <Link to="/settinganother/product/product-type">
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