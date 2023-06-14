const express = require('express');
const axios = require('axios')
const router = express.Router();

/**
 * 각 페이지에 필요한 정보가 있으면 이곳에서 셋팅해서 넘겨주자
 */

router.route('/movies')
  .get(async (req, res) => {
    const { searchWord } = req.query;
    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`
      }
    })

    if (response.status !== 200) {
      throw new Error('TMDB API Error 발생!!')
    }

    const { results: topRatedMovies } = response.data
    if (searchWord) {
      return res.json(topRatedMovies.filter((movie) => movie.title.includes(searchWord)))
    }

    return res.json(topRatedMovies)
  });

router.route('/movies')
  .post((req, res) => {
    const { movieName } = req.body
    console.log(movieName)
    res.json({})
  })

module.exports = router;
