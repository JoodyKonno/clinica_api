describe('Route /checkin/rules', () => {

  describe('POST /checkin/rules', () => {
    it('should save a new checkin rule', () => {
      return request
        .post('/checkin/rules')
        .send({
          type: 'daily',
          intervals: [
            {
              start: '09:00',
              end: '11:00',
            },
            {
              start: '13:00',
              end: '16:00',
            }
          ]
        })
        .set('content-type', 'application/json')
        .expect(201)
        .then(res => {
          const body = res.body;

          expect(body).to.have.property('data')

          expect(body.data).to.have.property('href');
        });
    });
  });

  describe('DELETE /checkin/rules/:id', () => {
    it('should delete a checkin rule', () => {
      return request
        .delete(`/checkin/rules/1`)
        .set('content-type', 'application/json')
        .expect(204);
    });
  });

  describe('GET /checkin/rules', () => {
    xit('should return the checkin rules', () => {

    });    
  });

});
