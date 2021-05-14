import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Modal from '@iso/components/Feedback/Modal';
import Input from '@iso/components/uielements/input';
import { Button } from 'antd';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import * as TableViews from './TableViews/TableViews';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import doctorsActions from '@iso/redux/doctors/actions';
import { Alert } from 'antd';
import {
  Fieldset,
  Form,
  Label,
} from './Doctors.styles';


const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};


export default function AntTable() {
  
  const dispatch = useDispatch();

  const openInsertModal = () => {
    dispatch(doctorsActions.openInsertDoctorModal());
  }

  const closeInsertModal = () => {
    dispatch(doctorsActions.closeInsertDoctorModal());
  }

  const submitInsertForm = () => {
    dispatch(doctorsActions.storeNewDoctor());
  }

  const submitEditForm = () => {
    dispatch(doctorsActions.editDoctor());
  }

  const closeEditModal = () => {
    dispatch(doctorsActions.closeEditDoctorModal());
  }


  const onRecordChange = (e, key) => {
    dispatch(doctorsActions.updateSelectedDoctorForm(key, e.target.value));
  }

  const { doctors, selected_doctor, insert_doctor_modal, edit_doctor_modal, error, insert_errors } = useSelector(state => {
    return {
      doctors: state.doctors.doctors,
      error: state.doctors.error,
      selected_doctor: state.doctors.selected_doctor,
      insert_doctor_modal: state.doctors.insert_doctor_modal,
      edit_doctor_modal: state.doctors.edit_doctor_modal,
      insert_errors: state.doctors.insert_errors,
    }
  });

  useEffect(() => {

    dispatch(doctorsActions.fetchDoctors());
  }, [dispatch]);

  function renderTable(tableInfo, data) {
    const Component = TableViews.SortView;
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  return (
    <LayoutContentWrapper>
      <Row>
        <Col span={24}>
          <h2>STAFF MEMBERS</h2>
        </Col>
        <Col span={24}>
          <Button type="primary" style={margin} onClick={openInsertModal}>
            {<IntlMessages id="add_new_staff" />}
          </Button>
        </Col>
      </Row>
      { error.length ?
        <Row>
          <Col span={24}>
            <Alert message={error} type="error" style={{marginBottom: 10}}/>
          </Col>
        </Row>
      : "" }
      <Modal
            visible={edit_doctor_modal}
            onClose={closeEditModal}
            title="Edit Staff Data"
            onCancel={closeEditModal}
            width={780}
            okText={'Edit Staff Member'}
            onOk={submitEditForm}
      >
        <Form>
              <Fieldset>
                <Label>Name</Label>
                <Input
                  label="Name"
                  placeholder="Enter name"
                  value={selected_doctor.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={selected_doctor.email}
                  onChange={e => onRecordChange(e, 'email')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "email" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Phone Number</Label>
                <Input
                  label="phone number"
                  placeholder="Enter phone number"
                  value={selected_doctor.phone_number}
                  onChange={e => onRecordChange(e, 'phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
            </Form>
      </Modal>
      <Modal
            visible={insert_doctor_modal}
            onClose={closeInsertModal}
            title="Add new Staff Member"
            onCancel={closeInsertModal}
            width={780}
            okText={'Add New Staff Member'}
            onOk={submitInsertForm}
      >
        <Form>
        <Fieldset>
                <Label>Name</Label>
                <Input
                  label="Name"
                  placeholder="Enter name"
                  value={selected_doctor.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={selected_doctor.email}
                  onChange={e => onRecordChange(e, 'email')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "email" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Password</Label>
                <Input
                  label="Password"
                  placeholder="Enter password"
                  type="password"
                  value={selected_doctor.password}
                  onChange={e => onRecordChange(e, 'password')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "password" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Phone Number</Label>
                <Input
                  label="phone number"
                  placeholder="Enter phone number"
                  value={selected_doctor.phone_number}
                  onChange={e => onRecordChange(e, 'phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>

            </Form>
      </Modal>
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, doctors)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
