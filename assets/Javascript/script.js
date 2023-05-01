var todayDay = moment().format("dddd, MMMM Do");

$("#currentDay").text(todayDay);

function updateTimeBlocks() {
	// Get the current hour
	var currentHour = moment().hour();

	// Loop through each time block
	$(".hour").each(function () {
		// Get the hour of the time block
		var hour = parseInt($(this).text().trim().split(" ")[0]);

		// Convert to 24-hour format
		var hour24 = hour === 12 && $(this).text().includes("AM") ? 0 : hour;
		var hour24Format = $(this).text().includes("PM") ? hour24 + 12 : hour24;
		if (hour24Format === 24) {
			hour24Format = 12;
		}

		// Get the time block element
		var timeBlock = $(this).siblings(".description");

		// Add the appropriate class based on the current time
		if (hour24Format < currentHour) {
			timeBlock.removeClass("present future").addClass("past");
		} else if (hour24Format === currentHour) {
			timeBlock.removeClass("past future").addClass("present");
		} else {
			timeBlock.removeClass("past present").addClass("future");
		}
	});
}
