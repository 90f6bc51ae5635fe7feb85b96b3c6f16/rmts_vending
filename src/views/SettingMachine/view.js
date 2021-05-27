import React, { Component } from "react";
import socketIOClient from "socket.io-client";
// import "./App.css";
// import { HashRouter, Route, Switch } from "react-router-dom";

const endpoint = "http://localhost:7001";
let count = 0;
var x;
var sum_command = [];

class SettingMachine extends Component {
  constructor() {
    super();

    this.state = {
      input: "",
      restart_status: "",
      ans_restart_status: "",
      ans_ready_status: "",
      ans_water_lever: "",
      ans_check_balance: [],
      show_gx: "",
      show_gy: "",
      show_gz: "",
      event_button: "",
      balance_status: "",
      input_class: "",
      input_compartment: "",
      command_order: [],
      key_response: "",
      data_respone: [],
    };
  }

  componentDidMount = () => {
    this._socketSetup();
  };

  componentWillUnmount = () => {
    clearTimeout(x);
  };

  // เมื่อมีการส่งข้อมูลไปยัง server
  _sendMessage = ({ event_button }) => {
    this.setState(
      {
        event_button,
      },
      () => {
        const socket = socketIOClient(endpoint);

        socket.emit("connect-micro", event_button);
      }
    );
  };

  // รอรับข้อมูลเมื่อ server มีการ update
  _socketSetup() {
    const socket = socketIOClient(endpoint);

    socket.on("answer-micro", (messageNew) => {
      console.log(messageNew);
      let messages = messageNew.split("-");

      if (messages[0] === "RE") {
        this.setState({
          ans_restart_status: messages[1],
        });
      } else if (messages[0] === "CR") {
        this.setState({
          ans_ready_status: messages[1],
        });
      } else if (messages[0] === "CW") {
        this.setState({
          ans_water_lever: messages[1],
        });
      } else if (messages[0] === "CC") {
        this.setState({
          command_order: messages[1],
        });
        sum_command = [];
      } else if (messages[0] === "CB") {
        let messages_CB = messages[1].split(",");

        this.setState({
          event_button: "",
          show_gx: messages_CB[0],
          show_gy: messages_CB[1],
          show_gz: messages_CB[2],
        });
      }
    });
  }

  _Loop_500ms() {
    const _send = this._sendMessage;
    count++;

    if (count === 1) {
      x = setInterval(function () {
        _send({ event_button: "CHECKBALANCE" });
      }, 1000);

      if (
        this.state.show_gx === 30 + -10 &&
        this.state.show_gy === 5 + -10 &&
        this.state.show_gy === 120 + -10
      ) {
        this.setState({
          balance_status: "BALANCE",
        });
      } else {
        this.setState({
          balance_status: "NOTBALANCE",
        });
      }
    } else if (count > 1) {
      clearTimeout(x);
      count = 0;
      this.setState({
        show_gx: "",
        show_gy: "",
        show_gz: "",
        balance_status: "",
        data_respone: "",
        event_button: "",
      });
    }
  }

  _command_order() {
    if (this.state.input_class !== "" && this.state.input_compartment !== "") {
      sum_command.push(
        this.state.input_class,
        ",",
        this.state.input_compartment
      );
      this._sendMessage({
        event_button: sum_command,
        input_class: "",
        input_compartment: "",
        data_respone: "",
        show_gx: "",
        show_gy: "",
        show_gz: "",
      });
    }
  }

  render() {
    const { input_compartment, input_class } = this.state;
    return (
      <div className="app">
        <div className="app-boxoutside">
          <div className="app-boxinside">
            <div className="app-grid1">
              <button
                className="app-button"
                onClick={() => this._sendMessage({ event_button: "RESTART" })}
              >
                เริ่มต้นใหม่
              </button>
              <input
                className="app-input"
                type="text"
                id="input_statusrestart"
                disabled
                value={this.state.ans_restart_status}
              ></input>
            </div>
            <div className="app-grid1">
              <button
                className="app-button"
                onClick={() =>
                  this._sendMessage({ event_button: "CHECKREADY" })
                }
              >
                ตรวจสอบความพร้อม
              </button>
              <input
                className="app-input"
                type="text"
                disabled
                value={this.state.ans_ready_status}
              ></input>
            </div>
            <div className="app-grid1">
              <button
                className="app-button"
                onClick={() =>
                  this._sendMessage({ event_button: "CHECKWATERLEVEL" })
                }
              >
                ตรวจสอบระดับ
              </button>
              <input
                className="app-input"
                disabled
                value={this.state.ans_water_lever}
              ></input>
            </div>
            <div className="app-grid4">
              <button className="app-button" onClick={() => this._Loop_500ms()}>
                ปรับระดับ/ยกเลิก
              </button>
              <p className="app-alltext">X :</p>
              <input
                className="app-inputxyz"
                disabled
                value={this.state.show_gx}
              ></input>
              <p className="app-alltext">Y :</p>
              <input
                className="app-inputxyz"
                disabled
                value={this.state.show_gy}
              ></input>
              <p className="app-alltext">Z :</p>
              <input
                className="app-inputxyz"
                disabled
                value={this.state.show_gz}
              ></input>
              <p className="app-alltext">STATUS :</p>
              <input
                className="app-inputxyz"
                disabled
                value={this.state.balance_status}
              ></input>
            </div>
          </div>

          <div className="app-headertext">สั่งเปิด</div>
          <div className="app-boxinside2">
            <div className="app-grid2">
              <p className="app-alltext">ชั้น</p>
              <input
                className="app-inputclass"
                value={input_class}
                onChange={(e) => this.setState({ input_class: e.target.value })}
              ></input>
              <p className="app-alltext">ช่อง</p>
              <input
                className="app-inputclass"
                value={input_compartment}
                onChange={(e) =>
                  this.setState({ input_compartment: e.target.value })
                }
              ></input>
              <button
                className="app-button"
                onClick={() => this._command_order()}
              >
                สั่งงาน
              </button>
            </div>
            <div className="app-grid3">
              <input
                className="app-inputlast"
                disabled
                value={this.state.command_order}
              ></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingMachine;
