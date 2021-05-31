import React, { Component } from "react";
import { Col, Row, Card, CardBody, CardImg, CardTitle, } from "reactstrap";
import socketIOClient from "socket.io-client";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Loading2 } from "../../component/revel-strap";
import { Link } from 'react-router-dom'
import Swal from "sweetalert2"

import TakeoutAssignJobModel from "../../models/TakeoutAssignJobModel";
const takeoutassignjob_Model = new TakeoutAssignJobModel();

const endpoint = "http://localhost:7001";
var sum_command = [];

class TakeoutTool extends Component {
  constructor() {
    super();
    this.state = {
      compartments: [],
      current_display: "",
      iswait_micro: false,
      is_assign_job: "",
      input: "",
      job_code: "",
      jobs: [],
      job_ops: [],
      job_op_machine: [],
      job_op_tool: [],
      job_op_tool_use: [],
      keyword: "",
      layoutName: "default",
      loading: true,
      ops: [],
      show_finish: false,
      status_DoorClose_Finish: false,
      stock: [],
      stock_layout_code: '',
      sumToolQty: 0,
      tool_qty: "",
      tool_qty_In: "",
      tool_qty_Takeout: "",
      type_job: "",
      languageKeyboard: "english",
      product_name: '',
      product_code: '',
    };
  }

