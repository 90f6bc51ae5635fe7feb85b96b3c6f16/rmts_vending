import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Link } from 'react-router-dom'
import { Loading, Table } from "../../../../component/revel-strap";
import Swal from "sweetalert2";
import StockModel from "../../../../models/StockModel";


const stock_model = new StockModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      stock: [],
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
        const stock = await stock_model.getStock({ params: params, });

        this.setState({
          loading: false,
          stock,
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
          stock_model.deleteStockByCode({ stock_code: code }).then((res) => {

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
            คลัง / Stock

              <Link to={`/settinganother/stock/stock/insert`} className="btn btn-success float-right" >
              <i className="fa fa-plus" aria-hidden="true"></i> คลัง
              </Link>

          </CardHeader>
          <CardBody>
            <Table
              onChange={(e) => this._fetchData(e)}
              showRowNo={true}
              dataSource={this.state.stock.data}
              dataTotal={this.state.stock.total}
              rowKey="stock_code"
              columns={[
                {
                  title: "รหัสคลัง",
                  dataIndex: "stock_code",
                  filterAble: true,
                  ellipsis: true,
                  width: 240,
                },
                {
                  title: "ชื่อคลัง",
                  dataIndex: "stock_name",
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
                      <Link key="update" to={`/settinganother/stock/stock/update/${cell.stock_code}`} title="แก้ไขรายการ"  >
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
                        onClick={() => this._onDelete(cell.stock_code)}
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
            <Link to={`/settinganother/stock`}>
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