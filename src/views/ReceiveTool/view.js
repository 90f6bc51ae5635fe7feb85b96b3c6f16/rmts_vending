import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import socketIOClient from "socket.io-client";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Link } from 'react-router-dom'
import { Loading2 } from "../../component/revel-strap/";

import ReceiveToolModel from "../../models/ReceiveToolModel";
const receiveTool_Model = new ReceiveToolModel();



const endpoint = "http://localhost:7001";
var sum_command = [];
class ReceiveTool extends Component {
  constructor() {
    super();
    this.state = {
      iswait_micro: false,
      keyword: "",
      tool_qty_Add: "",
      tool_qty: "",
      tool_qty_In: "",
      compartments: [],
      event_button: "",
      class_number: "",
      compartment_number: "",
      statusMachice: "",
      status_DoorClose_Finish: false,
      sumToolQty: '',
      layoutName: "default",
      languageKeyboard: "english",
      input: "",
      current_display: "",
      teststate: '',
    };
  }
  componentDidMount = () => {
    this._socketSetup();
  };
  _searchCompartment = async () => {
    const { keyword } = this.state;
    const query_res = await receiveTool_Model.getProductByProductCodeAndName({ keyword })

    this.setState(
      {
        compartments: query_res.data,
        keyword: '',
      });
  };

  _onSelectOpToolUse = async (product_code) => {
    const stock = await receiveTool_Model.getStocklayoutByProductCode({ product_code })

    if (this.state.current_display === "") {
      this.setState({
        loading: false,
        current_display: "firstAddtool",
        stock: stock.data,
      });
    }
  };

  _onSelectStock = async (stock_x, stock_y, product_unit) => {
    sum_command = [];
    sum_command.push(stock_y, ",", stock_x);
    if (this.state.current_display === "firstAddtool") {
      this.setState({
        loading: false,
        current_display: "finishAddtool",
        tool_qty: product_unit,
      });
    }


  };

  async _updateData() {
    const tool_qty = this.state.tool_qty;
    const product_code = this.state.stock[0].product_code;
    await receiveTool_Model.updateProductUnitByProductCode({ product_code, tool_qty })
    alert("Success")
    this.setState({
      current_display: '',
      keyword: '',
      status_DoorClose_Finish: false,
      compartments: [],
    })
  }

  _sendMessage = ({ event_button, iswait_micro }) => {

    console.log("send.....", this.state.tool_qty_Add);

    if (this.state.tool_qty_Add !== "") {
      this.setState(
        {
          event_button,
          iswait_micro,
        },
        () => {
          const socket = socketIOClient(endpoint);
          socket.emit("connect-micro", event_button);
        }
      );
    }
  };

  _socketSetup() {
    const socket = socketIOClient(endpoint);
    socket.on("answer-micro", (messageNew) => {
      let messages = messageNew.split("-");
      if (messages[0] === "CC") {
        if (messages[1] === "RUNNING\r") {
          sum_command = [];
          this.setState({
            statusMachice: "RUNNING",
          });
        } else if (messages[1] === "FINISH\r") {
          this.setState({
            iswait_micro: false,
            statusMachice: "FINISH",
            current_display: "finishAddtool2",
            keyword: '',
          });
        }
        if (messages[1] === "DOORCLOSE\r") {
          this.setState({
            status_DoorClose_Finish: true,
          })
        }
      }
    });
  }

  _buttonTarget(class_number, compartment_number, tool_qty) {
    sum_command = [];
    sum_command.push(class_number, ",", compartment_number);

    this.setState({
      tool_qty: tool_qty,
      current_display: "firstAddtool",
      tool_qty_Add: '',
    });
  }

  _sumToolqty() {
    let tool_qty_In = this.state.tool_qty_In;
    let tool_qty_Add = this.state.tool_qty_Add;
    let tool_qty = parseInt(tool_qty_In, 10) + parseInt(tool_qty_Add, 10);
    this.setState({
      tool_qty: tool_qty,
    });

  }

