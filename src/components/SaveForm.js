import React, { Component } from 'react';
export default class SaveForm extends Component {
    userData;

    constructor(props) {
        super(props);

        this.onChangeOrderNo = this.onChangeOrderNo.bind(this);
        this.onChangePurchaseDate = this.onChangePurchaseDate.bind(this);
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangeTotalAmount = this.onChangeTotalAmount.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            orderNo: '',
            purchaseDate: '',
            customerName: '',
            totalAmount: '',
            addItems: [
                {
                    index: Math.random(),
                    itemName: "",
                    quantity: "",
                    pricePerUnit: "",
                    totalPrice: "",

                }
            ]
        }
    }

    // Form Values
    onChangeOrderNo(e) {
        this.setState({ orderNo: e.target.value })
    }

    onChangePurchaseDate(e) {
        this.setState({ purchaseDate: e.target.value })
    }

    onChangeCustomerName(e) {
        this.setState({ customerName: e.target.value })
    }
    onChangeTotalAmount(e) {
        this.setState({ totalAmount: e.target.value })
    }


    // React Life Cycle
    componentDidMount() {
        this.userData = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('user')) {
            this.setState({
                orderNo: this.userData.orderNo,
                purchaseDate: this.userData.purchaseDate,
                customerName: this.userData.customerName,
                totalAmount: this.userData.totalAmount,
                addItems: this.userData.addItems
            })
        } else {
            this.setState({
                orderNo: '',
                purchaseDate: '',
                customerName: '',
                totalAmount: '',
                addItems: [
                    {
                        index: Math.random(),
                        itemName: "",
                        quantity: "",
                        pricePerUnit: "",
                        totalPrice: "",

                    }
                ]

            })
        }
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('user', JSON.stringify(nextState));
    }

    onSubmit(e) {
        e.preventDefault()
        console.log(this.state.props)
    }

    // add items


    handleChange = e => {
        if (
            ["itemName", "quantity", "pricePerUnit", "totalPrice"].includes(
                e.target.name
            )
        ) {
            let addItems = [...this.state.addItems];
            addItems[e.target.dataset.id][e.target.name] = e.target.value;
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };
    addNewRow = e => {
        this.setState(prevState => ({
            addItems: [
                ...prevState.addItems,
                {
                    index: Math.random(),
                    itemName: "",
                    quantity: "",
                    pricePerUnit: "",
                    totalPrice: "",
                }
            ]
        }));
    };

    deteteRow = index => {
        this.setState({
            addItems: this.state.addItems.filter(
                (s, sindex) => index !== sindex
            )
        });
    };

    clickOnDelete(record) {
        this.setState({
            addItems: this.state.addItems.filter(r => r !== record)
        });
    }

    render() {
        let { addItems } = this.state;
        return (
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <h3>ENTER ORDER</h3>
                    <div className="form-group">
                        <label>Order Number</label>
                        <input type="number" className="form-control" value={this.state.orderNo} onChange={this.onChangeOrderNo} />
                    </div>
                    <div className="form-group">
                        <label>Purchase Date</label>
                        <input type="date" className="form-control" value={this.state.purchaseDate} onChange={this.onChangePurchaseDate} />
                    </div>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input type="text" className="form-control" value={this.state.customerName} onChange={this.onChangeCustomerName} />
                    </div>
                    <div className="form-group">
                        <label>Total Amount</label>
                        <input type="text" className="form-control" value={this.state.totalAmount} onChange={this.onChangeTotalAmount} />
                    </div>

                    {/* add items */}


                    <div className="content">

                        <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-sm-1" />
                            <div className="col-sm-10">
                                <h2 className="text-center">Add items</h2>
                                <div className="container">
                                    <div className="row">
                                        {addItems.map((val, idx) => {
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
                                                            onChange={this.handleChange}
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
                                                            onChange={this.handleChange}

                                                        />
                                                    </div>
                                                    <div className="col">
                                                        <label>Price/Unit</label>
                                                        <input
                                                            type="text"
                                                            className="form-control required"
                                                            placeholder="Price Per Unit"
                                                            name="pricePerUnit"
                                                            id={pricePerUnit}
                                                            data-id={idx}
                                                            onChange={this.handleChange}

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
                                                            onChange={this.handleChange}

                                                        />
                                                    </div>
                                                    <div className="col p-4">
                                                        {idx === 0 ? (
                                                            <button
                                                                onClick={() => this.addNewRow()}
                                                                type="button"
                                                                className="btn btn-primary text-center"
                                                            >
                                                                <i className="fa fa-plus-circle" aria-hidden="true" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className="btn btn-danger"
                                                                onClick={() => this.clickOnDelete(val)}
                                                            >
                                                                <i className="fa fa-minus" aria-hidden="true" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })};
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-1" />
                        </div>

                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                </form>
            </div>
        )
    }
}