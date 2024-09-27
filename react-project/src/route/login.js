const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../../db'); // 데이터베이스 연결 불러오기
require('dotenv').config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/', (req, res) => {
  const { userId, password } = req.body;
  const query = 'SELECT * FROM user WHERE user_id = ?';

  db.query(query, [userId], async (err, results) => {
    if (err) {
      console.error('Query error:', err);
      return res.status(500).json({ success: false, message: '서버 오류' });
    }

    if (results.length > 0) {
      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
    
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.user_id }, JWT_SECRET, { expiresIn: '1h' });
        console.log(`로그 : 로그인 성공 - ${new Date().toLocaleString()}, 토큰: ${token}`);
        return res.json({ success: true, message: '로그인 성공', token });
      } else {
        // 비밀번호 불일치 로그
        console.error(`로그 : 로그인 실패 - ${new Date().toLocaleString()}, 사용자: ${user.user_id}, message : 잘못된 비밀번호`);
        return res.status(401).json({ success: false, message: '로그인 실패: 잘못된 비밀번호' });
      }
    } else {
      // 사용자 없음 로그
      console.error(`로그 : 로그인 실패 - ${new Date().toLocaleString()}, message : 사용자 없음`);
      return res.status(401).json({ success: false, message: '로그인 실패: 사용자 없음' });
    }
  });
});

module.exports = router;
