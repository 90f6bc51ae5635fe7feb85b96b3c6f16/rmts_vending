import React from "react"
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Form,
    FormGroup,
    Input,
    Row,
    Label,
} from "reactstrap"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"
import GLOBAL from "../../../../GLOBAL"
import { Select, Loading } from "../../../../component/revel-strap"
import { BaseServerFile } from "../../../../utils"
import ProductModel from "../../../../models/ProductModel";
import ProductGroupModel from "../../../../models/ProductGroupModel";
import ProductBrandModel from "../../../../models/ProductBrandModel";
import ManageProductSupplier from "../Product/selection/productsupplier";
import ProductTypeModel from "../../../../models/ProductTypeModel";
import ProductSupplierModel from "../../../../models/ProductSupplierModel";
import Modalkeyboard from "../../../../component/modals/ModalKeyboard"

const base_server_file = new BaseServerFile()
const productgroup_model = new ProductGroupModel();
const productbrand_model = new ProductBrandModel();
const producttype_model = new ProductTypeModel();
const product_model = new ProductModel();
const productsupplier_model = new ProductSupplierModel();

class Insert extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            show_modal: false,
            title_modal: '',
            data_modal: '',
            produts: [],
            product_code: "",
            product_name: "",
            product_image: {
                src: `${GLOBAL.BASE_URL.URL_IMG}default.png`,
                file: null,
                old: "",
            },

            product_type_code: "",
            product_brand_code: "",
            product_group_code: "",
            product_qty: "",
            addby: "",
            adddate: "",
            update: "",
            lastupdate: "",
            product_group: [],
            product_type: [],
            product_brand: [],
            product_suppliers: [],
            product_supplier_validate: { status: "VALID", text: "" },
            supplier_code: "",
            price: "",
            upload_path: "product/",
        }
    }

    componentDidMount() {
        this._fetchData()
    }

    async _fetchData() {
        const now = new Date();

        const last_code = await product_model.getProductLastCode({
            code: `PDC${now.getFullYear()}${(now.getMonth() + 1)
                .toString()
                .padStart(2, "0")}`,
            digit: 3,
        });
        const last_how2buycode =
            await productsupplier_model.getProductSupplierLastCode({
                code: `H2C${now.getFullYear()}${(now.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}`,
                digit: 3,
            });
        const productgroup = await productgroup_model.getProductGroupBy();
        const producttype = await producttype_model.getProductTypeBy();
        const productbrand = await productbrand_model.getProductBrandBy();

        this.setState({
            loading: false,

            product_code: last_code.data,
            product_group: productgroup.data,
            product_type: producttype.data,
            product_brand: productbrand.data,
            how2buy: last_how2buycode.data,
        });
    }


    _handleSubmit(event) {
        event.preventDefault();

        if (this._checkSubmit()) {
            this.setState(
                {
                    loading: true,
                },
                async () => {
                    const res = await product_model.insertProduct({
                        product_code: this.state.product_code,
                        product_name: this.state.product_name,
                        product_image: await base_server_file.uploadFile({
                            src: this.state.product_image,
                            upload_path: this.state.upload_path,
                        }),
                        product_qty: this.state.product_qty,
                        product_type_code: this.state.product_type_code,
                        product_brand_code: this.state.product_brand_code,
                        product_group_code: this.state.product_group_code,
                        product_suppliers: this.state.product_suppliers.map(item => ({
                            how2buy_code: this.state.how2buy_code,
                            supplier_code: item.supplier_code,
                            product_code: this.state.product_code,
                            how2buy_qty: item.how2buy_qty.toString().replace(new RegExp(',', 'g'), ''),
                            how2buy_price: item.how2buy_price.toString().replace(new RegExp(',', 'g'), ''),
                            how2buy_leadtime: item.how2buy_leadtime.toString().replace(new RegExp(',', 'g'), ''),
                            how2buy_remark: item.how2buy_remark.toString().replace(new RegExp(',', 'g'), ''),

                        })),

                        addby: "",
                        adddate: "",

                    })

                    if (res.require) {
                        Swal.fire({ title: "บันทึกข้อมูลสำเร็จ !", icon: "success" });
                        this.props.history.push("/settinganother/product/product");
                    } else {
                        this.setState(
                            {
                                loading: false,
                            },
                            () => {
                                Swal.fire({
                                    title: "เกิดข้อผิดพลาดในการบันทึก !",
                                    icon: "error",
                                });
                            }
                        );
                    }
                }
            );
        }
    }

    _checkSubmit() {
        if (this.state.product_name === "") {
            Swal.fire({
                title: "กรุณาระบุชื่อเครื่องมือ !",
                text: "Please Enter name",
                icon: "warning",
            });
            return false;
        } else if (this.state.product_group_code === "") {
            Swal.fire({
                title: "กรุณาระบุกลุ่มเครื่องมือ !",
                text: "Please Enter Group Name",
                icon: "warning",
            });
            return false;
        } else if (this.state.product_type_code === "") {
            Swal.fire({
                title: "กรุณาระบุประเภทเครื่องมือ !",
                text: "Please Enter Type Name",
                icon: "warning",
            });
            return false;
        } else if (this.state.product_brand_code === "") {
            Swal.fire({
                title: "กรุณาระบุยี่ห้อเครื่องมือ !",
                text: "Please Enter Brand Name",
                icon: "warning",
            });
            return false;
        }


        else {
            return true;
        }
    }

    _handleImageChange(img_name, e) {
        console.log(e);
        if (e.target.files.length) {
            let file = new File([e.target.files[0]], e.target.files[0].name, {
                type: e.target.files[0].type,
            });

            if (file) {
                let reader = new FileReader();

                reader.onloadend = () => {
                    this.setState((state) => {
                        if (img_name === "product_image") {
                            return {
                                product_image: {
                                    src: reader.result,
                                    file: file,
                                    old: state.product_image.old,
                                },
                            };
                        }
                    });
                };
                reader.readAsDataURL(file);
            }
        }
    }
    _inputdata = (e) => {
        if (this.state.title_modal === "ชื่อสินค้า") {
            this.setState({
                product_name: e,
            })
        }
        else if (this.state.title_modal === "รายละเอียด") {
            this.setState({
                machine_detail: e,
            })
        }
        else if (this.state.title_modal === "หัวจับเครื่องจักร") {
            this.setState({
                machine_spindle: e,
            })
        }
    }

    render() {
        const product_group_option = this.state.product_group.map((item) => ({
            value: item.product_group_code,
            label: item.product_group_name,
        }));
        const product_type_option = this.state.product_type.map((item) => ({
            value: item.product_type_code,
            label: item.product_type_name,
        }));
        const product_brand_option = this.state.product_brand.map((item) => ({
            value: item.product_brand_code,
            label: item.product_brand_name,
        }));

        return (
            <div>
                <Loading show={this.state.loading} />
                <Card>
                    <CardHeader>
                        <h3 className="text-header">เพิ่มสินค้า / Add product</h3>
                    </CardHeader>
                    <Form onSubmit={(event) => this._handleSubmit(event)}>
                        <CardBody>
                            <Row>
                                <Col md={3}>
                                    <label>
                                        รหัสสินค้า{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Input
                                        type="text"
                                        value={this.state.product_code}
                                        onChange={(e) =>
                                            this.setState({ product_code: e.target.value })
                                        }
                                        readOnly
                                        placeholder="รหัสสินค้า"
                                    />
                                    <p className="text-muted">Example : SP01.</p>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <label>
                                            ชื่อสินค้า{" "}
                                            <font color="#F00">
                                                <b>*</b>
                                            </font>
                                        </label>
                                        <Input
                                            type="text"
                                            placeholder="ชื่อสินค้า"
                                            value={this.state.product_name}
                                            // onChange={(e) =>
                                            //     this.setState({ product_name: e.target.value })
                                            // }
                                            onClick={() => this.setState({
                                                show_modal: true,
                                                title_modal: 'ชื่อสินค้า',
                                                data_modal: this.state.product_name,
                                            })}
                                            
                                        />
                                        <p className="text-muted">
                                            {" "}
                                                Example : บริษัท เรเวลซอฟต์ จำกัด.
                                        </p>
                                    </FormGroup>
                                </Col>
                                <Col md={3}></Col>
                                <Col md={3}>
                                    <label>รูปสินค้า </label>
                                    <FormGroup className="text-center">
                                        <img
                                            style={{ maxWidth: 280 }}
                                            src={this.state.product_image.src}
                                            alt="product_image"
                                        />
                                    </FormGroup>

                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <label>
                                        กลุ่มเครื่องมือ{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Select
                                        options={product_group_option}
                                        value={this.state.product_group_code}
                                        onChange={(e) => {
                                            this.setState({ product_group_code: e });
                                        }}
                                    />
                                    <p className="text-muted">Example : SP01.</p>
                                </Col>
                                <Col md={3}>
                                    <label>
                                        ประเภทเครื่องมือ{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Select
                                        options={product_type_option}
                                        value={this.state.product_type_code}
                                        onChange={(e) => {
                                            this.setState({ product_type_code: e });
                                        }}
                                    />
                                    <p className="text-muted">Example : SP01.</p>
                                </Col>
                                <Col></Col>
                                <Col>
                                    <Label></Label>
                                    <FormGroup className="text-center">
                                        <Input
                                            type="file"
                                            accept="image/png, image/jpeg"
                                            onChange={(e) =>
                                                this._handleImageChange("product_image", e)
                                            }
                                        />
                                    </FormGroup></Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <label>
                                        แบนด์เครื่องมือ{" "}
                                        <font color="#F00">
                                            <b>*</b>
                                        </font>
                                    </label>
                                    <Select
                                        options={product_brand_option}
                                        value={this.state.product_brand_code}
                                        onChange={(e) => {
                                            this.setState({ product_brand_code: e });
                                        }}
                                    />
                                    <p className="text-muted">Example : SP01.</p>
                                </Col>
                                <Col md={3}>


                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <ManageProductSupplier
                                        onRefresh={({
                                            product_supplier_validate,
                                            product_suppliers,
                                        }) =>
                                            this.setState({
                                                product_supplier_validate,
                                                product_suppliers,
                                            })
                                        }
                                    />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter className="text-right">
                            <Button type="submit" color="success">
                                Save
              </Button>
                            <Button type="reset" color="danger">
                                Reset
              </Button>
                            <Link to="/settinganother/product/product">
                                <Button type="button">Back</Button>
                            </Link>
                        </CardFooter>
                    </Form>
                </Card>
                <Modalkeyboard
                    show={this.state.show_modal}
                    data_modal={this.state.data_modal}
                    title_modal={this.state.title_modal}
                    onSave={this._inputdata}
                    onClose={() => this.setState({ show_modal: false })}
                />
            </div>

        )
    }
}

export default Insert