import { combineReducers } from 'redux';
import App from '@iso/redux/app/reducer';
import Auth from '@iso/redux/auth/reducer';
import ThemeSwitcher from '@iso/redux/themeSwitcher/reducer';
import LanguageSwitcher from '@iso/redux/languageSwitcher/reducer';
import markets from '@iso/redux/markets/reducer';
import market from '@iso/redux/market/reducer';
import students from '@iso/redux/students/reducer';
import student from '@iso/redux/student/reducer';
import staff from '@iso/redux/staff/reducer';

export default combineReducers({
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  markets,
  market,
  students,
  student,
  staff,
});
