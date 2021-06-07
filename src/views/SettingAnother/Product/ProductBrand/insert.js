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
import ProductBrandModel from "../../../../models/ProductBrandModel";
const productbrand_model = new ProductBrandModel()

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
            product_brand_code: '',
            product_brand_name: '',
          
        }
    }

    componentDidMount() {
        this._fetchData()
    }

    async _fetchData() {
        const now = new Date()
        const last_code = await productbrand_model.generateProductBrandLastCode({
          code: `PBC${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}`,
          digit: 3,
        })
   
       this.setState({
         loading: false,
         
         product_brand_code: last_code.data,
       })
     }
   

     _handleSubmit(event) {
        event.preventDefault()
    
        if (this._checkSubmit()) {
          this.setState({
            loading: true,
          }, async () => {
            const res = await productbrand_model.insertProductBrand({
                product_brand_code: this.state.product_brand_code,
                product_brand_name: this.state.product_brand_name,
             
              
            })
    
            if (res.require) {
              
              Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success", })
              this.props.history.push("/settinganother/product/product-brand")
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
        if (this.state.product_brand_code === '') {
          Swal.fire({ title: "กรุณาระบุรหัส !", text: "Please Enter name", icon: "warning", })
          return false
        } else if (this.state.product_brand_name === '') {
          Swal.fire({ title: "กรุณาระบุชื่อ !", text: "Please Enter Full Name", icon: "warning", })
          return false
        } else {
          return true
        }
      }

    _inputdata = (e) => {
        this.setState({
            product_brand_name: e,
        })
    }

    render() {


        return (
            <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            <h3 className="text-header">เพิ่ม / Add Product Brand</h3>
          </CardHeader>
          <Form onSubmit={(event) => this._handleSubmit(event)}>
            <CardBody>
              <Row>
                <Col md={4}>
                  <label>รหัสผู้แบนด์เครื่องมือ <font color="#F00"><b>*</b></font></label>
                  <Input
                    type="text"
                    value={this.state.product_brand_code}
                    readOnly
                    onChange={(e) => this.setState({ product_brand_code: e.target.value })}
                    placeholder="รหัสแบนด์เครื่องมือ"
                  />
                  <p className="text-muted">Example :</p>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label>ชื่อแบนด์เครื่องมือ <font color="#F00"><b>*</b></font></label>
                    <Input
                      type="text"
                      value={this.state.product_brand_name}
                      placeholder="ชื่อแบนด์เครื่องมือ"
                      onClick={() => this.setState({
                        show_modal: true,
                        title_modal: 'ชื่อแบนด์เครื่องมือ',
                        data_modal: this.state.product_brand_name,
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
              <Link to="/settinganother/product/product-brand">
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