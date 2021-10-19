import { Form, Input, InputNumber, Button } from "antd";
import { useState, useEffect } from "react";
import CloseButton from "./buttons/CloseButton";

const ProductForm = (props) => {
    const [product, setProduct] = useState({ ...props.product });
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        setProduct({ ...props.product });
        setEdit(false);
    }, [props.product]);

    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 20,
        },
    };

    return (
        <Form {...layout}>
            <Form.Item />
            <CloseButton closeAction={props.closeAction} />
            {!edit && !props.addProduct && (
                <>
                    <Form.Item label="Item Name:">
                        <div className="form-text">{product.name}</div>
                    </Form.Item>
                    <Form.Item label="Price:">
                        <div className="form-text">{product.price}</div>
                    </Form.Item>
                    <Form.Item label="Quantity:">
                        <div className="form-text">{product.quantity}</div>
                    </Form.Item>
                    <Form.Item
                        label="Description:"
                        style={{ display: "flex", flexWrap: "wrap" }}
                    >
                        <div
                            className="form-text"
                            style={{
                                height: 150,
                                paddingTop: 5,
                                overflowY: "scroll",
                                maxWidth: "100%",
                                wordWrap: "break-word",
                            }}
                        >
                            {product.description}
                        </div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 2 }}>
                        <Button
                            className="general-btn"
                            block
                            onClick={() => setEdit(true)}
                        >
                            Edit Details
                        </Button>
                    </Form.Item>
                    <Form.Item />
                </>
            )}
            {(edit || props.addProduct) && (
                <>
                    <Form.Item label="Item Name:">
                        <Input
                            placeholder={product.name}
                            onChange={(e) =>
                                setProduct({ ...product, name: e.target.value })
                            }
                        />
                    </Form.Item>
                    <Form.Item label="Fee:">
                        <InputNumber
                            onChange={(e) =>
                                setProduct({ ...product, price: e })
                            }
                            min={0}
                            placeholder={product.price}
                        />
                    </Form.Item>
                    <Form.Item label="Quantity:">
                        <InputNumber
                            onChange={(e) =>
                                setProduct({ ...product, quantity: e })
                            }
                            min={0}
                            placeholder={product.quantity}
                        />
                    </Form.Item>
                    <Form.Item label="Description:">
                        <Input.TextArea
                            placeholder={product.description}
                            style={{ height: 150 }}
                            onChange={(e) =>
                                setProduct({
                                    ...product,
                                    description: e.target.value,
                                })
                            }
                        />
                    </Form.Item>
                    {props.addProduct && !props.showProductDetails && (
                        <Form.Item
                            wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                        >
                            <Button
                                className="general-btn"
                                type="primary"
                                block
                                onClick={() => {
                                    props.createProductAction(product);
                                }}
                            >
                                Create
                            </Button>
                        </Form.Item>
                    )}
                    {!props.addProduct && props.showProductDetails && (
                        <>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button
                                    className="general-btn"
                                    type="primary"
                                    block
                                    onClick={() =>
                                        props.updateProductAction(product)
                                    }
                                >
                                    Update
                                </Button>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{ ...layout.wrapperCol, offset: 2 }}
                            >
                                <Button
                                    className="general-btn"
                                    danger
                                    block
                                    onClick={() =>
                                        props.deleteProductAction(product._id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </>
            )}
        </Form>
    );
};

export default ProductForm;
