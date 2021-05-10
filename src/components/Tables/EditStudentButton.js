import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import { store } from '@iso/redux/store';
import studentsActions from '@iso/redux/students/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const openEditModal = (student_id) => {
  store.dispatch(studentsActions.openEditStudentModal(student_id));
}

export default function({student_id}) {
  return (
    <Button type="primary" style={margin} onClick={() => {openEditModal(student_id)}}>
      {<IntlMessages id="edit_student" />}
    </Button>
  );
}
