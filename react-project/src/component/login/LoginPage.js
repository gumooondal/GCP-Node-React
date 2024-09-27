import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/LoginPage.css'; // 스타일 파일 연결
import { login, register } from '../login/authService'; // authService에서 함수 불러오기
import { lcheckInputWord } from '../util/lcheckInputWord';

function LoginPage({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 기본 동작 방지

    if (userId && password) {
      if (isLogin) {
        // 로그인 처리
        const loginSuccess = await login(userId, password, navigate); // navigate를 전달
        if (loginSuccess) {
          onLogin(); // 로그인 성공 시 상태 업데이트
        } else {
          alert('로그인에 실패했습니다. 다시 시도해주세요.'); // 실패 메시지
        }
      } else {
        // 회원가입 처리
        const registerSuccess = await register(userId, password, navigate); // navigate를 전달
        if (registerSuccess) {
          onLogin(); // 회원가입 후 로그인 상태 업데이트
          navigate('/ticket-list'); // 회원가입 후 페이지 이동
        } else {
          // 회원가입 실패 시 추가 처리 없음
          return; // 회원가입 실패 시 더 이상 처리하지 않음
        }
      }
    } else {
      alert('모든 필드를 채워주세요.'); // 필드 미입력 시 메시지
    }
  };


  return (
    <div>
      <main>
        <h4>회수권을 등록해보세요.</h4>
        <div className="login-container"> {/* 로그인 컨테이너 */}
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text" // "id" 대신 "text" 사용
              placeholder="15자 내 알파벳,숫자 조합" // "아이디"를 "핸드폰 번호"로 수정
              value={userId} // state와 연결
              onChange={(e) => setUserId(e.target.value)} // 핸드폰 번호 변경 시 state 업데이트
              onKeyDown={lcheckInputWord} // 키 입력 시 체크
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password} // state와 연결
              onChange={(e) => setPassword(e.target.value)} // 비밀번호 변경 시 state 업데이트
              onKeyDown={lcheckInputWord} // 키 입력 시 체크
            />
            <button
              type="submit"
              className={isLogin ? "login-button" : "signup-button"}
            >
              {isLogin ? "로그인" : "회원가입"}
            </button>
          </form>
          <p>
            <button
              className="toggle-button"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "회원가입으로 전환" : "로그인으로 전환"}
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
