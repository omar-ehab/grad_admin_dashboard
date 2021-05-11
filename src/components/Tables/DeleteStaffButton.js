import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import axios from 'axios';
import Popconfirm from '../Feedback/Popconfirm';
import notifications from '../Feedback/Notification';
import { store } from '@iso/redux/store';
import staffActions from '@iso/redux/staff/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const handleDelete = (staff) => {
    const url = `http://127.0.0.1:8000/staff/${staff.id}/destroy`;
    axios({
      url,
      method: 'DELETE',
    }).then((response) => {
      store.dispatch(staffActions.fetchStaffMembers());
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

export default function({staff}) {
  return (
    <Popconfirm
      title={`Are you sure you want delete ${staff.name} from system?`}
      okText="Delete"
      cancelText="No"
      onConfirm={() => handleDelete(staff)}
    >
      <Button danger style={margin}>
        {<IntlMessages id="delete_staff" />}
      </Button>
    </Popconfirm>
  );
}
