import React from "react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    FormGroup,
    Row,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import GLOBAL from "../../../../GLOBAL"
import { Loading } from "../../../../component/revel-strap"

import ProductModel from "../../../../models/ProductModel";
import ProductSupplierModel from "../../../../models/ProductSupplierModel";



const product_model = new ProductModel();
const productsupplier_model = new ProductSupplierModel();

class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show_modal: false,
            title_modal: '',
            data_modal: '',
            product_code: "",
            product_name: "",
            product_image: {
                src: `${GLOBAL.BASE_URL.URL_IMG}default.png`,
                file: null,
                old: "",
            },
            product_unit: "",

            product_suppliers: [],
        }
    }

    componentDidMount() {
        this._fetchData();
      }

  async _fetchData() {
    const { code } = this.props.match.params;

    const product = await product_model.getProductByCode({
      product_code: code,
    });

    if (product.require === false) {
      Swal.fire({
        title: "ข้อผิดพลาด !",
        text: "ไม่สามารถโหลดข้อมูล",
        icon: "error",
      });
      this.props.history.push("/product");
    } else if (product.data.length === 0) {
      Swal.fire({
        title: "ไม่พบรายการนี้ในระบบ !",
        text: code,
        icon: "warning",
      });
      this.props.history.push("/product");
    } else {
      const {
        product_code,
        product_name,
        product_type_name,
        product_brand_name,
        product_group_name,
        product_image,
        product_unit,
      } = product.data[0];

      const productsupplier = await productsupplier_model.getProductSupplierBy({
        product_code,
      });
console.log(productsupplier);
      this.setState({
        loading: false,
        product_code,
        product_name,
        product_type_name,
        product_brand_name,
        product_group_name,
        product_image: {
          src: GLOBAL.BASE_URL.URL_IMG + product_image,
          name: product_image,
          file: null,
        },
        product_unit,
        product_suppliers: productsupplier.data,
      });
    }
  }

    render() {

        return (
            <div>
            <Loading show={this.state.loading} />
            <Card>
              <CardHeader>
                <h3 className="text-header">รายละเอียดสินค้า </h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md={8}>
                    <FormGroup>
                      <Row>
                        <Col md={4} className="d-flex">
                          <div style={{ paddingRight: 10, minWidth: 120 }}>
                            <b>รหัสสินค้า</b>
                          </div>
                          <div style={{ flex: 1 }}>{this.state.product_code}</div>
                        </Col>
                        <Col md={4} className="d-flex">
                          <div style={{ paddingRight: 10, minWidth: 120 }}>
                            <b>ชื่อสินค้า</b>
                          </div>
                          <div style={{ flex: 1 }}>{this.state.product_name}</div>
                        </Col>
                        <Col md={4} className="d-flex">
                          <div style={{ paddingRight: 10, minWidth: 120 }}>
                            <b>ยี่ห้อสินค้า</b>
                          </div>
                          <div style={{ flex: 1 }}>
                            {this.state.product_brand_name}
                          </div>
                        </Col>
                        <Col md={4} className="d-flex">
                          <div style={{ paddingRight: 10, minWidth: 120 }}>
                            <b>ประเภท</b>
                          </div>
                          <div style={{ flex: 1 }}>
                            {this.state.product_type_name}
                          </div>
                        </Col>
    
                        <Col md={4} className="d-flex">
                          <div style={{ paddingRight: 10, minWidth: 120 }}>
                            <b>กลุ่มสินค้า</b>
                          </div>
                          <div style={{ flex: 1 }}>
                            {this.state.product_group_name}
                          </div>
                        </Col>
                      </Row>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <label>รูปสินค้า </label>
                    <FormGroup className="text-center">
                      <img
                        style={{ maxWidth: "80%" }}
                        src={this.state.product_image.src}
                        alt="product_image"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <h5>ผู้ผลิตเครื่องมือ - ประกอบด้วย / Supplier Include</h5>
                    <table className="table table-sm table-bordered table-hover">
                      <thead>
                      <tr>
                  <th className="text-center" width={36}>ลำดับ </th>
                  <th className="text-center" width={240}>ผู้ขาย</th>
                  <th className="text-center" width={240}>ราคาซื้อ</th>
                  <th className="text-center" width={240}>จำนวน</th>
                  <th className="text-center" width={240}>เวลาจัดส่ง</th>
                  <th className="text-center" width={240}>หมายเหตุ</th>
                      </tr>
                      </thead>
                      <tbody>
                        {this.state.product_suppliers.map((item, idx) => (
                          <tr key={idx}>
                            <td className="text-center">{idx + 1}</td>
                            <td>{item.supplier_name}</td>
                            <td className="text-right">{item.how2buy_price}</td>
                            <td className="text-center">{item.how2buy_qty}</td>
                            <td className="text-center">{item.how2buy_leadtime}</td>
                            <td className="text-center">{item.how2buy_remark}</td>
    
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="text-right">
                <Link to="/settinganother/product/product">
                  <Button type="button">Back </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

        )
    }
}

export default Detail