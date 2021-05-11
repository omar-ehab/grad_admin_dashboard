import React, { useEffect } from 'react';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Select, { SelectOption } from '@iso/components/uielements/select';
import Modal from '@iso/components/Feedback/Modal';
import Input from '@iso/components/uielements/input';
import { Button } from 'antd';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import * as TableViews from './TableViews/TableViews';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import staffActions from '@iso/redux/staff/actions';
import { Alert } from 'antd';
import {
  Fieldset,
  Form,
  Label,
} from './Staff.styles';

const Option = SelectOption;

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};


export default function AntTable() {
  
  const dispatch = useDispatch();

  const openInsertModal = () => {
    dispatch(staffActions.openInsertStaffModal());
  }

  const closeInsertModal = () => {
    dispatch(staffActions.closeInsertStaffModal());
  }

  const submitInsertForm = () => {
    dispatch(staffActions.storeNewStaff());
  }

  const submitEditForm = () => {
    dispatch(staffActions.editStaff());
  }

  const closeEditModal = () => {
    dispatch(staffActions.closeEditStaffModal());
  }

  const handleSelectChange = (value) => {
    const e = {
      target: {
        value
      }
    }
    onRecordChange(e, "job_title")
  }

  const onRecordChange = (e, key) => {
    dispatch(staffActions.updateSelectedStaffForm(key, e.target.value));
  }

  const { staff_memebers, selected_staff_member, insert_staff_modal, edit_staff_modal, error, insert_errors } = useSelector(state => {
    return {
      staff_memebers: state.staff.staff_members,
      error: state.staff.error,
      selected_staff_member: state.staff.selected_staff_member,
      insert_staff_modal: state.staff.insert_staff_modal,
      edit_staff_modal: state.staff.edit_staff_modal,
      insert_errors: state.staff.insert_errors,
    }
  });

  useEffect(() => {

    dispatch(staffActions.fetchStaffMembers());
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
            visible={edit_staff_modal}
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
                  value={selected_staff_member.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={selected_staff_member.email}
                  onChange={e => onRecordChange(e, 'email')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "email" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Phone Number</Label>
                <Input
                  label="phone number"
                  placeholder="Enter phone number"
                  value={selected_staff_member.phone_number}
                  onChange={e => onRecordChange(e, 'phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Role</Label>
                <Select defaultValue={selected_staff_member.job_title} onChange={handleSelectChange}>
                  <Option value="Admin">ADMIN</Option>
                  <Option value="Accountant" >ACCOUNTANT</Option>
                </Select>
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "job_title" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
            </Form>
      </Modal>
      <Modal
            visible={insert_staff_modal}
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
                  value={selected_staff_member.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Email</Label>
                <Input
                  label="Email"
                  placeholder="Enter email"
                  value={selected_staff_member.email}
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
                  value={selected_staff_member.password}
                  onChange={e => onRecordChange(e, 'password')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "password" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Phone Number</Label>
                <Input
                  label="phone number"
                  placeholder="Enter phone number"
                  value={selected_staff_member.phone_number}
                  onChange={e => onRecordChange(e, 'phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Job Title</Label>
                <Select defaultValue={selected_staff_member.job_title} onChange={handleSelectChange}>
                  <Option value="Admin">ADMIN</Option>
                  <Option value="Accountant" >ACCOUNTANT</Option>
                </Select>
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "job_title" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>

            </Form>
      </Modal>
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, staff_memebers)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
