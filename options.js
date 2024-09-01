document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll(".card .toggle input[type='checkbox']");

    // Load the saved state from localStorage for each checkbox
    checkboxes.forEach(checkbox => {
        const id = checkbox.id;
        const isChecked = localStorage.getItem(`checkboxChecked_${id}`) === "true";
        checkbox.checked = isChecked;

        // Notify if checkbox is checked on page load
        if (isChecked) {
            showNotification(`${id.replace('Checkbox', '')} Feature is Enabled `);
        }

        // Add event listener to update localStorage and notify on change
        checkbox.addEventListener("change", function() {
            localStorage.setItem(`checkboxChecked_${id}`, checkbox.checked);
            if (checkbox.checked) {
                showNotification(`${id.replace('Checkbox', '')} Feature is Enabled`);
            } else {
                showNotification(`${id.replace('Checkbox', '')} Feature is disabled`);
            }
        });
    });

    function showNotification(message) {
        const container = document.getElementById("notification-container");
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
        container.appendChild(notification);

        // Show the notification
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                container.removeChild(notification);
            }, 500);
        }, 3000);
    }
});


