/**
 * @file /app/utils/path/path.util.js
 * @description path 유틸리티
 * 251128 v1.0.0 김위민 init
 */

import path from 'path';

function getViewDirPath() {
  // dirname 같은 경우는 예약어인 경우가 있기 때문에 만든 것이다 라고 인식시키기 위해 __를 붙인다
  const __dirname = process.env.APP_MODE !== 'dev' ? process.env.APP_DIST_PATH : path.resolve(process.env.APP_DIST_PATH);

  return path.join(__dirname, 'index.html');
}

export default {
  getViewDirPath,
}