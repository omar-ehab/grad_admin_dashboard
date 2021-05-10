import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import axios from 'axios';
import Popconfirm from '../Feedback/Popconfirm';
import notifications from '../Feedback/Notification';
import { store } from '@iso/redux/store';
import studentsAction from '@iso/redux/students/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const handleDelete = (student) => {
    const url = `http://127.0.0.1:8000/students/${student.id}/destroy`;
    axios({
      url,
      method: 'DELETE',
    }).then((response) => {
      store.dispatch(studentsAction.fetchStudents());
      notifications['success']({
        message: 'Student Deleted Successfully',
      });
    }).catch(err => {
      notifications['error']({
        message: 'Error',
        description:
          `$Something went wrong!`,
      });
    });

}

export default function({student}) {
  return (
    <Popconfirm
      title={`Are you sure you want delete ${student.name} from system?`}
      okText="Delete"
      cancelText="No"
      onConfirm={() => handleDelete(student)}
    >
      <Button danger style={margin}>
        {<IntlMessages id="delete_student" />}
      </Button>
    </Popconfirm>
  );
}
