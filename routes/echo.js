const { Router } = require('express');

module.exports = (globals) => {
  const router = Router();

  router.get('/echo', function (req, res) {
    res
      .status(200)
      .json({
        data: 'Welcome to OZZZZZ'
      });
  });
 

  return router; 
}
