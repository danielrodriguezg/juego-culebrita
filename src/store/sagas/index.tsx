import { takeLatest } from 'redux-saga/effects';
import { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, RESET, STOP_GAME } from '../actions';
import { moveSaga } from './MoveSaga';


export default function* watcherSagas() {
	yield takeLatest(
		[MOVE_RIGHT, MOVE_LEFT, MOVE_UP, MOVE_DOWN, RESET, STOP_GAME],
      moveSaga
	);
}