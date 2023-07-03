const express = require('express');
const router = express.Router();

/**
 * 각 페이지에 필요한 정보가 있으면 이곳에서 셋팅해서 넘겨주자
 */

router.route('/')
  .get((req, res) => {
    return res.render('pages/index.html');
  });

module.exports = router;
