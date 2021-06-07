import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import GLOBAL from "../../../../GLOBAL"
import ProductModel from "../../../../models/ProductModel";

const product_model = new ProductModel();
class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      product: [],
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
        const product = await product_model.getProductBy({
          params: params,
        });

        this.setState({
          loading: false,
          product: product,
        });
      }
    );
  }

  _onDelete(code) {

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
          product_model.deleteProductByCode({ product_code: code }).then((res) => {

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
            จัดการเครื่องมือ / Product Management

              <Link to={`/settinganother/product/product/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i> เครื่องมือ
              </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.product.data}
              dataTotal={this.state.product.total}
              rowKey="product_code"
              columns={[
                {
                  title: "รหัสเครื่องมือ",
                  dataIndex: "product_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 150,
                },
                {
                  title: "ชื่อเครื่องมือ",
                  dataIndex: "product_name",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },

                {
                  title: "",
                  dataIndex: "",
                  render: (cell) => {
                    const row_accessible = [
                      <Link key="detail" to={`/settinganother/product/product/detail/${cell.product_code}`} title="รายละเอียด">
                        <button
                          // style={{ width: "58.6px" }}
                          className="btn btn-outline-secondary">
                          รายละเอียด
                        </button>
                      </Link>
                    ]



                    row_accessible.push(
                      <Link key="update" to={`/settinganother/product/product/update/${cell.product_code}`} title="แก้ไขรายการ"  >
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info">
                          แก้ไข
                        </button>
                      </Link>
                    );


                    row_accessible.push(
                      // <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.product_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
                      <button
                      style={{ width: "58.6px" }}
                      className="btn btn-danger"
                      onClick={() => this._onDelete(cell.product_code)}>
                        ลบ
                      </button>
                    );


                    return row_accessible;
                  },
                  width: 120,
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