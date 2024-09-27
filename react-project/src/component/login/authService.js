import axios from 'axios';

export const login = async (userId, password, navigate) => {
  try {
    const response = await axios.post(`/api/login`, {
      userId, // phoneNumber 대신 id 사용
      password,
    });

    console.log('로그인 응답:', response.data);
    localStorage.setItem('token', response.data.token);
    navigate('/ticket-list'); // 로그인 성공 시 페이지 이동
    return true; // 로그인 성공 시 true 반환
  } catch (error) {
    return false; // 로그인 실패 시 false 반환
  }
};

export const register = async (userId, password, navigate) => {
  try {
    const response = await axios.post('/api/register', {
      userId,
      password,
    });

    // 회원가입 성공 처리
    alert('회원가입이 완료되었습니다. 회수권을 등록해보세요.');
    localStorage.setItem('token', response.data.token);
    navigate('/'); // 홈으로 이동
    return true; // 회원가입 성공 시 true 반환
  } catch (error) {
    // 에러 응답 처리
    if (error.response && error.response.status === 409) {
      // 중복된 아이디 에러 처리
      alert('중복된 아이디입니다. 다른 아이디를 사용해주세요.');
    } else {
      // 기타 에러 처리
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
    return false; // 회원가입 실패 시 false 반환
  }
};
