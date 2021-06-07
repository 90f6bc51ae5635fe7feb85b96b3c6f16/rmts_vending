import React from "react"
import {
  Input,
} from "reactstrap"

import { Select } from "../../../../../component/revel-strap"


import SupplierModel from "../../../../../models/SupplierModel"
import ProductSupplierModel from "../../../../../models/ProductSupplierModel"
import ModalKeyboardNumPad from "../../../../../component/modals/ModalKeyboardNumPad"


const product_supplier_model = new ProductSupplierModel()
const supplier_model = new SupplierModel()

class ManageProductSupplier extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      show_modal: false,
      title_modal: '',
      data_modal: '',
      supplier_code: "",
      product_suppliers: [],
      supplier: [],
      layoutName: '',
    }
  }

  componentDidMount() {
    this._getsupplier()
  }

  async _getsupplier() {
    const supplier = await supplier_model.getSupplierBy()
    this.setState({
      supplier: supplier.data
    })
  }

  componentDidUpdate(props_old) {
    if (props_old.product_code === '' && this.props.product_code) {
      this._fetchData()
    }
  }

  async _fetchData() {
    const { product_code } = this.props

    if (product_code) {
      const product_suppliers = await product_supplier_model.getProductSupplierBy({ product_code })

      this.setState({
        product_suppliers: product_suppliers.data,
      }, () => {
        this._refreshData()
      })
    }
  }

  _handleRequestSupplier = async (keyword, page, maxResults) => {
    // console.log("keyword", keyword)

    const supplier = await supplier_model.getSupplierBy({
      keyword: keyword,
      params: { pagination: { current: page, pageSize: maxResults } },
    })

    // console.log("supplier", supplier)

    return {
      options: supplier.data.map(item => ({ key: `${item.supplier_code} - ${item.supplier_name}`, item: item, })),
      total: supplier.total,
    }
  }

  _addRow() {
    this.setState(state => {
      return {
        product_suppliers: [
          ...state.product_suppliers, {
            product_supplier_code: '',
            supplier_code: '',
            supplier_name: '',
            how2buy_price: '',
            how2buy_qty: '',
            how2buy_leadtime: '',
            how2buy_remark: ''
          }
        ],
      }
    })
  }

  _deleteRow(idx) {
    this.setState((state) => {
      state.product_suppliers.splice(idx, 1)

      return {
        product_suppliers: state.product_suppliers,
      }
    }, () => {
      this._refreshData()
    })
  }

  _handleListSupplier = (data, idx) => {
    this.setState(state => {
      if (data.length === 0) {
        state.product_suppliers[idx].supplier_code = ''
        state.product_suppliers[idx].supplier_name = ''
      } else {
        const { supplier_code, supplier_name, } = data[0].item

        if (state.product_suppliers[idx].supplier_code !== supplier_code) {
          state.product_suppliers[idx].supplier_code = supplier_code
          state.product_suppliers[idx].supplier_name = supplier_name
        }
      }

      return {
        product_suppliers: state.product_suppliers,
      }
    }, () => {
      this._refreshData()
    })

  }

  _handleListChange = (name, e, idx) => {
    console.log("name", name);

    console.log("_handleListChange", e);

    // const { value } = e.target

    let { product_suppliers } = this.state
    product_suppliers[idx][name] = e

    this.setState({
      product_suppliers: product_suppliers
    }, () => {
      this._refreshData()
    })

  }

  _refreshData() {
    this.props.onRefresh({
      product_suppliers: this.state.product_suppliers,
    })
  }

  _onSelect(value, idx) {
    let product_suppliers = this.state.product_suppliers
    let supplier = this.state.supplier

    product_suppliers.map((item, index) => {
      if (index === idx) {
        let sup_val = supplier.find(item => item.supplier_code == value)
        item.supplier_code = value
        item.supplier_name = sup_val.supplier_name
      }
    })

    this.setState({
      product_suppliers: product_suppliers
    })
  }


  _inputdata = (e, idx) => {
    if (this.state.title_modal === "ราคาซื้อ") {
      this._handleListChange('how2buy_price', e, idx)
    }
    else if (this.state.title_modal === "จำนวน") {
      this._handleListChange('how2buy_qty', e, idx)
    }
    else if (this.state.title_modal === "เวลาจัดส่ง") {
      this._handleListChange('how2buy_leadtime', e, idx)
    }
    else if (this.state.title_modal === "คำอธิบาย") {
      this._handleListChange('how2buy_remark', e, idx)
    }
  }

  render() {
    const supplier_options = this.state.supplier.map((item) => ({
      value: item.supplier_code, label: item.supplier_name

    }))

    return (
      <div>
        <h5>ผู้ขาย </h5>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th className="text-center" width={36}>ลำดับ </th>
              <th className="text-center" width={240}>ผู้ขาย</th>
              <th className="text-center" width={240}>ราคาซื้อ</th>
              <th className="text-center" width={240}>จำนวน</th>
              <th className="text-center" width={240}>เวลาจัดส่ง</th>
              <th className="text-center" width={240}>หมายเหตุ</th>
              <th className="text-center" width={48}></th>

            </tr>
          </thead>
          <tbody>
            {this.state.product_suppliers.map((item, idx) => (
              <tr key={idx}>
                <td className="align-middle text-center">{idx + 1}</td>
                <td>
                  <Select
                    options={supplier_options}
                    value={item.supplier_code}
                    onChange={(e) => {
                      this._onSelect(e, idx)
                    }}
                  />

                  {/* < AsyncTypeahead
                    value={item.supplier_code}
                    // defaultSelected={(item.supplier_code ? `${item.supplier_code} - ${item.supplier_name}` : '')}
                    defaultSelected={item.supplier_code}
                    onChange={(e) => this._handleListSupplier(e, idx)}
                    handleRequestItem={this._handleRequestSupplier}
                    placeholder="ค้นหาผู้ขาย..."
                    showValid={true}
                    useCache={false}
                  /> */}
                </td>
                <td
                  onClick={() => this.setState({
                    show_modal: true,
                    title_modal: 'ราคาซื้อ',
                    data_modal: item.how2buy_price,
                    idx: idx,
                    layoutName: "numpadfloat",
                  })}
                >
                  <Input
                    type="text"
                    className="float text-right"
                    value={item.how2buy_price}
                    placeholder="ราคาซื้อ"
                    required
                  />

                </td>
                <td
                  onClick={() => this.setState({
                    show_modal: true,
                    title_modal: 'จำนวน',
                    data_modal: item.how2buy_qty,
                    idx: idx,
                    layoutName: "default",
                  })}
                >

                  <Input
                    type="text"
                    className="float text-right"
                    value={item.how2buy_qty}
                    placeholder="จำนวน"
                    required
                  />
                </td>
                <td
                  onClick={() => this.setState({
                    show_modal: true,
                    title_modal: 'เวลาจัดส่ง',
                    data_modal: item.how2buy_leadtime,
                    idx: idx,
                    layoutName: "default",
                  })}
                >
                  <Input
                    type="text"
                    className="float text-right"
                    value={item.how2buy_leadtime}
                    placeholder="เวลาจัดส่ง"
                    required
                  />
                </td>
                <td
                  onClick={() => this.setState({
                    show_modal: true,
                    title_modal: 'คำอธิบาย',
                    data_modal: item.how2buy_remark,
                    idx: idx,
                    layoutName: "keyboard",
                  })}
                >
                  <Input
                    type="textarea"
                    className=" text"
                    value={item.how2buy_remark}
                    onChange={(e) => this._handleListChange('how2buy_remark', e, idx)}
                    placeholder="คำอธิบาย"
                    required
                  />
                </td>
                <td className="text-center">
                  <button type="button" className="icon-button color-danger container center" onClick={() => this._deleteRow(idx)} title="ลบรายการ">
                    <i className="fa fa-times-circle fa-2x" aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="7" align="center">
                <span className="text-button" onClick={() => this._addRow()}>
                  <i className="fa fa-plus" aria-hidden="true" /> เพิ่มรายการ
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
        <ModalKeyboardNumPad
          show={this.state.show_modal}
          data_modal={this.state.data_modal}
          title_modal={this.state.title_modal}
          idx={this.state.idx}
          layoutName={this.state.layoutName}
          onSave={this._inputdata}
          onClose={() => this.setState({ show_modal: false })}
        />

      </div>


    )
  }
}

export default ManageProductSupplier