  componentDidMount() {
    this._fetchData();
    this._socketSetup();
  }
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

        } else if (messages[1] === "FINISH\r" && this.state.current_display === "no-assign-firsttakeouttool") {
          this.setState({
            iswait_micro: false,
            statusMachice: "FINISH",
            current_display: "no-assign-finishtakeouttool",
            keyword: '',
          });

        }
        else if (messages[1] === "FINISH\r" && this.state.current_display === "assign-firsttakeouttool") {
          this.setState({
            iswait_micro: false,
            statusMachice: "FINISH",
            current_display: "assign-finishtakeouttool",
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

  _sendMessage = ({ event_button, iswait_micro }) => {

    if ((this.state.tool_qty_Takeout !== "") && (this.state.tool_qty >= this.state.tool_qty_Takeout)) {
      this.setState(
        {
          event_button,
          iswait_micro,
          show_finish: true,
        },
        () => {
          const socket = socketIOClient(endpoint);
          socket.emit("connect-micro", event_button);
        }
      );
    }
  };

  _buttonTarget(class_number, compartment_number, tool_qty) {
    sum_command = [];
    sum_command.push(class_number, ",", compartment_number);

    this.setState({
      tool_qty: tool_qty,
      current_display: "no-assign-firsttakeouttool",
    });
  }

  _sumToolqty() {
    let tool_qty_In = this.state.tool_qty_In;
    let tool_qty_Takeout = this.state.tool_qty_Takeout;
    let sum_ToolQty = parseInt(tool_qty_In, 10) - parseInt(tool_qty_Takeout, 10);

    this.setState({
      tool_qty: sum_ToolQty,
    });

  }
  _updateData() {
    const tool_qty = this.state.tool_qty;
    const product_code = this.state.product_code;
    const stock_layout_code = this.state.stock_layout_code;
    const stock_use = 1

    this.setState({
      loading: true,
    }, async () => {
      const res = await takeoutassignjob_Model.updateProductUnitByProductCode({
        product_code,
        tool_qty,
        stock_use,
        stock_layout_code,
      })

      if (res.require) {

        Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success", })
        this.props.history.push("/takeoutTool")
      } else {
        this.setState({
          loading: false,
        }, () => {
          Swal.fire({ title: "เกิดข้อผิดพลาดในการบันทึก !", icon: "error", })
        })
      }

    })

  }

  async _fetchData() {
    const jobs = await takeoutassignjob_Model.getJobBy()
    this.setState({
      jobs,
    })
  }
  _onSelectJob = async (job_code) => {
    const job_ops = await takeoutassignjob_Model.getJobOpByCode({ job_code })
    this.setState({
      loading: false,
      current_display: "job-op",
      job_ops,
    });
  };
  _onSelectOp = async (job_op_code) => {
    const job_op_machine = await takeoutassignjob_Model.getMachineByJobOpCode({ job_op_code })
    this.setState({
      loading: false,
      current_display: "job-op-machine",
      job_op_machine,
    })
  };

  _onSelectMachine = async (job_op_code) => {
    const job_op_tool = await takeoutassignjob_Model.getProcressByJobOpCode({ job_op_code })
    this.setState({
      loading: false,
      current_display: "job-op-machine-tool",
      job_op_tool,
    });
  };

  _onSelectOpTool = async (job_op_tool_code) => {

    const job_op_tool_use = await takeoutassignjob_Model.getToolUseByJobOpToolCode({ job_op_tool_code })
    this.setState({
      loading: false,
      current_display: "job-op-machine-tool-use",
      job_op_tool_use,
    });
  };
  _onSelectOpToolUse = async (product_code) => {
    const stock = await takeoutassignjob_Model.getStocklayoutByProductCode({ product_code })

    if (this.state.current_display === "job-op-machine-tool-use") {
      this.setState({
        loading: false,
        current_display: "job-op-machine-tool-use-stock",
        stock: stock.data,
      });
    }
    else if (this.state.current_display === "no-assign-job") {
      this.setState({
        loading: false,
        current_display: "no-assign-job2",
        stock: stock.data,
      });
    }
  };

  _onSelectStock = async (stock_x, stock_y, stock_layout_qty, stock_layout_code, product_name, product_code) => {
    sum_command = [];
    sum_command.push(stock_y, ",", stock_x);

    if (this.state.current_display === "job-op-machine-tool-use-stock") {
      this.setState({
        loading: false,
        current_display: "assign-firsttakeouttool",
        tool_qty: stock_layout_qty,
        stock_layout_code: stock_layout_code,
        product_name: product_name,
        product_code: product_code,
      });
    }

    if (this.state.current_display === "no-assign-job2") {
      this.setState({
        loading: false,
        current_display: "no-assign-firsttakeouttool",
        tool_qty: stock_layout_qty,
        stock_layout_code: stock_layout_code,
        product_name: product_name,
        product_code: product_code,
      });
    }


  };
  _searchCompartment = async () => {
    const { keyword } = this.state;
    const query_res = await takeoutassignjob_Model.getProductByProductCodeAndName({ keyword })
    this.setState(
      {
        compartments: query_res.data,
        keyword: '',
      });
  };
  _onChange = input => {

  };
  _onKeyPress = button => {
    let keyword = this.state.keyword
    if (button === "{shift}" || button === "{lock}") this._handleShift();
    if (this.state.current_display === "no-assign-firsttakeouttool" || this.state.current_display === "assign-firsttakeouttool") {
      if (button !== "backspace" && button !== "") {
        keyword += button
      } else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
        tool_qty_Takeout: keyword
      })
    }
    else if (this.state.current_display === "no-assign-finishtakeouttool" || this.state.current_display === "assign-finishtakeouttool") {
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
    if (this.state.current_display === "no-assign-job") {
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
  onChangeInput = event => {
    // const input = event.target.value;
    // this.setState({ input });
    // this.keyboard.setInput(input);
  };
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
  _showDisplay() {
    const { current_display } = this.state;
    if (current_display === "") { //หน้าเริ่มต้น
      return (
        <div>
          <h1 className="header">TakeoutTool</h1>
          <Row>
            <Col md={2} />
            <Col md={2}>
              <Card
                className="btn"
                style={{ width: '18rem' }}
                onClick={() =>
                  this.setState({
                    current_display: "assign-job",
                    is_assign_job: "assign-job",
                  })}>
                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                <CardBody>
                  <CardTitle>ระบุงาน</CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={2} />
            {/* <Col md={2}/> */}
            <Col md={2}>
              <Card
                className="btn"
                style={{ width: '18rem' }}
                onClick={() =>
                  this.setState({
                    current_display: "no-assign-job",
                    is_assign_job: "no-assign-job",
                  })}>
                <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                <CardBody>
                  <CardTitle>ไม่ระบุงาน</CardTitle>
                </CardBody>
              </Card>
            </Col>
            <Col md={2}></Col>
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
        </div>
      );
    } else if (current_display === "assign-job") { //หน้าเลือกงาน
      return (
        <p>
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.jobs.data.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectJob(item.job_code)}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '50px' }}>
                          <CardTitle>{item.job_code}</CardTitle>
                          <CardTitle>{item.job_name}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>
          <Row className="app-footer">
            <Col md={10}></Col>
            <Col md={2}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                ย้อนกลับ
                  </button>
            </Col>
          </Row>
        </p>
      );
    } else if (current_display === "job-op") { //หน้าเลือกOP
      return (
        <div className="container">
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.job_ops.data.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectOp(item.job_op_code)}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '50px' }}>
                          <CardTitle>{item.job_op_code}</CardTitle>
                          <CardTitle>{item.job_op_name}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>

          <Row className="app-footer">
            <Col md={9}></Col>
            <Col md={3}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "assign-job",
                  })}>
                ย้อนกลับ
                  </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                กลับไปหน้าแรก
                  </button>
            </Col>
          </Row>

        </div>
      );
    } else if (current_display === "job-op-machine") { //หน้าเลือกMachine
      return (
        <div className="container" >
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.job_op_machine.data.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectMachine(item.job_op_code)}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '50px' }}>
                          <CardTitle>{item.machine_code}</CardTitle>
                          <CardTitle>{item.machine_name}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>

          <Row className="app-footer">
            <Col md={9}></Col>
            <Col md={3}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "job-op",
                  })}>
                ย้อนกลับ
                  </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                กลับไปหน้าแรก
                  </button>
            </Col>
          </Row>

        </div>
      );
    } else if (current_display === "job-op-machine-tool") { //หน้าเลือกprocress
      return (
        <div className="container">
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.job_op_tool.data.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectOpTool(item.job_op_tools_code)}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '70px' }}>
                          <CardTitle>{item.job_op_tools_code}</CardTitle>
                          <CardTitle>{item.job_op_tools_name}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>

          <Row className="app-footer">
            <Col md={9}></Col>
            <Col md={3}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "job-op-machine",
                  })}>
                ย้อนกลับ
                  </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                กลับไปหน้าแรก
                  </button>
            </Col>
          </Row>

        </div>
      );
    } else if (current_display === "job-op-machine-tool-use") { //หน้าเลือกเครื่องมือที่ใช้
      return (
        <div className="container">
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.job_op_tool_use.data.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectOpToolUse(item.product_code)}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '50px' }}>
                          <CardTitle>{item.job_op_tools_use_code}</CardTitle>
                          <CardTitle>{item.product_name}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>

          <Row className="app-footer">
            <Col md={9}></Col>
            <Col md={3}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "job-op-machine-tool",
                  })}>
                ย้อนกลับ
                  </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                กลับไปหน้าแรก
                  </button>
            </Col>
          </Row>

        </div>
      );
    } else if (current_display === "job-op-machine-tool-use-stock") { //หน้าเลือกช่อง(stock)

      return (
        <div className="container">

          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.stock.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectStock(
                        item.stock_x,
                        item.stock_y,
                        item.stock_layout_qty,
                        item.stock_layout_code,
                        item.product_name,
                        item.product_code,
                      )}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '70px' }}>
                          <CardTitle>{item.stock_layout_code}</CardTitle>
                          <CardTitle>{item.product_name}</CardTitle>
                          <CardTitle>คงเหลือ {item.stock_layout_qty}</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>

          <Row className="app-footer">
            <Col md={9}></Col>
            <Col md={3}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "job-op-machine-tool-use",
                  })}>
                ย้อนกลับ
                  </button>
              <button
                className="btn btn-dark"
                onClick={() =>
                  this.setState({
                    current_display: "",
                  })}>
                กลับไปหน้าแรก
                  </button>
            </Col>
          </Row>
        </div>
      );
    } else if (current_display === "assign-firsttakeouttool") { //หน้าเบิกแบบระบุงาน หน้าแรก
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
                  <p style={{ textAlign: "center" }}> {this.state.product_name}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>ชื่อช่อง</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}> {this.state.stock_layout_code}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนที่สามารมเบิกได้</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}>{this.state.tool_qty}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>
              <Row className="app-footer">
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนเบิก</p>
                </Col>
                <Col md={4}>
                  <input
                    style={{ textAlign: "center" }}
                    type="number"
                    className="form-control"
                    width="500px"
                    placeholder="จำนวนเบิก"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.keyword}>
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
                    เบิก
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
                            current_display: "job-op-machine-tool-use-stock",
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
    } else if (current_display === "assign-finishtakeouttool") { //หน้าเบิกแบบระบุงาน หน้าสุดท้าย
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
    } else if (current_display === "no-assign-job") { //หน้าไม่ระบุงานหน้าค้นหา
      return (
        <div className="container" >
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
              <CardBody>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
                  {this.state.compartments.map((item, idx) => (
                    <Row>
                      <Col md={10}>
                        <Card
                          className="btn"
                          key={idx}
                          style={{ width: '11rem', margin: "7px" }}
                          onClick={() => this._onSelectOpToolUse(
                            item.product_code,
                          )}>
                          <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                          <CardBody>
                            <p style={{ height: '50px' }}>
                              <CardTitle>{item.product_code}</CardTitle>
                              <CardTitle>{item.product_name}</CardTitle>
                            </p>
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                </div>
              </CardBody>
            }
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
          <hr></hr>
          <Row>
            {this._languageKeyboard()}
          </Row>
        </div>
      );
    } else if (current_display === "no-assign-job2") { //หน้าเลือกงาน2--เลือกstock

      return (
        <div className="container">
          <CardBody>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto auto auto " }}>
              {this.state.stock.map((item, idx) => (
                <Row>
                  <Col md={10}>
                    <Card
                      className="btn"
                      key={idx}
                      style={{ width: '11rem', margin: "7px" }}
                      onClick={() => this._onSelectStock(
                        item.stock_x,
                        item.stock_y,
                        item.stock_layout_qty,
                        item.stock_layout_code,
                        item.product_name,
                        item.product_code,
                      )}>
                      <CardImg variant="top" src="https://source.unsplash.com/user/erondu/600x400" />
                      <CardBody>
                        <p style={{ height: '70px' }}>
                          <CardTitle>{item.stock_layout_code}</CardTitle>
                          <CardTitle>{item.product_name}</CardTitle>
                          <CardTitle>คงเหลือ {item.stock_layout_qty} ชิ้น</CardTitle>
                        </p>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              ))}
            </div>
          </CardBody>
          <Row className="app-footer">
            <Col md={10}></Col>
            <Col md={2}>
              <button
                className="btn btn-secondary"
                onClick={() =>
                  this.setState({
                    current_display: "no-assign-job",
                  })}>
                ย้อนกลับ
                  </button>
            </Col>
          </Row>
        </div>
      );
    } else if (current_display === "no-assign-firsttakeouttool") {// หน้าเบิกแบบไม่ระบุงาน หน้าแรก

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
                  <p style={{ textAlign: "center" }}> {this.state.product_name}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>ชื่อช่อง</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}> {this.state.stock_layout_code}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนที่สามารมเบิกได้</p>
                </Col>
                <Col md={4}>
                  <p style={{ textAlign: "center" }}>{this.state.tool_qty}</p>
                </Col>
                <Col md={4}>
                </Col>
              </Row>
              <Row className="app-footer">
                <Col md={4}>
                  <p style={{ textAlign: "right" }}>จำนวนเบิก</p>
                </Col>
                <Col md={4}>
                  <input
                    style={{ textAlign: "center" }}
                    type="number"
                    className="form-control"
                    width="500px"
                    placeholder="จำนวนเบิก"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={this.state.keyword}

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
                    เบิก
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
                            current_display: "no-assign-job2",
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
    } else if (current_display === "no-assign-finishtakeouttool") {// หน้าเบิกแบบไม่ระบุงาน

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

export default TakeoutTool;
