document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const destination = document.getElementById("destination").value;
    const seats = parseInt(document.getElementById("seats").value, 10);

    // Constants
    const pricePerSeat = 10;

    // Validation
    if (name && destination && seats > 0) {
        // Calculate fare
        const totalFare = seats * pricePerSeat;

        // Display confirmation message
        document.getElementById("message").innerText = 
            `Booking confirmed for ${name} to ${destination}. Seats: ${seats}. Total fare: $${totalFare}.`;
    } else {
        // Display error message if inputs are invalid
        document.getElementById("message").innerText = 
            "Please fill in all fields correctly.";
    }
});

// Export functions for testing
if(typeof module !== 'undefined') {
    module.exports = {


        // I use this function to validate the booking details(name, destination, seats)
        // in my test, i will check if the function returns true when all fields are filled or false 
        // when any field is empty using the && operator and the ternary operator(?) to return true or false
        validateBooking: function(name, destination, seats) {
        return (name && destination && seats > 0) ? true : false;
        },


        // I use this function to calculate the fare based on the number of seats and the price per seat
        // in my test, i will check if the fare is correctly calculated
        calculateFare: function(seats, pricePerSeat) {
            return seats * pricePerSeat;
        },

        
        // I use this function to generate the message to be displayed after a booking is confirmed
        // in my test , i will check if the message is correctly set up with the right values
        // 
        generateBookingMessage: function(name, destination, seats, totalFare) {
            if (name && destination && seats > 0) {
                return `Booking confirmed for ${name} to ${destination}. Seats: ${seats}. Total fare: $${totalFare}.`;
            } else {
                return "Please fill in all fields correctly.";
            }
        }
    };
}