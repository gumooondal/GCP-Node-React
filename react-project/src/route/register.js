// server/routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../../../db'); // 데이터베이스 연결 설정을 가져옵니다
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// 회원가입 요청 처리
router.post('/', async (req, res) => {
  const { userId, password } = req.body;
  console.log('회원가입 요청:', req.body);

  try {
    // 사용자 ID가 이미 존재하는지 확인
    const checkUserQuery = 'SELECT * FROM user WHERE user_id = ?';
    db.query(checkUserQuery, [userId], async (err, results) => {
      if (err) {
        console.error('데이터베이스 오류:', err);
        return res.status(500).json({ success: false, message: '서버 오류' });
      }

      // 사용자가 이미 존재하는 경우
      if (results.length > 0) {
        return res.status(409).json({ success: false, message: '중복된 아이디입니다.' });
      }

      // 비밀번호 해시화
      const hashedPassword = await bcrypt.hash(password, 10);

      // 사용자 정보를 데이터베이스에 삽입
      const insertUserQuery = 'INSERT INTO user (user_id, password) VALUES (?, ?)';
      db.query(insertUserQuery, [userId, hashedPassword], (err, insertResults) => {
        if (err) {
          console.error('회원가입 오류:', err);
          return res.status(500).json({ success: false, message: '회원가입 실패' });
        }

        // JWT 토큰 발급
        const token = jwt.sign({ userId: userId }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`로그 : 회원가입 성공 - ${new Date().toLocaleString()}, 토큰: ${token}`);

        return res.json({ success: true, message: '회원가입 성공', token });
      });
    });
  } catch (err) {
    console.error('회원가입 중 오류 발생:', err);
    res.status(500).json({ success: false, message: '회원가입 실패', error: err });
  }
});

module.exports = router;
