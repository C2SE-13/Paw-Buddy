export const renderTime = (
  year: number,
  month: number,
  date: number,
  hour: number,
  minute: number,
  thoiGianUocTinh: number,
) => {
  let time = [];
  let openTime: number = Number(process.env.ENV_Open_Time) ?? 8;
  let closeTime: number = Number(process.env.ENV_Close_Time) ?? 18;
  let phut = 0;
  let thoiGianBatDau = new Date(year, month, date, hour, minute);

  while (openTime < closeTime || (openTime === 17 && phut === 0)) {
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

    if (
      thoiGianHienTai >= thoiGianBatDau &&
      thoiGianHienTai <
        new Date(thoiGianBatDau.getTime() + thoiGianUocTinh * 60000)
    ) {
      busy = true;
    }

    time.push({
      time: gioFormatted + ':' + phutFormatted,
      buoi,
      busy,
    });

    phut += 30;
    if (phut >= 60) {
      openTime++;
      phut = 0;
    }
  }

  return time;
};
