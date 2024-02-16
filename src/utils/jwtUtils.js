// jwtUtils.js
import { jwtDecode } from "jwt-decode";  // import 문 수정

export class jwtUtils {
  // 토큰 유효성 검사
  static isAuth(token) {
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);  // 함수 호출 수정
    if (decoded.exp > new Date().getTime() / 1000) {
      return true;
    } else {
      return false;
    }
  }

  // 토큰에서 유저 id 가져오기
  static getId(token) {
    const decoded = jwtDecode(token);  // 함수 호출 수정
    return decoded.jti;
  }
}
