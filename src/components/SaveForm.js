import React, { Component } from 'react';
import AddRowLogic from "./addRowLogic"
export default class SaveForm extends Component {
    userData;
    constructor(props) {
        super(props);
        this.onHandleChange = this.onHandleChange.bind(this);
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
    onHandleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
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
                        <input type="number" className="form-control" name="orderNo" value={this.state.orderNo} onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Purchase Date</label>
                        <input type="date" className="form-control" name="purchaseDate" value={this.state.purchaseDate} onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Customer Name</label>
                        <input type="text" className="form-control" name="customerName" value={this.state.customerName} onChange={this.onHandleChange} />
                    </div>
                    <div className="form-group">
                        <label>Total Amount</label>
                        <input type="text" className="form-control" name="totalAmount" value={this.state.totalAmount} onChange={this.onHandleChange} />
                    </div>

                    {/* add items */}


                    <div className="content">
                        <div className="row" style={{ marginTop: 20 }}>
                            <div className="col-sm-1" />
                            <div className="col-sm-10">
                                <h2 className="text-center">Add items</h2>
                                <div className="container">
                                    <div className="row">
                                        <AddRowLogic
                                            add={this.addNewRow}
                                            delete={this.clickOnDelete.bind(this)}
                                            data={addItems}
                                        />
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