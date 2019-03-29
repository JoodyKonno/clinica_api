const { Router } = require('express');
const moment = require('moment');

module.exports = (globals) => {
  const router = Router();

  router.get('/checkin/availabilities', function (req, res, next) {
    if (typeof req.query.start == 'undefined' || typeof req.query.end == 'undefined') {
      res
        .status(400)
        .json({
          errors: [
            'You must pass a start and en dates',
          ]
        });
    } else {
      next();
    }
  }, function (req, res) {
    const startDate = moment(req.query.start).format('YYYY-MM-DD');
    const endDate = moment(req.query.end).format('YYYY-MM-DD');

    const availabilities = globals.db.CheckinRulesModel.listAvailabilities(startDate, endDate);

    res
      .status(200)
      .json({
        data: availabilities.map(availability => {
          return {
            date: availability.date,
            intervals: availability.intervals.map(interval => {
              return {
                start: interval.start,
                end: interval.end,
              };
            })
          };
        })
      });
  });

  return router; 
}
