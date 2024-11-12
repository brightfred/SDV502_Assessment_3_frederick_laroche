// NOTE - First, i set up the mock DOM environment 

document.body.innerHTML = `
    <div class="container">
        <form id="bookingForm">
            <input type="text" id="name" />
            <input type="text" id="destination" />
            <input type="number" id="seats" />
            <button type="submit">Book Ticket</button>
        </form>
        <p id="message"></p>
    </div>
`;



// NOTE - Here i import the functions from the script file that i want to test.

const { validateBooking, calculateFare, generateBookingMessage } = require('../src/script');





// NOTE - Describe block for the test suite
describe('Bus Ticket Booking System', () => {
    // NOTE - Before each test i runs, i reset all form values to empty with the beforeEach function
    beforeEach(() => {
        document.getElementById('name').value = '';
        document.getElementById('destination').value = '';
        document.getElementById('seats').value = '';
        document.getElementById('message').innerText = '';
    });



    // NOTE - Test Case 1

    test('Testing validateBooking function (valid and non valid input)', () => {
        // First, i set up test data 
        const name = 'Alex Herbert';
        const destination = 'Nelson';
        const zeroSeats = 0;
        const validSeatNumber = 1;
        const negativeSeatNumber = -1;
        
        // Then, i create different scenarios.
        const isItValidWithValidSeats = validateBooking(name, destination, validSeatNumber);
        const isItValidWithZeroSeats = validateBooking(name, destination, zeroSeats);
        const isItValidWithNegativeSeats = validateBooking(name, destination, negativeSeatNumber);
        const isValid = validateBooking(name, destination, validSeatNumber);
        const isMissingSeat = validateBooking(name, destination, zeroSeats);
        const isMissingName = validateBooking('', destination, validSeatNumber);
        const isMissingDestination = validateBooking(name, '', validSeatNumber);
        const isMissingNameAndDestination = validateBooking('', '', validSeatNumber);
        const isMissingSeatAndDestination = validateBooking(name, '', zeroSeats);
        const isMissingNameAndSeat = validateBooking('', destination, zeroSeats);
        const isMissingAll = validateBooking('', '', zeroSeats);
        
        // Finally, i check that it all return the expected result
        expect(isItValidWithValidSeats).toBe(true);
        expect(isItValidWithZeroSeats).toBe(false);
        expect(isItValidWithNegativeSeats).toBe(false);
        expect(isMissingSeat).toBe(false);
        expect(isMissingName).toBe(false);
        expect(isMissingDestination).toBe(false);
        expect(isMissingNameAndDestination).toBe(false);
        expect(isMissingSeatAndDestination).toBe(false);
        expect(isMissingNameAndSeat).toBe(false);
        expect(isMissingAll).toBe(false);
        expect(isValid).toBe(true);
    });




    // NOTE - Test Case 2

    test('Testing generateMessage function(Sucess and error)', () => {
        // First, i set up test data 
        const name = 'Alex Herbert';
        const destination = 'Nelson';
        const seats = 1;
        const zeroSeats = 0;
        const pricePerSeat = 10;
        
        // Then, i create different scenarios.
        const messageValid = generateBookingMessage(name, destination, seats, pricePerSeat);
        const messageMissingSeat = generateBookingMessage(name, destination, zeroSeats, pricePerSeat);
        const messageMissingName = generateBookingMessage('', destination, seats, pricePerSeat);
        const messageMissingDestination = generateBookingMessage(name, '', seats, pricePerSeat);
        const messageMissingAll = generateBookingMessage('', '', zeroSeats, pricePerSeat);
        
        // Finally, i check that it all return the expected result
        expect(messageValid).toBe(`Booking confirmed for Alex Herbert to Nelson. Seats: 1. Total fare: $10.`);
        expect(messageMissingSeat).toBe('Please fill in all fields correctly.');
        expect(messageMissingName).toBe('Please fill in all fields correctly.');
        expect(messageMissingDestination).toBe('Please fill in all fields correctly.');
        expect(messageMissingAll).toBe('Please fill in all fields correctly.');
    });

    
    
    // NOTE - Test Case 3
    // This check if it calculates the correct total price
    // based on the number of seats booked and the price per seat
    test('Calculation of the fare testing (Price per seat and expected total', () => {
        // First, i set up test data 
        const seats = 3;
        const pricePerSeat = 10;
        const expectedTotal = 30;
        // Then, i create a scenario
        const totalFare = calculateFare(seats, pricePerSeat);
        // Finally, i check that it all return the expected result
        expect(totalFare).toBe(expectedTotal);
    });
});