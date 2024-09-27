// NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/NavBar.css';  // 네비게이션 바 스타일 따로 관리

function NavBar() {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/ticket-add">회수권 등록</Link>
        </li>
        <li>
          <Link to="/ticket-list">회수권 리스트</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
