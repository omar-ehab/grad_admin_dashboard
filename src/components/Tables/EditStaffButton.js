import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import { store } from '@iso/redux/store';
import staffActions from '@iso/redux/staff/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const openEditModal = (staff_id) => {
  store.dispatch(staffActions.openEditStaffModal(staff_id));
}

export default function({staff}) {
  return (
    <Button type="primary" style={margin} onClick={() => {openEditModal(staff.id)}}>
      {<IntlMessages id="edit_staff" />}
    </Button>
  );
}
