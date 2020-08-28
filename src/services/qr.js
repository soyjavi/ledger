export const ServiceQR = {
  uri: (props = {}) => {
    return `https://chart.googleapis.com/chart?cht=qr&chs=512x512&chld=H|1&chl=${Object.values(props).join('|')}`;
  },
};
