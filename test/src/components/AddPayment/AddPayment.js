import React, { useState, useEffect } from 'react';
import axios from '../../axios-test';
import {updateObject, checkValidity} from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Modal from '../UI/Modal/Modal';
import withErrorHandler from '../../hoc/withErrorHandler';

const AddPayment = ({onClose, payment}) => {

    const [validForm, setValidForm] = useState(false);
    const [form, setForm] = useState({
        Description: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            placeholder: "Description",
            value: payment ? payment.description : '',
            validation: {
                required: false
            },
            valid: payment && payment.description,
            touched: payment && payment.description
        },
        Amount: {
            elementType: 'input',
            elementConfig: {
                type: 'number'
            },
            placeholder: 'Amount',
            value: payment ? payment.amount : '',
            validation: {
                required: true
            },
            valid: payment && payment.amount,
            touched: payment && payment.amount
        },
        User: {
            elementType: 'input',
            elementConfig: {
                type: 'text'
            },
            placeholder: 'User',
            value: payment ? payment.user : '',
            validation: {
                required: true
            },
            valid: payment && payment.user,
            touched: payment && payment.user
        }
    });

    useEffect(() => {
        checkFormValidity();
    }, [form]);

    const formElementsArray = [];
    for (const k in form) {
        formElementsArray.push({
            id: k,
            config: form[k]
        });
    }

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(form, {
          [controlName]: updateObject(form[controlName], {
            value: event.target.value,
            valid: checkValidity(
              event.target.value,
              form[controlName].validation
            ),
            touched: true
          })
        });
        setForm(updatedControls);
    };

    const checkFormValidity = () => {
        let isValid = true;
        for(let key in form){
            const config = form[key];
            if(!config.valid){
                isValid = false;
                break;
            }
        }
        setValidForm(isValid);
    }

    let inputs = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            label={formElement.config.label}
            placeholder={formElement.config.placeholder}
            changed={event => inputChangedHandler(event, formElement.id)}
        />
    ));

    const clearForm = () => {
        const updatedForm = {...form};
        for(const element in updatedForm){
            updatedForm[element].value = '';
        }
        setForm(updatedForm);
    }

    const submitHandler = event => {
        event.preventDefault();
        const data = {
            amount: form.Amount.value,
            user: form.User.value,
            description: form.Description.value
        };
        if(payment){
            data['id'] = payment.id;
            axios.put('payment/put/', data).then(response => {
                clearForm();
                onClose();
            }).catch(error => console.log(error));
        } else {
            axios.post('payment/post', data).then(response => {
                clearForm();
                onClose();
            }).catch(error => console.log(error));
        }

    };




    return (
        <Modal width="400px" show title="Add or edit payment" onCloseCLicked={onClose}>
            <form onSubmit={submitHandler} >
                {inputs}
                <Button btnType="Success" disabled={!validForm}>Save</Button>
            </form>
        </Modal>

    );


}


export default withErrorHandler(AddPayment,axios);