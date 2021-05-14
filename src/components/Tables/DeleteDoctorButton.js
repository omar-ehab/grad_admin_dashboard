import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import axios from 'axios';
import Popconfirm from '../Feedback/Popconfirm';
import notifications from '../Feedback/Notification';
import { store } from '@iso/redux/store';
import doctorsActions from '@iso/redux/doctors/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const handleDelete = (doctor) => {
    const url = `http://127.0.0.1:8000/doctors/${doctor.id}/destroy`;
    axios({
      url,
      method: 'DELETE',
    }).then((response) => {
      store.dispatch(doctorsActions.fetchDoctors());
      notifications['success']({
        message: 'Staff Deleted Successfully',
      });
    }).catch(err => {
      notifications['error']({
        message: 'Error',
        description:
          `Something went wrong!`,
      });
    });

}

export default function({doctor}) {
  return (
    <Popconfirm
      title={`Are you sure you want delete ${doctor.name} from system?`}
      okText="Delete"
      cancelText="No"
      onConfirm={() => handleDelete(doctor)}
    >
      <Button danger style={margin}>
        {<IntlMessages id="delete_doctor" />}
      </Button>
    </Popconfirm>
  );
}