  _languageKeyboard() {
    const { languageKeyboard } = this.state;
    if (languageKeyboard === "english") {
      return (<Keyboard
        layout={{
          default: ["Th 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
            "{tab} q w e r t y u i o p [ ] \\",
            "{lock} a s d f g h j k l ; ' {enter}",
            "{shift} z x c v b n m . - / {shift}",
            ".com @ {space}"],
          shift: ["Th ! @ # $ % ^ & * ) ( _ + {bksp}",
            "{tab} Q W E R T Y U I O P { } |",
            '{lock} A S D F G H J K L : " {enter}',
            "{shift} Z X C V B N M < > ? {shift}",
            ".com @ {space}"]
        }}
        layoutName={this.state.layoutName}
        onChange={this._onChange}
        onKeyPress={this._onKeyPress}
      />)
    }
    else if (languageKeyboard === "thai") {
      return (<Keyboard
        layout={{
          default: ["En ๅ / - ภ ถ ุ ึ ค ฅ จ ข ช {bksp}",
            "{tab} ๆ ไ ำ พ ะ ั ี ร น ย บ ล ฃ",
            "{lock} ฟ ห ก ด เ ้ ่ า ส ว ง {enter}",
            "{shift} ผ ป แ อ ิ ื ท ม ใ ฝ {shift}",
            ".com @ {space}"],
          shift: ["En + ๑ ๒ ๓ ๔ ู ฿ ๕ ๖ ๗ ๘ ๙ {bksp}",
            '{tab} ๐ " ฎ ฑ ธ ํ ๊ ณ ฯ ญ ฐ , ฅ',
            "{lock} ฤ ฆ ฏ โ ฌ ็ ๋ ษ ศ ซ . {enter}",
            "{shift} ( ) ฉ ฮ ฺ ์ ? ฒ ฬ ฦ {shift}", ".com @ {space}"]
        }}
        layoutName={this.state.layoutName}
        onChange={this._onChange}
        onKeyPress={this._onKeyPress}
      />)
    }
  }
  _onChange = input => {

    // if (this.state.current_display === "") {
    //   this.setState({
    //     keyword: input,
    //   });

    // }

  };

