import React from 'react';
import { Button } from 'antd';
import IntlMessages from '@iso/components/utility/intlMessages';
import { direction } from '@iso/lib/helpers/rtl';
import { store } from '@iso/redux/store';
import doctorsActions from '@iso/redux/doctors/actions';

const margin = {
  margin: direction === 'rtl' ? '0 0 8px 8px' : '0 8px 8px 0',
};

const openEditModal = (doctor_id) => {
  store.dispatch(doctorsActions.openEditDoctorModal(doctor_id));
}

export default function({doctor}) {
  return (
    <Button type="primary" style={margin} onClick={() => {openEditModal(doctor.id)}}>
      {<IntlMessages id="edit_doctor" />}
    </Button>
  );
}
