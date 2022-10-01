import moment from 'moment';
import * as tezrun from '../services/tezrun.service';

const startRace = async () => {
  console.log('Controller, Start race');
  await tezrun.startRace();
  console.log('Controller, Race get started');
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
  }

  setTimeout(() => mainLoop(), 5000);
};

export const start = async () => {
  console.log('Controller');

  await tezrun.readyRace();
  console.log('Controller, Race is ready now');

  setTimeout(() => mainLoop(), 5000);
};