  _onKeyPress = button => {
    let keyword = this.state.keyword
    if (button === "{shift}" || button === "{lock}") this._handleShift();
    if (this.state.current_display === "finishAddtool") {
      if (button !== "backspace" && button !== "") {
        keyword += button
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
        tool_qty_Add: keyword
      })
    }
    else if (this.state.current_display === "finishAddtool2") {
      if (button !== "backspace" && button !== "") {
        keyword += button
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
        tool_qty_In: keyword
      })
      this._sumToolqty()
    }

    if (button === "Th") {
      this.setState({
        languageKeyboard: "thai",
      })
    }
    if (button === "En") {
      this.setState({
        languageKeyboard: "english",
      })
    }
    if (this.state.current_display === "") {
      if (button !== "{bksp}" && button !== "" && button !== "{enter}" && button !== "{shift}" && button !== "{lock}" && button !== "{tab}" && button !== "Th" && button !== "En") {
        keyword += button
      } else if (button === "{bksp}") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
      })
    }

  };

  _handleShift = () => {

    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });

  };

  _showDisplay() {
    const { current_display } = this.state;
    if (current_display === "") {

      return (
        <div className="container" >
          <h1 className="header">ReceiveTool</h1>
          <Row className="app-footer">
            <Col md={3}>
              <p style={{ textAlign: "right" }}>รหัสสินค้า/ชื่อสินค้า</p>
            </Col>
            <Col md={5}>
              <input
                type="text"
                className="form-control"
                width="500px"
                placeholder="รหัสสินค้า/ชื่อสินค้า"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={this.state.keyword}
              // onChange={(e) => this.setState({ keyword: e.target.value })}
              >
              </input>
            </Col>
            <Col md={4}>

              <button
                type="button"
                className="btn btn-primary"
                onClick={this._searchCompartment}>
                ค้นหา
              </button>
            </Col>
          </Row>
          <hr></hr>
          <div>
            {
              <div className="app-grid7">
                {this.state.compartments.map((item, idx) => (
                  <Col md={2}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '18rem' }}
                      onClick={() => this._onSelectOpToolUse(
                        item.product_code,
                      )}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <CardTitle>{item.product_code}</CardTitle>
                        <CardTitle>{item.product_name}</CardTitle>
                      </CardBody>
                    </Card>
                  </Col>
                ))}
              </div>
            }
          </div>
          <Row className="app-footer">
            <Col md={5} />
            <Col md={2}>
            </Col>
            <Col md={5} />
          </Row>
          <Row className="app-footer">
            <Col md={10}></Col>
            <Col md={2}>
              <Link to={`/`}>
                <button
                  className="btn btn-dark">
                  กลับไปหน้าหลัก
                  </button>
              </Link>
            </Col>
          </Row>
          <hr></hr>
          <Row>
            {this._languageKeyboard()}
          </Row>
        </div>
      );
    }
    else if (current_display === "firstAddtool") {
      return (
        <div className="container">
          {" "}
          <div className="app-grid7">
            {this.state.stock.map((item, idx) => (
              <Col md={2}>
                <Card
                  className="btn"
                  key={idx}
                  style={{ width: '18rem' }}
                  onClick={() => this._onSelectStock(
                    item.stock_x,
                    item.stock_y,
                    item.product_unit,
                  )}>
                  <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                  <CardBody>
                    <CardTitle>{item.stock_layout_code}</CardTitle>
                    <CardTitle>{item.product_name}</CardTitle>
                    <CardTitle>คงเหลือ {item.product_unit} ชิ้น</CardTitle>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </div>
          <Row className="app-footer">
            <Col md={5}></Col>
            <Col md={2}>
              <Row>
                <button
                  className="btn btn-secondary"
                  onClick={() =>
                    this.setState({
                      current_display: "",
                    })}>
                  ย้อนกลับ
                  </button>
              </Row>
            </Col>
            <Col md={5}></Col>
          </Row>
        </div>
      );
    }

    else if (current_display === "finishAddtool") {
      return (
        <div className="container">
          {this.state.iswait_micro ?
            (
              <Loading2 show={this.state.iswait_micro} />
            ) : (<div className="container">
              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>ชื่ออุปกรณ์</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}> {this.state.stock[0].product_name}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>ชื่อช่อง</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}> {this.state.stock[0].stock_layout_code}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนในช่อง</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}>{this.state.tool_qty}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>

              <Row className="app-footer">
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนเพิ่ม</p>
                </Col>
                <Col md={4}>
                  <input
                    style={{ textAlign: "center" }}
                    type="number"
                    className="form-control"
                    width="500px"
                    placeholder="จำนวนเพิ่ม"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.keyword}
                  // onChange={(e) => this.setState({ tool_qty_Takeout: e.target.value })}
                  >
                  </input>
                </Col>
                <Col md={4}>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      this._sendMessage({
                        event_button: sum_command,
                        iswait_micro: true,
                      })}>
                    เพิ่ม
                </button>
                </Col>
              </Row>
              <Row className="app-footer">
                <Col md={4}></Col>
                <Col md={4}>
                  <Row>
                    <Col md={12}>
                      <button
                        className="btn-secondary"
                        style={{ width: '100%' }}
                        onClick={() =>
                          this.setState({
                            current_display: "firstAddtool",
                          })}>
                        ย้อนกลับ
                      </button>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row className="app-footer">
                <Col md={4}></Col>
                <Col md={4}>
                  <Keyboard
                    layout={{
                      'default': [
                        '1 2 3',
                        '4 5 6',
                        '7 8 9',
                        ' 0 backspace'
                      ],
                    }}
                    onChange={this._onChange}
                    onKeyPress={this._onKeyPress}
                  />
                </Col>
                <Col md={4}></Col>
              </Row>
            </div>)}
        </div>
      );
    }
    else if (current_display === "finishAddtool2") {
      return (
        <div className="container">
          <Row className="app-footer">
            <Col md={4}>
              <p style={{ textAlign: "right" }}>จำนวนในช่อง</p>
            </Col>
            <Col md={4}>
              <input
                style={{ textAlign: "center" }}
                type="number"
                className="form-control"
                width="500px"
                placeholder="จำนวนในช่อง"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={this.state.keyword}
              />
            </Col>
          </Row>
          <Row className="app-footer">
            <Col md={4}>
              <p style={{ textAlign: "right" }}>คงเหลือ</p>
            </Col>
            <Col md={4}>
              <input
                style={{ textAlign: "center" }}
                type="number"
                className="form-control"
                width="500px"
                aria-label="Username"
                aria-describedby="basic-addon1"
                disabled
                value={this.state.tool_qty}
              />
            </Col>
          </Row>
          <Row className="app-footer">
            <Col md={4}></Col>
            <Col md={4}>
              <Row>
                <Col md={12}>
                  {this.state.tool_qty_In && this.state.status_DoorClose_Finish ? (
                    <button

                      className="btn btn-success"
                      style={{ width: '100%' }}
                      onClick={
                        () => this._updateData()
                      }
                    >
                      ตกลง
                    </button>
                  ) : (
                    <button
                      disabled
                      style={{ width: '100%' }}
                      className="btn btn-success">
                      ตกลง
                    </button>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="app-footer">
            <Col md={4}></Col>
            <Col md={4}>
              <Keyboard
                layout={{
                  'default': [
                    '1 2 3',
                    '4 5 6',
                    '7 8 9',
                    ' 0 backspace'
                  ],
                }}
                onKeyPress={this._onKeyPress}
              />
            </Col>
            <Col md={4}></Col>
          </Row>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="container">
        {this._showDisplay()}
      </div>
    );
  }
}

export default ReceiveTool;
