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
  Label,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

import ProductGroupModel from "../../../../models/ProductGroupModel";
const productgroup_model = new ProductGroupModel()

class Update extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      show_modal: false,
      title_modal: '',
      data_modal: '',
      product_group_code: "",
      product_group_name: "",
    }
  }

  componentDidMount() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const { code } = this.props.match.params;

        const productgroup = await productgroup_model.getProductGroupByCode({
          product_group_code: code,
        });

        if (productgroup.require === false) {
          Swal.fire({
            title: "ข้อผิดพลาด !",
            text: "ไม่สามารถโหลดข้อมูล",
            icon: "error",
          });
          this.props.history.push("/product-group");
        } else if (productgroup.data.length === 0) {
          Swal.fire({
            title: "ไม่พบรายการนี้ในระบบ !",
            text: code,
            icon: "warning",
          });
          this.props.history.push("/product-group");
        } else {
          const { product_group_code, product_group_name } =
            productgroup.data[0];

          this.setState({
            loading: false,
            product_group_code: product_group_code,
            product_group_name: product_group_name,
          });
        }
      }
    );
  }


  async _handleSubmit(event) {
    event.preventDefault();

    if (this._checkSubmit()) {
      const res = await productgroup_model.updateProductGroupBy({
        product_group_code: this.state.product_group_code,
        product_group_name: this.state.product_group_name,
      });

      if (res.require) {
        Swal.fire("อัพเดตข้อมูลสำเร็จ !", "", "success");
        this.props.history.push("/settinganother/product/product-group");
      } else {
        Swal.fire("เกิดข้อผิดพลาด !", "", "error");
      }
    }
  }

  _checkSubmit() {
    if (this.state.product_group_code === '') {
      Swal.fire({ title: "กรุณาระบุรหัส !", text: "Please Enter name", icon: "warning", })
      return false
    } else if (this.state.product_group_name === '') {
      Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
      return false
    } else {
      return true
    }
  }

  _inputdata = (e) => {

    this.setState({
      product_group_name: e,
    })
  }

  render() {


    return (
      <div>
        <Card>
          <CardHeader>แก้ไขกลุ่มเครื่องมือ / Update Product Group</CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={4}>
                  <Label>
                    รหัสกลุ่มเครื่องมือ{" "}
                    <font color="#F00">
                      <b>*</b>
                    </font>
                  </Label>
                  <Input
                    type="text"
                    id="product_group_code"
                    name="product_group_code"
                    value={this.state.product_group_code}
                    placeholder="รหัสกลุ่มเครื่องมือ"
                    readOnly
                  />
                  <p className="text-muted">Example : </p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>
                      ชื่อกลุ่มเครื่องมือ{" "}
                      <font color="#F00">
                        <b>*</b>
                      </font>
                    </Label>
                    <Input
                      type="text"
                      id="product_group_name"
                      name="product_group_name"
                      value={this.state.product_group_name}
                      // onChange={(e) =>
                      //   this.setState({ product_group_name: e.target.value })
                      // }
                      placeholder="ชื่อกลุ่มเครื่องมือ"
                      onClick={() => this.setState({
                        show_modal: true,
                        title_modal: 'ชื่อกลุ่มเครื่องมือ',
                        data_modal: this.state.product_group_name,
                      })}
                    />
                    <p className="text-muted">Example : </p>
                  </FormGroup>
                </Col>
              </Row>
            </CardBody>
            <CardFooter className="text-right">
              <Button type="submit" color="success">Save</Button>
              <Button type="reset" color="danger">Reset</Button>
              <Link to="/settinganother/product/product-group">
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