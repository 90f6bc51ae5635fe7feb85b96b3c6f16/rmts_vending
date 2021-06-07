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

import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

class ModalKeyboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: '',
            title_modal: '',
            layoutName: "default",
            languageKeyboard: "english",
        }
    }

    componentDidUpdate(props_old) {
        if (props_old.show === false && this.props.show) {
            this._fetchData()
        }
    }

    _fetchData() {
        let title_modal = this.props.title_modal
        let data_modal
        if (this.props.data_modal) {
            data_modal = this.props.data_modal
        }
        else {
            data_modal = '';
        }

        this.setState({ loading: true },
            async () => {

                this.setState({
                    loading: false,
                    keyword: data_modal,
                    title_modal: title_modal,
                });

            }
        );
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
                // onChange={this._onChange}
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
                // onChange={this._onChange}
                onKeyPress={this._onKeyPress}
            />)
        }
    }
    _onKeyPress = button => {
        let keyword = this.state.keyword.toString()
        let space = " "
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

        if (button !== "{bksp}" && button !== "" && button !== "{enter}" && button !== "{space}" && button !== "{shift}" && button !== "{lock}" && button !== "{tab}" && button !== "Th" && button !== "En") {
            keyword += button
        }

        else if (button === "{bksp}") {
            keyword = keyword.substring(0, keyword.length - 1)
        }
        else if (button === "{space}") {
            keyword += space
        }
        this.setState({
            keyword: keyword,
        })


    };
    _handleShift = () => {
        const layoutName = this.state.layoutName;
        this.setState({
            layoutName: layoutName === "default" ? "shift" : "default"
        });
    };
    _handleSave = () => {
        const keyword = this.state.keyword
        this.props.onSave(keyword)
        this.props.onClose()
    }

    _handleClose = () => this.props.onClose()
    render() {
        return (
            <Modal
                size="xl"
                centered
                isOpen={this.props.show}
                toggle={this._handleClose}>
                <ModalHeader toggle={this._handleClose}>
                    <label>{this.state.title_modal}</label>
                </ModalHeader>
                <ModalBody>
                    <Row>

                        <Col>
                            <FormGroup>
                                <Input
                                    type="text"
                                    value={this.state.keyword}
                                // onChange={(e) => this.setState({ product_unit: e.target.value })} 
                                />
                                <button
                                    className="btn btn-success"
                                    onClick={() => this._handleSave()}
                                >save
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => this.setState({
                                        keyword: '',
                                    })}
                                >Reset
                                </button>
                            </FormGroup>
                        </Col>

                    </Row>

                </ModalBody>
                <ModalFooter>

                    {this._languageKeyboard()}

                </ModalFooter>
            </Modal >
        )
    }
}

export default ModalKeyboard