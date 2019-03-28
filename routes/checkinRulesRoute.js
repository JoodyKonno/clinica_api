const { Router } = require('express');

module.exports = (globals) => {
  const router = Router();

  router.post('/checkin/rules', function (req, res) {
    const newRule = {
      type: req.body.type,
      intervals: req.body.intervals.map(interval => {
        return {
          start: interval.start,
          end: interval.end
        };
      })
    };
    
    const response = globals.db.CheckinRulesModel.save(newRule);
    if (response) {
      res
        .status(201)
        .json({
          data: {
            href: globals.helpers.hypermedia.singleResource('checkin/rules', response.id)
          }
        })
    } else {
      res
        .status(400)
        .json({
          err: 'Bad Request'
        });
    }
  });

  router.delete('/checkin/rules/:id', function (req, res) {
    const response = globals.db.CheckinRulesModel.remove(req.params.id);

    if (response) {
      res
        .status(204)
        .json({});
    } else {
      res
        .status(400)
        .json({});
    }
  });

  return router; 
}
