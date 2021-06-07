import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import ProductGroupModel from "../../../../models/ProductGroupModel";

const productgroup_model = new ProductGroupModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      productgroup: [],
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
        const productgroup = await productgroup_model.getProductGroupBy({
          params: params,
        });

        this.setState({
          loading: false,
          productgroup: productgroup,
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
          loading: true,
        }, () => {
          productgroup_model.deleteProductGroupByCode({ product_group_code: code }).then((res) => {

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
            จัดการกลุ่มเครื่องมือ / Product Group Management

            <Link to={`/settinganother/product/product-group/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i> กลุ่มเครื่องมือ
            </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.productgroup.data}
              dataTotal={this.state.productgroup.total}
              rowKey="product_group_code"
              columns={[
                {
                  title: "รหัสกลุ่มเครื่องมือ",
                  dataIndex: "product_group_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อกลุ่มเครื่องมือ",
                  dataIndex: "product_group_name",
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
                      <Link key="update" to={`/settinganother/product/product-group/update/${cell.product_group_code}`} title="แก้ไขรายการ"  >
                        <button
                          style={{ width: "58.6px" }}
                          className="btn btn-info">
                          แก้ไข
                        </button>
                      </Link>
                    );


                    row_accessible.push(
                      // <i style={{ fontSize: "18px", color: "red", marginLeft: "5px" }} key="delete" type="button" onClick={() => this._onDelete(cell.product_group_code)} title="ลบรายการ" className="fa fa-remove" aria-hidden="true"></i>
                      <button
                        style={{ width: "58.6px" }}
                        className="btn btn-danger"
                        onClick={() => this._onDelete(cell.product_group_code)}
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