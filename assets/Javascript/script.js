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

$(document).ready(function () {
	// Update the time blocks when the page loads
	updateTimeBlocks();

	// Update the time blocks every minute
	setInterval(updateTimeBlocks, 60000);

	// Load saved data from local storage
	$("input.description").each(function () {
		var inputId = $(this).attr("id");
		var savedValue = localStorage.getItem(inputId);
		if (savedValue) {
			$(this).val(savedValue);
		}
	});

	// Save input changes to local storage
	$("button.saveBtn").on("click", function (event) {
		event.preventDefault();
		var inputId = $(this).siblings("input.description").attr("id");
		var inputValue = $(this).siblings("input.description").val();
		localStorage.setItem(inputId, inputValue);

		// Change the text of the span element
		$("span.confirm").html(
			"Appointment Added to <span style='color: red;'>LocalStorage</span> ✔"
		);

		// Set a timeout to change the text back to its original value after 2 seconds
		setTimeout(function () {
			$("span.confirm").text("");
		}, 2000);
	});
});
