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
import StockLayoutModel from "../../../../models/StockLayoutModel";

const stock_layout_model = new StockLayoutModel();


class SelectStockLayoutModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            product_unit: '',
            product_name: '',
        }
    }

    componentDidUpdate(props_old) {
        if (props_old.show === false && this.props.show) {
            this._fetchData()
        }
    }

    _fetchData() {

        let product_unit = this.props.product_unit
        let product_name = this.props.product_name

        this.setState({ loading: true },
            async () => {

                this.setState({
                    loading: false,
                    product_unit: product_unit,
                    product_name: product_name,
                });

            }
        );
    }

    _handleClose = () => {
        this.props.onClose()
        this.setState({
            product_unit: '',
            product_name: '',
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
                    รายละเอียด
        </ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <label>ชื่อสินค้า</label>
                            <Input
                                type="text"
                                value={this.state.product_name}
                                disabled
                                onChange={(e) => this.setState({ product_name: e.target.value })}
                            />
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <label>จำนวนสินค้า</label>
                                <Input
                                    type="text"
                                    value={this.state.product_unit}
                                    disabled
                                    onChange={(e) => this.setState({ product_unit: e.target.value })}
                                />
                            </FormGroup>
                        </Col>

                    </Row>

                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        )
    }
}

export default SelectStockLayoutModal