const moment = require('moment');

describe('Route /checkin/availabilities', () => {
  describe('GET /checkin/availabilities', () => {
    describe('when the start and end params are not given', () => {
      it('should return a bad request', () => {
        return request
          .get('/checkin/availabilities')
          .set('content-type', 'application/json')
          .expect(400);
      }); 
    });

    it('should return a list of availabilities', () => {
      const startDate = moment('2019-04-19').format('YYYY-MM-DD');
      const endDate = moment('2019-04-22').format('YYYY-MM-DD');
      
      return request
        .get(`/checkin/availabilities?start=${startDate}&end=${endDate}`)
        .set('content-type', 'application/json')
        .expect(200)
        .then(res => {
          const body = res.body;

          expect(body).to.have.property('data');

          expect(body.data).to.be.an('Array')
            .and.to.have.length(4);
        });
    });
  });
});