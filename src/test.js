import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import socketIOClient from "socket.io-client";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import { Loading2 } from "../../component/revel-strap/";

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
    const query_res = [
      {
        compartment_code: "00000-0001",
        class_number: "1",
        compartment_number: "10",
        tool_code: "A10",
        tool_name: "Drill",
        tool_qty: "10",
      },
      {
        compartment_code: "00000-0002",
        class_number: "1",
        compartment_number: "12",
        tool_code: "A12",
        tool_name: "Drill",
        tool_qty: "15",
      },
      {
        compartment_code: "00000-0003",
        class_number: "1",
        compartment_number: "13",
        tool_code: "A13",
        tool_name: "Hammer",
        tool_qty: "25",
      },
      {
        compartment_code: "00000-0004",
        class_number: "4",
        compartment_number: "4",
        tool_code: "D04",
        tool_name: "Hammer",
        tool_qty: "50",
      },
      {
        compartment_code: "00000-0005",
        class_number: "3",
        compartment_number: "7",
        tool_code: "C07",
        tool_name: "X-Hammer",
        tool_qty: "150",
      },
      {
        compartment_code: "00000-0006",
        class_number: "5",
        compartment_number: "1",
        tool_code: "E01",
        tool_name: "X-Hammer",
        tool_qty: "199",
      },
      {
        compartment_code: "00000-0006",
        class_number: "6",
        compartment_number: "2",
        tool_code: "F02",
        tool_name: "X-Hammer",
        tool_qty: "210",
      },
    ];

    const compartments = query_res.filter(
      (val) =>
        val.tool_code.includes(keyword) || val.tool_name.includes(keyword)
    );

    this.setState({
      compartments,
      keyword: '',
    });

  };

  _sendMessage = ({ event_button, iswait_micro }) => {
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
            current_display: "finishAddtool",
            keyword: '',
          });
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
    let sum_ToolQty = parseInt(tool_qty_In, 10) + parseInt(tool_qty_Add, 10);
    this.setState({
      sumToolQty: sum_ToolQty,
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
    console.log("button", button);
    let keyword = this.state.keyword
    if (button === "{shift}" || button === "{lock}") this._handleShift();
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
        keyword,
      })
    }
    if (this.state.current_display === "firstAddtool") {
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
    if (this.state.current_display === "finishAddtool") {
      if (button !== "backspace" && button !== "") {
        keyword += button
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
        tool_qty_In: keyword
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
        <div>
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
                onChange={(input) => this._onChange(input.target.value)}
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
          <Row>
            <div className="container">
              <h3 style={{ textAlign: "center" }}>ช่อง</h3>
              <div className="app-grid7">
                {this.state.compartments.map((item, idx) => (
                  <button
                    key={idx}
                    className="app-button_CC"
                    onClick={() =>
                      this._buttonTarget(
                        item.class_number,
                        item.compartment_number,
                        item.tool_qty
                      )
                    }
                  >
                    <p>{item.tool_code}</p>
                    <p>{item.tool_name}</p>
                  </button>
                ))}
              </div>
            </div>
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
          {this.state.iswait_micro ?
            (
              <Loading2 show={this.state.iswait_micro} />
            )
            :
            (
              <div>

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
                      value={this.state.tool_qty_Add}
                      onChange={
                        (e) => this.setState({
                          tool_qty_Add: e.target.value,
                        })
                      }>
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
                    <Keyboard
                      layout={{
                        'default': [
                          '1 2 3',
                          '4 5 6',
                          '7 8 9',
                          ' 0 backspace'
                        ],
                      }}
                      onChange={(this._onChange)}
                      onKeyPress={this._onKeyPress}
                    />
                  </Col>
                  <Col md={4}></Col>
                </Row>
              </div>
            )}
        </div>
      );
    }
    else if (current_display === "finishAddtool") {
      return (
        <div>
          <Row className="app-footer">
            <Col md={4}>
              <p style={{ textAlign: "right" }}>จำนวนในช่อง</p>
            </Col>
            <Col md={4}>
              <input
                style={{ textAlign: "center" }}
                id="tool_qty_In"
                type="text"
                className="form-control"
                width="500px"
                placeholder="จำนวนในช่อง"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={this.state.keyword}
                onChange={(e) =>
                  this.setState({ tool_qty_In: e.target.value })
                }>
              </input>
            </Col>
            <Col md={4}></Col>
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
                value={this.state.sumToolQty}
              >
              </input>
            </Col>
          </Row>
          <Row className="app-footer">
            <Col md={3}></Col>
            <Col md={6}>
              <Row>
                <Col md={4}></Col>
                <Col md={4}>
                  {this.state.tool_qty_In ? (
                    <button
                      className="btn btn-success"
                      onClick={() => this._sumToolqty()}
                    >
                      ตกลง
                    </button>
                  ) : (
                    <button disabled className="btn btn-success">
                      ตกลง
                    </button>
                  )}
                </Col>
                <Col md={4}>
                  <button
                    className="btn btn-secondary"
                    onClick={() =>
                      this.setState({
                        current_display: '',
                        sumToolQty: '',
                        tool_qty_In: '',
                        keyword: '',
                        compartments: [],
                      })}>
                    ย้อนกลับ
                    </button>
                </Col>
                <Col md={4}></Col>
              </Row>
            </Col>
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
