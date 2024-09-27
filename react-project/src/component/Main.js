import React from 'react';
import '../css/Main.css';

function Login() {
  return (
    <div>
      <main>
        <h2>메인 페이지</h2><br />
        <ul>
          <li>로그인 없이도 사용이 가능합니다.</li> <br/>
          <li>단, 기기 또는 브라우저 변경 시 데이터는 유지되지 않습니다.</li>  <br/>
          <li>횟수를 차감한 후에는 되돌릴 수 없으므로 삭제하고 다시 등록하는 걸 추천합니다.</li>  <br/>
        </ul>
      </main>
    </div>
  );
}

export default Login;
