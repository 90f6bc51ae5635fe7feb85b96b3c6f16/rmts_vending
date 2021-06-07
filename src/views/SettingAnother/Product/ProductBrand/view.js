import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import ProductBrandModel from "../../../../models/ProductBrandModel";

const productbrand_model = new ProductBrandModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      productbrand: [],
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData(params = { pagination: { current: 1, pageSize: 20 } }) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const productbrand = await productbrand_model.getProductBrandBy({
          params: params,
        });

        this.setState({
          loading: false,
          productbrand: productbrand,
        });
      }
    );
  }

  _onDelete(code) {
    console.log(code);
    Swal.fire({
      title: "Are you sure ?",
      text: "Confirm to delete this item",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      
      if (result.value) {
        this.setState({
        // loading: true,
        }, () => {
          productbrand_model.deleteProductBrandByCode({ product_brand_code: code }).then((res) => {
            
            if (res.require) {
              Swal.fire("Success Deleted!", "", "success");
              this._fetchData();
            } else {
              this.setState({
                loading: false,
              }, () => {
                Swal.fire("Sorry, Someting worng !", "", "error");
              });
            }
          });
        });
      }
    });
  }

  render() {

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>
            จัดการแบนด์เครื่องมือ / Product Brand Management
       
              <Link to={`/settinganother/product/product-brand/insert`} className="btn btn-success float-right" >
                <i className="fa fa-plus" aria-hidden="true"></i>แบนด์เครื่องมือ
              </Link>
          
          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.productbrand.data}
              dataTotal={this.state.productbrand.total}
              rowKey="product_brand_code"
              columns={[
                {
                  title: "รหัสแบนด์เครื่องมือ",
                  dataIndex: "product_brand_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อแบนด์เครื่องมือ",
                  dataIndex: "product_brand_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                
                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [];

                      row_accessible.push(
                        <Link key="update" to={`/settinganother/product/product-brand/update/${cell.product_brand_code}`} title="แก้ไขรายการ"  >
                          <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info">
                          แก้ไข
                        </button>
                        </Link>
                      );
                 
                      row_accessible.push(
                        <button
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.product_brand_code)}
                      >
                        ลบ
                        </button>
                      );
                    

                    return row_accessible;
                  },
                  width: 80,
                },
              ]}
            />
          </CardBody>
        </Card>
        <Row className="app-footer">
          <Col md={10}></Col>
          <Col md={2}>
            <Link to={`/settinganother/product`}>
              <button
                className="btn btn-secondary">
                ย้อนกลับ
              </button>
            </Link>
          </Col>
        </Row>
      </div>
    );
  }
}

export default View;