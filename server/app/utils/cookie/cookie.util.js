/**
 * @file app/utils/cookie/cookie.util.js
 * @description Cookie 유틸리티
 * 251125 v1.0.0 김위민 init
 */

import dayjs from "dayjs";

// -------------------
// private
// -------------------
/**
 * 
 * @param {import("express").Response} res 
 * @param {string} cookieName - 쿠키에 접근하는 키
 * @param {string} cookieValue 
 * @param {number} ttl - 쿠키 유효 시간
 * @param {boolean} httpOnlyFlg - true 설정 시 js에서 접근 불가 (보안 상의 이유로 true로 설정)
 * @param {boolean} secureFlg - true 설정 시 https만 쿠키 사용 가능, false 설정 시, http 또한 쿠키 사용 가능 
 */
function setCookie(res, cookieName, cookieValue, ttl, httpOnlyFlg = true, secureFlg = false) {
  res.cookie(
    cookieName,
    cookieValue,
    {
      expires: dayjs().add(ttl, 'second').toDate(), // toDate() : Date 객체로 변환하는 메소드
      httpOnly: httpOnlyFlg,
      secure: secureFlg,
      sameSite: 'none', // 도메인 검증 - none(검증 안 함), lax(도메인이 달라도 내가 설정한 서버라면 허용), strict(도메인 다르면 허용 X)
    }
  );
}

/**
 * 특정 쿠키 획득(미존재 시, 빈문자열 반환)
 * @param {import("express").Request} req 
 * @param {string} cookieName 
 * @returns {string}
 */ 
function getCookie(req, cookieName) {
  let cookieValue = '';

  if(req.cookies) {
    cookieValue = req.cookies[cookieName];
  }

  return cookieValue;
}

// -------------------
// public
// -------------------
/**
 * 쿠키에 리프래시 토큰 설정
 * @param {import("express").Response} res 
 * @param {string} refreshToken 
 */
function setCookieRefreshToken(res, refreshToken) {
  setCookie(
    res,
    process.env.JWT_REFRESH_TOKEN_COOKIE_NAME,
    refreshToken,
    parseInt(process.env.JWT_REFRESH_TOKEN_COOKIE_EXPIRY),
    true,
    true
  );
}

/**
 * 쿠키에서 리프래시 토큰 획득
 * @param {import("express").Request} req
 * @returns {string}
 */
function getCookieRefreshToken(req) {
  return getCookie(req, process.env.JWT_REFRESH_TOKEN_COOKIE_NAME);
}

export default {
  setCookieRefreshToken,
  getCookieRefreshToken,
}