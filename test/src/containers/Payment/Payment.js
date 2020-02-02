import React, { useState, useEffect } from 'react';
import axios from '../../axios-test';
import classes from './Payment.module.css';
import AddPayment from '../../components/AddPayment/AddPayment';
import ConfirmAlert from '../../components/ConfirmAlert/ConfirmAlert';



const Payment = (props) => {

    const [payments, setPayments] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [payment, setPaymet] = useState(null);
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
   

    useEffect(() => {
        loadPayments();
    }, []);

   const loadPayments = () => {
    axios.get('payment/get').then(response => {
        setPayments(response.data);
    });
   };
    

    const handleDelete = (id) => {
        axios.delete('payment/delete/' + id,).then(response => {
            setPayments(response.data);
        }).catch(error => console.log(error));
    }

    const handleShowConfirm = (id) => {
        setIdToDelete(id);
        setShowConfirmAlert(true);
    };

    const paymnetsTemplate = payments.map( payment => 
        (<tr key={Math.random()}>
            <td>{payment.description}</td>
            <td>{payment.amount}</td>
            <td>{payment.user}</td>
            <td>{payment.date}</td>
            <td>
                <a onClick={() => handleEdit(payment)} className={classes.link}>Edit</a>{"      "}
                <a className={classes.link} onClick={() => handleShowConfirm(payment.id)}>Delete</a>
            </td>
        </tr>));

    let table = null;
    if(paymnetsTemplate.length > 0){
        table = (
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>DESCRIPTION</th>
                        <th>AMOUNT</th>
                        <th>USER</th>
                        <th>DATE</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {paymnetsTemplate}
                </tbody>
            </table>
        );
    }

    const handleSHowAdd = () => {
        setPaymet(null);
        setShowAdd(true);
    };

    const handleOnCloseAdd = () => {
        setShowAdd(false);
        loadPayments();
    }


    const handleEdit = (payment) => {
        setPaymet(payment);
        setShowAdd(true);
    };

    const handlCloseConfirm = () => {
        setShowConfirmAlert(false);
    };

    const handleOk = () => {
        handleDelete(idToDelete);
        setShowConfirmAlert(false);
    };

    const addPayment = showAdd ? <AddPayment onClose={handleOnCloseAdd} payment={payment} /> : null;

    const confirmAlert = showConfirmAlert ? <ConfirmAlert question="Delete payment?" onClose={handlCloseConfirm} onOk={handleOk}/> : null;



    return (
        <>
        {addPayment}
        {confirmAlert}
        <div className={classes.payments}>

            <div className={classes.add} onClick={handleSHowAdd}>
                <a>Add payment</a>
            </div>

            <h3>Payments</h3>
            {table}
        </div>
        </>

    );
}


export default Payment;