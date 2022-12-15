import moment from 'moment';
import * as tezrun from '../services/tezrun.service';

const startRace = async () => {
  return await tezrun.startRace();
};

const finishRace = async () => {
  return await tezrun.finishRace();
};

const printLog = (text: string) => {
  console.log(`Controller, ${text}`);
};

const mainLoop = async () => {
  const race = await tezrun.getRaceState();
  printLog(`Race=${race.status}___________________`);

  if (race.status === '0') {
    printLog(`InitState`);
    const op = await tezrun.readyRace();
    console.log('Transaction', op);
  } else if (race.status === '1') { //Ready
    const startTime = moment(race.start_time);
    const remainTime = startTime.diff(moment(), 'minutes');
    printLog(`EndState Remain=${remainTime}`);
    if (remainTime <= 0) {
      const op = await startRace();
      console.log('Transaction', op);
      if (!!op) {
        setTimeout(() => mainLoop(), 60000);
        return;
      }
    }
  } else if (race.status === '2') { //Started
    const startTime = moment(race.start_time);
    const elaspedTime = moment().diff(startTime, 'minutes');
    printLog(`PlayState Elasped=${elaspedTime}`);
    if (elaspedTime >= 10) {
      const op = await finishRace();
      console.log('Transaction', op);
      if (!!op) {
        setTimeout(() => mainLoop(), 60000);
        return;
      }
    }
  }

  setTimeout(() => mainLoop(), 5000);
};

export const start = async () => {
  console.log('Controller');

  //await tezrun.readyRace();
  //console.log('Controller, Race is ready now');

  setTimeout(() => mainLoop(), 1);
};
