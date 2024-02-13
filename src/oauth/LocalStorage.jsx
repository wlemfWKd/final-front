import { AtomEffect } from 'recoil';

// 원하는 시간 지정
const ONE_HOUR = 3600 * 1000; // 1시간
const getExpirationTime = () => Date.now() + ONE_HOUR;

