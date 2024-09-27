import React, { useEffect , useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
//mport ProfileCard from './component/ProfileCard'; // ProfileCard 컴포넌트 import
import Header from './component/Header';
import Main from './component/Main';
import NavBar from './component/NavBar';
import LoginPage from './component/login/LoginPage';
import TicketAddForm from './component/addForm/MainForm';
import TicketList from './component/list/TicketList';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // localStorage에서 토큰 확인
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // 토큰이 있으면 로그인 상태로 설정
    }
  }, []); // 빈 배열을 주어 컴포넌트가 처음 렌더링될 때만 실행

  const handleLogin = () => {
    setIsLoggedIn(true); // 로그인 상태 업데이트
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로컬 스토리지에서 토큰 삭제
    setIsLoggedIn(false); // 로그아웃 상태로 변경
  };

  return (
    <Router>
    <Header  isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout}/>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={isLoggedIn ? <h2 className="loggedMessage">이미 로그인 중입니다</h2> 
      : <LoginPage onLogin={handleLogin} />}/>
      <Route path="/ticket-add" element={<TicketAddForm />} />
      <Route path="/ticket-list" element={<TicketList />} />
    </Routes>
    <NavBar />
  </Router>
  );
}

export default App;
