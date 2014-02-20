var temper1 = require('temper1-connector');





/**
 * Send the data of temper1 to other systems. 
 */
function TemperServer() {
  // The temperature from the connected sensor
  this.temperature = 0;
}



/**
 * Connect to the USB devices.
 */
TemperServer.prototype.connect = function() {
  // Connect to USB thermometer
  temper1.connect();

  // Get data from the sensor every x ms
  setInterval(function() {
    // Send a command to the sensor
    var message = temper1.command("read", this.update.bind(this));

    // Display a message if not connected to the sensor 
    if (message === "not connected") {
      console.log("not connected");
    }

  }.bind(this), 500);
};




/**
 * Save the temperature of the sensor. 
 */
TemperServer.prototype.update = function(temperature) {
  this.temperature = temperature;
};





/**
 * Export the module so that others can use it
 */ 
module.exports = new TemperServer();