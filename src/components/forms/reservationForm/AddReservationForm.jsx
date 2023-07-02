import React, { useEffect, useState } from "react";
import classes from './AddReservation.module.scss';
import { connect } from "react-redux";
import { DatePicker, Form, Input, message, Select, Button } from "antd";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router";

const AddReservationForm = ({ userID, vehicleID, loggedUser }) => {
    const [vehicle, setVehicle] = useState(null);
    const navigate = useNavigate();
    const [form] = Form.useForm(); // Create a form instance

    function onFinish(values) {
        const formattedStartDate = moment(values.start_date['$d']).format('DD/MM/YY');
        const formattedEndDate = moment(values.end_date['$d']).format('DD/MM/YY');

        // Calculate the price based on the number of days
        const startDate = moment(values.start_date['$d']);
        const endDate = moment(values.end_date['$d']);
        const numDays = endDate.diff(startDate, 'days');
        const totalPrice = numDays * 20;

        const reservationData = {
            ...values,
            start_date: formattedStartDate,
            end_date: formattedEndDate,
            price: totalPrice, // Add the calculated price to the reservation data
        };

        axios.post("http://localhost:3001/reservations", reservationData)
            .then((response) => {
                if (response.status === 200) {
                    message.success("Reservation added! You will be contacted soon!");
                    setTimeout(() => {
                        navigate('/reservations');
                    }, 3000);
                } else {
                    message.error("Error!");
                }
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/vehicle/${vehicleID}`)
            .then((response) => {
                setVehicle(response.data[0]);
            })
            .catch((error) => {
                message.error(error);
            });
    }, [vehicleID]);

    const calculatePrice = (startValue, endValue) => {
        const startDate = moment(startValue);
        const endDate = moment(endValue);
        const numDays = endDate.diff(startDate, 'days');
        const totalPrice = numDays * 20;

        // Update the value of the price field only when its > 0
        if (totalPrice > 0)
            form.setFieldsValue({ price: totalPrice });
    };

    return (
        <div className={classes['container']}>
            <Form
                form={form} // Pass the form instance to the Form component
                onFinish={onFinish}
                className={classes['reservation-form']}
            >
                <div className={classes['section-1']}>
                    <Form.Item
                        name="user_id"
                        initialValue={loggedUser.id}
                        rules={[{ required: true }]}
                        label="Client"
                    >
                        <Select placeholder="User" disabled suffixIcon={null}>
                            <Select.Option value={loggedUser.id}>
                                {`${loggedUser.first_name} ${loggedUser.last_name}`}
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    {vehicle && (
                        <Form.Item
                            name="vehicle_id"
                            initialValue={vehicle.id}
                            rules={[{ required: true }]}
                            label="Vehicle"
                        >
                            <Select disabled suffixIcon={null}>
                                <Select.Option value={vehicle.id}>
                                    {`${vehicle.model_name} ${vehicle.company_name}, `}
                                    {vehicle.reg_num}, {vehicle.production_year}
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    )}
                </div>

                <div className={classes['section-2']}>
                    <Form.Item
                        name="start_date"
                        label="Start Date"
                        rules={[{ required: true, message: 'Please select a start date' }]}
                    >
                        <DatePicker format="YYYY-MM-DD"
                                    onChange={(_, dateString) => calculatePrice(dateString, form.getFieldValue('end_date'))} />
                    </Form.Item>

                    <Form.Item
                        name="end_date"
                        label="End Date"
                        rules={[{ required: true, message: 'Please select an end date' }]}
                    >
                        <DatePicker format="YYYY-MM-DD"
                                    onChange={(_, dateString) => calculatePrice(form.getFieldValue('start_date'), dateString)} />
                    </Form.Item>
                </div>

                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, message: 'Price is required' }]}

                >
                    <Input disabled />
                </Form.Item>

                <Button htmlType="submit">Make a reservation</Button>

            </Form>
        </div>
    );
};

const mapStateToProps = (state) => ({
    loggedUser: state.loggedUser
});

export default connect(mapStateToProps)(AddReservationForm);
