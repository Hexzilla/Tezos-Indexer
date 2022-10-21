import moment from 'moment';
import * as tezrun from '../services/tezrun.service';

const startRace = async () => {
  console.log('Controller, Start race');
  await tezrun.startRace();
  console.log('Controller, Race get started');
};

const finishRace = async () => {
  console.log('Controller, Finish race');
  await tezrun.finishRace();
  console.log('Controller, Race get finished');
};

const mainLoop = async () => {
  const race = await tezrun.getRaceState();
  console.log('Controller, race=', race)

  if (race.status === '1') {
    console.log('Controller, Race Ended')

    const startTime = moment(race.start_time);
    const remainTime = startTime.diff(moment(), 'minutes');
    console.log('Controller, Remain Time=', remainTime)
    if (remainTime <= 0) {
      await startRace();
    }
  } else if (race.status === '2') {
    const startTime = moment(race.start_time);
    const elaspedTime = moment().diff(startTime, 'minutes');
    console.log('Controller, Elasped Time=', elaspedTime)
    if (elaspedTime >= 5) {
      await finishRace();
    }
  }

  setTimeout(() => mainLoop(), 5000);
};

export const start = async () => {
  console.log('Controller');

  await tezrun.readyRace();
  console.log('Controller, Race is ready now');

  setTimeout(() => mainLoop(), 5000);
};
