const ZERO = '0';

export default (time) => `${(ZERO + time.getHours()).slice(-2)}:${(ZERO + time.getMinutes()).slice(-2)}`;
