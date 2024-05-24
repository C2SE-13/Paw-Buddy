const moment = require('moment');

interface TimeSlot {
  time: string;
  buoi: string;
  busy: boolean;
  old: boolean;
}

export const renderTime = (
  year: number,
  month: number,
  date: number,
): TimeSlot[] => {
  let time = [];
  let openTime = Number(process.env.ENV_Open_Time) || 8;
  let closeTime = Number(process.env.ENV_Close_Time) || 18;
  let phut = 0;
  let thoiGianBatDau = new Date(year, month - 1, date, 0, 0); // month - 1 vì tháng trong JS bắt đầu từ 0

  // Lấy thời gian hiện tại một lần để sử dụng nhiều lần
  const currentMoment = moment();

  while (
    openTime < closeTime ||
    (openTime === (Number(process.env.ENV_Close_Time) || 18) && phut === 0)
  ) {
    let gioFormatted = openTime < 10 ? '0' + openTime : openTime;
    let phutFormatted = phut < 10 ? '0' + phut : phut;

    let thoiGianHienTai = new Date(
      thoiGianBatDau.getFullYear(),
      thoiGianBatDau.getMonth(),
      thoiGianBatDau.getDate(),
      openTime,
      phut,
    );

    let buoi = openTime < 12 ? 'AM' : 'PM';
    let busy = false;

    // Tạo moment cho thời gian hiện tại trong vòng lặp
    const loopMoment = moment(thoiGianHienTai);

    // Điều kiện để xác định thời gian có cũ không
    let old = loopMoment.isBefore(currentMoment);

    time.push({
      time: gioFormatted + ':' + phutFormatted,
      buoi,
      busy,
      old,
    });

    phut += 30;
    if (phut >= 60) {
      openTime++;
      phut = 0;
    }
  }

  return time;
};

export const checkBusy = (timeArr: any, busyArr: any) => {
  let time = [...timeArr];
  let busy = [...busyArr];

  busy.forEach(busyPeriod => {
    const startTime = convertToDate(busyPeriod.startTime);
    const endTime = convertToDate(busyPeriod.endTime);

    time.forEach(timeSlot => {
      const timeNew = convertToDate(timeSlot.time);
      if (timeNew >= startTime && timeNew <= endTime) {
        timeSlot.busy = true;
      }
    });
  });

  return time;
};

function convertToDate(timeStr: string) {
  const [hours, minutes] = timeStr.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));
  date.setSeconds(0);
  return date;
}
