import React, { useEffect } from 'react';
import moment from 'moment';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Modal from '@iso/components/Feedback/Modal';
import Input from '@iso/components/uielements/input';
import TableDemoStyle from './Demo.styles';
import { tableInfo } from './configs';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import * as TableViews from './TableViews/TableViews';
import studentsActions from '@iso/redux/students/actions';
import { Alert } from 'antd';
import Datepicker from '@iso/components/uielements/datePicker'

import {
  Fieldset,
  Form,
  Label,
} from './Students.styles';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};



export default function AntTable() {

  const dispatch = useDispatch();

  const openInsertModal = () => {
    dispatch(studentsActions.openInsertStudentModal());
  }

  const closeInsertModal = () => {
    dispatch(studentsActions.closeInsertStudentModal());
  }

  const submitInsertForm = () => {
    dispatch(studentsActions.storeNewStudent());
  }

  const submitEditForm = () => {
    dispatch(studentsActions.editStudent());
  }

  const closeEditModal = () => {
    dispatch(studentsActions.closeEditStudentModal());
  }

  function onDateChange(date, dateString) {
    const e = {
      target: {
        value: dateString
      }
    }
    onRecordChange(e, 'birth_date')
  }

  const onRecordChange = (e, key) => {
    dispatch(studentsActions.updateSelectedStudentForm(key, e.target.value));
  }

  const { students, selected_student, insert_student_modal, edit_student_modal, error, insert_errors } = useSelector(state => {
    return {
      students: state.students.students,
      selected_student: state.students.selected_student,
      insert_student_modal: state.students.insert_student_modal,
      edit_student_modal: state.students.edit_student_modal,
      error: state.students.error,
      insert_errors: state.students.insert_errors,
    }
  });

  useEffect(() => {
    dispatch(studentsActions.fetchStudents());
  }, [dispatch]);

  function renderTable(tableInfo, data) {
    const Component = TableViews.SortView;
    return <Component tableInfo={tableInfo} dataList={data} />;
  }

  return (
    <LayoutContentWrapper>
      <Row>
        <Col span={24} style={{marginBottom: 10}}>
          <h2>STUDENTS</h2>
        </Col>
        <Col span={24}>
          <Button type="primary" style={margin} onClick={openInsertModal}>
            {<IntlMessages id="add_new_student" />}
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
            visible={edit_student_modal}
            onClose={closeEditModal}
            title="Edit Student"
            onCancel={closeEditModal}
            width={780}
            okText={'Edit Student'}
            onOk={submitEditForm}
      >
        <Form>
              {/* <Fieldset>
                <Label>Student Card ID</Label>
                <Input
                  label="Student CARD ID"
                  placeholder="Enter card id"
                  value={selected_student.card_id}
                  onChange={e => onRecordChange(e, 'card_id')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "card_id" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset> */}
              <Fieldset>
                <Label>Student Name</Label>
                <Input
                  label="Student Name"
                  placeholder="Enter name"
                  value={selected_student.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>

              <Fieldset>
                <Label>Student Email</Label>
                <Input
                  label="Student Email"
                  placeholder="Enter Student Email"
                  value={selected_student.email}
                  onChange={e => onRecordChange(e, 'email')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "email" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Birth Date</Label>
                <Datepicker onChange={onDateChange} defaultValue={moment(selected_student.birth_date)}/>
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "birth_date" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Mobile</Label>
                <Input
                  label="Student Mobile"
                  placeholder="Enter Student Mobile"
                  value={selected_student.mobile}
                  onChange={e => onRecordChange(e, 'mobile')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "student_phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Parent Mobile</Label>
                <Input
                  label="Student Parent Mobile"
                  placeholder="Enter Student Parent Mobile"
                  value={selected_student.parent_mobile}
                  onChange={e => onRecordChange(e, 'parent_mobile')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "parent_phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
            </Form>
      </Modal>
      <Modal
            visible={insert_student_modal}
            onClose={closeInsertModal}
            title="Add new Student"
            onCancel={closeInsertModal}
            width={780}
            okText={'Add New Student'}
            onOk={submitInsertForm}
      >
        <Form>
              <Fieldset>
                <Label>Student Card ID</Label>
                <Input
                  label="Student CARD ID"
                  placeholder="Enter card id"
                  value={selected_student.card_id}
                  onChange={e => onRecordChange(e, 'card_id')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "card_id" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Name</Label>
                <Input
                  label="Student Name"
                  placeholder="Enter name"
                  value={selected_student.name}
                  onChange={e => onRecordChange(e, 'name')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "name" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>

              <Fieldset>
                <Label>Student Email</Label>
                <Input
                  label="Student Email"
                  placeholder="Enter Student Email"
                  value={selected_student.email}
                  onChange={e => onRecordChange(e, 'email')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "email" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Password</Label>
                <Input
                  type="password"
                  label="Student Password"
                  placeholder="Enter Student Password"
                  value={selected_student.password}
                  onChange={e => onRecordChange(e, 'password')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "password" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Birth Date</Label>
                <Datepicker onChange={onDateChange} />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "birth_date" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Mobile</Label>
                <Input
                  label="Student Mobile"
                  placeholder="Enter Student Mobile"
                  value={selected_student.student_phone_number}
                  onChange={e => onRecordChange(e, 'student_phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "student_phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
              <Fieldset>
                <Label>Student Parent Mobile</Label>
                <Input
                  label="Student Parent Mobile"
                  placeholder="Enter Student Parent Mobile"
                  value={selected_student.parent_phone_number}
                  onChange={e => onRecordChange(e, 'parent_phone_number')}
                />
                { insert_errors.details ? (insert_errors.details[0]?.context?.key === "parent_phone_number" ? <Alert message={insert_errors.details[0].message} type="error" style={{marginTop: 10}}/> : "") : "" }
              </Fieldset>
            </Form>
      </Modal>
      <TableDemoStyle className="isoLayoutContent">
        {renderTable(tableInfo, students)}
      </TableDemoStyle>
    </LayoutContentWrapper>
  );
}

export { TableViews, tableInfo };
