// server.js
const express = require('express');
const app = express();
const port = 3000;

app.get('/callback', (req, res) => {
    console.log('요청 쿼리 파라미터:', req.query);
    const code = req.query.code;

    if (code) {
        console.log('인증 코드:', code);
        res.send('Discord 인증이 완료되었습니다!');
    } else {
        res.send('인증 코드가 없습니다.');
    }
});


app.listen(port, () => {
    console.log(`서버가 실행 중입니다: http://localhost:${port}/callback`);
});


