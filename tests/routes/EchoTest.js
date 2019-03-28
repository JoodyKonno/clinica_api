describe("Route /echo", () => {

  describe("GET /echo", () => {

    it("should return a warm welcome message", () => {
      return request
        .get('/echo')
        .set('Content-type', 'application/json')
        .expect(200)
        .then((res) => {
          const body = res.body;

          expect(body).to.be.an('Object')
            .and.to.have.property('data');

          const data = body.data;

          expect(data).to.be.an('String')
            .and.to.be.equals('Welcome to OZZZZZ');
        })
    });

  });

});
