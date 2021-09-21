import React, { useState, useEffect } from 'react';
import { Input, Form, Modal, Button, Row, Col, Checkbox, Select,InputNumber } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
    ATTRIBUTE_PICKLIST_GET_REQUEST,
    ATTRIBUTE_PICKLIST_GET_SUCCESS,
    ATTRIBUTE_PICKLIST_GET_ERROR,
    JEWELERY_GET_ERROR,
    JEWELERY_GET_SUCCESS,
} from '../../constant/redux-type'
import {AttributepickListGet,jewelryGet} from "../../redux/actions/jewelery-action"

const AddJewlryATT = () => {
return(<div></div>)
}

export default AddJewlryATT;