const request = require('supertest');
const expect = require('chai').expect;

const urlAuth = 'https://restful-booker.herokuapp.com/auth';
const urlGetBooking = 'https://restful-booker.herokuapp.com/booking/';
const urlCreateBooking = 'https://restful-booker.herokuapp.com/booking';
const bookingData = require('./data.json');

let newBookingId;
let token;
let header = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

describe('API Testing', () => {
    context('get token auth', () => {
      it('success', async () => {

        let response = await request(urlAuth).post('/').set(header).send({
            username: 'admin',
            password: 'password123'
        });
         console.log(response.body);
         expect(response.body).to.not.be.null;
         expect(response.body).to.have.property('token');
         token = response.body.token;

      })  
  
    });

     context('Create booking', () => {
      it('success', async () => {

        let response = await request(urlCreateBooking).post('/').set(header).send(bookingData);
         console.log("BODY RESPONSE:\n" + JSON.stringify(response.body, null, 2));
         expect(response).to.not.be.null;
         newBookingId = response.body.bookingid;

      })  
  
    });

     context('get booking', () => {
      it('success', async () => {

        let response = await request(urlGetBooking + newBookingId).get('/').set(header)
         console.log(response.body);
         expect(response.body).to.not.be.null;

         expect(response.body.firstname).to.equal(bookingData.firstname);
         expect(response.body.lastname).to.equal(bookingData.lastname);
         expect(response.body.totalprice).to.equal(bookingData.totalprice);
         expect(response.body.depositpaid).to.equal(bookingData.depositpaid);
         expect(response.body.bookingdates.checkin).to.equal(bookingData.bookingdates.checkin);
         expect(response.body.bookingdates.checkout).to.equal(bookingData.bookingdates.checkout);
         expect(response.body.additionalneeds).to.equal(bookingData.additionalneeds);
         

      })  
  
    });

     context('delete booking', () => {
      it('success', async () => {

        let deleteheader = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            };

        let response = await request(urlGetBooking + newBookingId).delete('/').set(deleteheader)
          .timeout({ response: 10000, deadline: 15000 });
         console.log(response.body);
         expect(response.body).to.not.be.null;

        let responseDeleted = await request(urlGetBooking + newBookingId).get('/').set(header)
         console.log(responseDeleted.body);
         expect(responseDeleted.body).to.not.have.property('firstname');

      })  
  
    });

    
});