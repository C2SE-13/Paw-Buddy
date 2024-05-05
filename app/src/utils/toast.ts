/* eslint-disable curly */
interface Toast {
  type?: 'success' | 'error' | 'info';
  textMain: string;
  textSecond?: string;
  position?: string;
  visibilityTime?: number;
  autoHide?: boolean;
}

export const toastConfig = ({
  type = 'success',
  textMain,
  textSecond,
  position,
  visibilityTime,
  autoHide,
}: Toast) => {
  const config: any = {
    type,
    text1: textMain,
  };

  if (textSecond) config.text2 = textSecond;
  if (position) config.position = position;
  if (visibilityTime) {
    config.visibilityTime = visibilityTime;
    config.autoHide = true;
  }

  if (visibilityTime && autoHide) {
    config.visibilityTime = visibilityTime;
    config.autoHide = autoHide;
  }

  return config;
};
