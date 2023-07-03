const path = require('path')
const express = require('express');
const dotenv = require('dotenv')
const pageRouter = require('./routes/pages')
const apiRouter = require('./routes/apis')
const app = express();
const port = 3000;

dotenv.config()
// 정적 리소스 경로 설정
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))

// 화면 engine 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// body-parser 적용
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// html을 떨구는 api
app.use(pageRouter)

// json을 떨구는 api
app.use('/api', apiRouter)

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
