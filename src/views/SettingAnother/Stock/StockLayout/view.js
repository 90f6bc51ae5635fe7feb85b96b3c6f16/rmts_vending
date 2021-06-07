import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardHeader, } from "reactstrap";
import { Loading ,Select,} from "../../../../component/revel-strap";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2";
import StockLayoutModal from "./modal"
import SelectStockLayoutModal from "./modalselectstock"
import StockModel from "../../../../models/StockModel";
import StockLayoutModel from "../../../../models/StockLayoutModel";

const stock_model = new StockModel();
const stock_layout_model = new StockLayoutModel();

class View extends Component {
  constructor() {
    super();
    this.state = {
      show_modal: false,
      show_select_stock_modal: false,
      loading: true,
      stock_code: '',
      stocks: [],
      stock_ys: [],
      stock_layout_code: '',
      product_code: '',
      supplier_code: '',
      product_unit: '',
      product_name: '',
    };
  }

  componentDidMount = () => {
    this._fetchData();
  };

  _fetchData() {

    this.setState(
      {
        loading: true,
      },
      async () => {
        const { stock_code, } = this.state
        const stocks = await stock_model.getStock();
        this.setState({
          loading: false,
          stocks: stocks.data,
        });
      }
    );
  }

  _getStockLayout(stock_code) {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const stock_layouts = await stock_layout_model.getStockLayout({ stock_code });
        const stock_ys = []
        for (let stock_layout of stock_layouts.data) {
          let stock_y = stock_ys.find(val => val.stock_y === stock_layout.stock_y)
          if (stock_y) {
            stock_y.stock_layouts.push(stock_layout)
          } else {
            stock_ys.push({
              stock_y: stock_layout.stock_y,
              stock_layouts: [stock_layout],
            })
          }
        }

        stock_ys.forEach((stock_ys) => {
          stock_ys.stock_layouts.reverse()
        })

        this.setState({
          loading: false,
          stock_code,
          stock_ys,
        },
          () => console.log("stock_ys", this.state.stock_ys));
      });
  }

  _onselectstocklayout(product_name, stock_layout_qty) {

    this.setState({
      show_select_stock_modal: true,
      product_name: product_name,
      product_unit: stock_layout_qty,

    })

  }

  _addclass() {
    if (this.state.stock_code === '') {
      Swal.fire({ title: "กรุณาเลือกคลัง !", text: "Please Select stock", icon: "warning", })
      return false
    }
    else {
      this.setState({
        show_modal: true,
      })
    }
  }

  _onDeleteClass() {
    const stock_y = this.state.stock_ys[0].stock_y

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
          stock_layout_model.deleteStockLayoutByStockYCode({ stock_y }).then((res) => {

            if (res.require) {
              Swal.fire("Success Deleted!", "", "success");
              this._getStockLayout(this.state.stock_code)
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
    const stock_options = this.state.stocks.map((item) => ({
      value: item.stock_code,
      label: item.stock_name,
    }));

    return (
      <div>
        <Loading show={this.state.loading} />
        <Card>
          <CardHeader>แผนผังคลัง / Stock Layout</CardHeader>
          <CardHeader>
            <Row>
              <Col md={3}>
                <Select
                  options={stock_options}
                  value={this.state.stock_code}
                  onChange={(e) => this._getStockLayout(e)}
                />
              </Col>
              <Col md={7} />
              <button
                className="btn btn-success float-right"
                onClick={() => this._addclass()}
              >
                <i className="fa fa-plus" aria-hidden="true"></i> เพิ่มชั้น
            </button>
            </Row>
          </CardHeader>
          <CardBody>

            {this.state.stock_ys.map((stock_y, stock_y_idx) => (
              <div
                key={stock_y_idx}
                style={{ border: "1px solid #BEBEBE", background: '#EBFFE5', 'borderRadius': '4px', }}>
                <Row>
                  <Col className='col-md-1 align-items-center justify-content-center d-flex'
                    style={{ border: "1px solid #BEBEBE", background: '#EBFFE5', 'borderRadius': '4px', textAlign: "center", verticalAlign: 'center' }}>
                    <p>
                      {stock_y.stock_y}
                    </p>
                  </Col>
                  <Col md={10}>
                    <div>
                      {stock_y.stock_layouts.map((stock_layout, stock_layout_idx) => (
                        <button
                          key={stock_layout_idx}
                          style={stock_layout.stock_use == 0 ?
                            { margin: "15px", background: '#FFFFFF', border: "1px solid #BEBEBE", 'borderRadius': '4px', width: '114px', height: '179px' }
                            :
                            { margin: "15px", background: '#94FA92', border: "1px solid #BEBEBE", 'borderRadius': '4px', width: '114px', height: '179px' }}
                          onClick={() => this._onselectstocklayout(
                            stock_layout.product_name,
                            stock_layout.stock_layout_qty,
                          )}
                        >
                          <img style={{ width: "100px" }} src="https://source.unsplash.com/user/erondu/600x400" />
                          <p style={{ height: '30px' }}>
                            <br /><b>{stock_layout.stock_layout_code}</b><br />
                            {/* {stock_layout.product_name}<br />
                          {stock_layout.product_unit} */}
                          </p>
                        </button>
                      ))}
                    </div>
                  </Col>
                  <Col className='col-md-1 align-items-center justify-content-center d-flex'

                  >
                    {stock_y_idx == 0
                      ?
                      (<button
                        className="btn btn-danger"
                        onClick={() => this._onDeleteClass()}
                      >ลบฃั้น</button>) : (<div></div>)}</Col>
                </Row>
              </div>
            ))}

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
        <StockLayoutModal
          show={this.state.show_modal}
          stock_code={this.state.stock_code}
          onClose={() => this.setState({ show_modal: false }, () => this._getStockLayout(this.state.stock_code))}
        />
        <SelectStockLayoutModal
          show={this.state.show_select_stock_modal}
          product_unit={this.state.product_unit}
          product_name={this.state.product_name}
          onClose={() => this.setState({ show_select_stock_modal: false }, () => this._getStockLayout(this.state.stock_code))}
        />
      </div>
    );
  }
}

export default View;