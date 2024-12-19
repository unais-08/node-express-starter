const fetchdata = async () => {
  const btn = document.getElementById("btn");
  const container = document.getElementById("employee-container");

  btn.textContent = "Loading..."; // Update button text during fetch
  btn.disabled = true; // Disable button to prevent multiple clicks

  try {
    const resp = await fetch("http://localhost:8000/api/employees");
    if (!resp.ok) {
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }
    const data = await resp.json();

    // Efficient DOM update
    const currentIds = Array.from(container.children).map(
      (child) => child.dataset.id
    );
    const newIds = data.map((employee) => employee.emp_id.toString());

    // Remove elements that are no longer in the data
    currentIds.forEach((id) => {
      if (!newIds.includes(id)) {
        const element = container.querySelector(`[data-id="${id}"]`);
        if (element) element.remove();
      }
    });

    // Add or update elements from the new data
    data.forEach((employee) => {
      let employeeCard = container.querySelector(
        `[data-id="${employee.emp_id}"]`
      );

      if (!employeeCard) {
        // Create new card if not present
        employeeCard = document.createElement("div");
        employeeCard.classList.add("employee-card");
        employeeCard.dataset.id = employee.emp_id; // Add data attribute
        container.appendChild(employeeCard);
      }

      // Update card content
      employeeCard.innerHTML = `
          <h2>${employee.name}</h2>
          <p><strong>Company:</strong> ${employee.company_name}</p>
          <p><strong>Email:</strong> <a href="mailto:${employee.email}">${employee.email}</a></p>
        `;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML =
      "<p>Error loading employees. Please try again later.</p>";
  } finally {
    btn.textContent = "Load API"; // Reset button text
    btn.disabled = false; // Re-enable button
  }
};
fetch("http://localhost:8000/api/employees/13")
  .then((response) => response.json()) // Convert the response to JSON
  .then((data) => console.log(data)) // Handle the data after parsing
  .catch((error) => console.error("Error:", error)); // Handle any errors

// Attach event listener to the button
const btn = document.getElementById("btn");
btn.addEventListener("click", fetchdata);
