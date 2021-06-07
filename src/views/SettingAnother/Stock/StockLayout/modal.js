import React from 'react'
import {
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from 'reactstrap'
import Swal from "sweetalert2"
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

import StockLayoutModel from "../../../../models/StockLayoutModel";

const stock_layout_model = new StockLayoutModel();

class StockLayoutModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stock_code: '',
      stock_layout: '',
      class_number: '',
      compartment_number: '',
      compartment_width: '',
      compartment_length: '',
      compartment_height: '',
      title_input: '',
      keyword: '',
    }
  }

  componentDidUpdate(props_old) {
    if (props_old.show === false && this.props.show) {
      this._fetchData()
    }
  }

  _fetchData() {
    let stock_code = this.props.stock_code
    if (stock_code != '') {
      this.setState({ loading: true },
        async () => {
          const class_number = await stock_layout_model.generateClassByStockLayoutCode({ stock_code });

          if (class_number.require) {
            this.setState({
              loading: false,
              stock_code: stock_code,
              class_number: class_number.data
            });
          }
        }
      );
    }
  }

  _handleSave = async () => {
    const stock_code = this.state.stock_code
    const compartment_number = this.state.compartment_number
    const class_number = this.state.class_number
    const compartment_width = this.state.compartment_width
    const compartment_length = this.state.compartment_length
    const compartment_height = this.state.compartment_height
    if (this.state.compartment_number === '') {
      Swal.fire({ title: "กรุณาระบุช่องภายในชั้น !", text: "Please Enter name", icon: "warning", })
      return false
    } else if (this.state.compartment_width === '') {
      Swal.fire({ title: "กรุณาระบุความกว้างของช่อง !", text: "Please Enter width", icon: "warning", })
      return false
    } else if (this.state.compartment_length === '') {
      Swal.fire({ title: "กรุณาระบุความยาวของช่อง !", text: "Please Enter length", icon: "warning", })
      return false
    } else if (this.state.compartment_height === '') {
      Swal.fire({ title: "กรุณาระบุความสูงของช่อง !", text: "Please Enter height", icon: "warning", })
      return false
    }

    else {
      for (var i = 1; i <= compartment_number; i++) {
        if (i <= 9) {
          i = '0' + i
          let stock_layout_code = stock_code + "-" + class_number + "-" + i
          await stock_layout_model.insertStockLayoutCode({
            stock_layout_code: stock_layout_code,
            stock_code: stock_code,
            stock_x: i,
            stock_y: class_number,
            stock_z: 0,
            stock_use: 0,
            compartment_width: compartment_width,
            compartment_length: compartment_length,
            compartment_width: compartment_height,
          })
        }
        else {
          let stock_layout_code = stock_code + "-" + class_number + "-" + i
          await stock_layout_model.insertStockLayoutCode({
            stock_layout_code: stock_layout_code,
            stock_code: stock_code,
            stock_x: i,
            stock_y: class_number,
            stock_z: 0,
            stock_use: 0,
            compartment_width: compartment_width,
            compartment_length: compartment_length,
            compartment_width: compartment_height,
          })
        }

      }

      Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success", },
        this.setState({
          compartment_number: '',
          compartment_height: '',
          compartment_length: '',
          compartment_width: '',
        }, this.props.onClose()))
    }

  }
  _onKeyPress = button => {

    let keyword = this.state.keyword

    if (this.state.title_input === 'ช่องภายในชั้น') {
      if (button !== "backspace") {
        keyword += button
      }

      else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
      }, this.setState({
        compartment_number: keyword
      }))

    }
    else if (this.state.title_input === 'ความกว้างของช่อง') {
      if (button !== "backspace") {
        keyword += button
      }

      else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
      }, this.setState({
        compartment_width: keyword
      }))

    }

    else if (this.state.title_input === 'ความยาวของช่อง') {
      if (button !== "backspace") {
        keyword += button
      }

      else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
      }, this.setState({
        compartment_length: keyword
      }))

    }

    else if (this.state.title_input === 'ความสูงของช่อง') {
      if (button !== "backspace") {
        keyword += button
      }

      else if (button === "backspace") {
        keyword = keyword.substring(0, keyword.length - 1)
      }
      this.setState({
        keyword: keyword,
      }, this.setState({
        compartment_height: keyword
      }))

    }

  };
  _handleShift = () => {
    const layoutName = this.state.layoutName;
    this.setState({
      layoutName: layoutName === "default" ? "shift" : "default"
    });
  };

  _handleClose = () => {
    this.props.onClose()
    this.setState({
      compartment_number: '',
      compartment_width: '',
      compartment_length: '',
      compartment_height: '',
    })
  }
  render() {

    return (
      <Modal
        size="xl"
        centered
        isOpen={this.props.show}
        toggle={this._handleClose}
      >
        <ModalHeader toggle={this._handleClose}>
          เพิ่มชั้น
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md={2}>
              <label>จำนวนชั้นที่<font color="#F00"><b>*</b></font></label>
              <Input
                type="text"
                value={this.state.class_number}
                disabled
                onChange={(e) => this.setState({ class_number: e.target.value })}
                placeholder="จำนวนชั้น"
              />
              <p className="text-muted">Example : </p>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>ช่องภายในชั้น<font color="#F00"><b>*</b></font></label>
                <Input
                  type="number"
                  value={this.state.compartment_number}
                  // onChange={(e) => this.setState({ compartment_number: e.target.value })}
                  onClick={() => this.setState({
                    title_input: 'ช่องภายในชั้น',
                    keyword: '',
                  })}
                  placeholder="ช่องภายในชั้น"
                />
                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>ความกว้างของช่อง(Cm)<font color="#F00"><b>*</b></font></label>
                <Input
                  type="number"
                  value={this.state.compartment_width}
                  // onChange={(e) => this.setState({ compartment_width: e.target.value })}
                  placeholder="ความกว้างของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความกว้างของช่อง',
                    keyword: '',
                  })}
                />
                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>ความยาวของช่อง(Cm)<font color="#F00"><b>*</b></font></label>
                <Input
                  type="number"
                  value={this.state.compartment_length}
                  // onChange={(e) => this.setState({ compartment_length: e.target.value })}
                  placeholder="ความกว้างของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความยาวของช่อง',
                    keyword: '',
                  })}
                />
                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup>
                <label>ความสูงของช่อง(Cm)<font color="#F00"><b>*</b></font></label>
                <Input
                  type="number"
                  value={this.state.compartment_height}
                  // onChange={(e) => this.setState({ compartment_height: e.target.value })}
                  placeholder="ความสูงของช่อง"
                  onClick={() => this.setState({
                    title_input: 'ความสูงของช่อง',
                    keyword: '',
                  })}
                />
                <p className="text-muted"> Example :</p>
              </FormGroup>
            </Col>
            <Col className='col-md-2 align-items-center justify-content-center d-flex'>
              <button
                className="btn btn-success"
                onClick={() => this._handleSave()
                } >
                <i className="fa fa-plus" aria-hidden="true"></i> เพิ่ม
                </button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>


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
          <Col md={4} />
          <Col md={4} />

        </ModalFooter>

      </Modal>
    )
  }
}

export default StockLayoutModal