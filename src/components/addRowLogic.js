import React from "react";
const RowLogic = props => {
    return props.data.map((val, idx) => {
        let itemName = `itemName-${idx}`,
            quantity = `quantity-${idx}`,
            pricePerUnit = `pricePerUnit-${idx}`,
            totalPrice = `totalPrice-${idx}`
        return (
            <div className="form-row" key={val.index}>
                <div className="col">
                    <label>Item Name</label>
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Item name"
                        name="itemName"
                        data-id={idx}
                        id={itemName}
                    />
                </div>
                <div className="col">
                    <label>Quantity</label>
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Quantity"
                        name="quantity"
                        id={quantity}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    <label>Price Per Unit</label>
                    <input
                        type="text"
                        className="form-control required"
                        placeholder="Price Per Unit"
                        name="pricePerUnit"
                        id={pricePerUnit}
                        data-id={idx}
                    />
                </div>
                <div className="col">
                    <label>Total Price</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Total Price"
                        name="totalPrice"
                        id={totalPrice}
                        data-id={idx}
                    />
                </div>
                <div className="col p-4">
                    {idx === 0 ? (
                        <button
                            onClick={() => props.add()}
                            type="button"
                            className="btn btn-primary text-center"
                        >
                            <i className="fa fa-plus-circle" aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            className="btn btn-danger"
                            onClick={() => props.delete(val)}
                        >
                            <i className="fa fa-minus" aria-hidden="true" />
                        </button>
                    )}
                </div>
            </div>
        );
    });
};
export default RowLogic;
