// Doctor data organized by specialty
const doctors = {
    cardiology: [
      { id: "dr-smith", name: "Dr. Smith" },
      { id: "dr-jones", name: "Dr. Jones" },
    ],
    dermatology: [
      { id: "dr-williams", name: "Dr. Williams" },
      { id: "dr-brown", name: "Dr. Brown" },
    ],
    neurology: [
      { id: "dr-davis", name: "Dr. Davis" },
      { id: "dr-miller", name: "Dr. Miller" },
    ],
    orthopedics: [
      { id: "dr-wilson", name: "Dr. Wilson" },
      { id: "dr-moore", name: "Dr. Moore" },
    ],
    pediatrics: [
      { id: "dr-taylor", name: "Dr. Taylor" },
      { id: "dr-anderson", name: "Dr. Anderson" },
    ],
  }
  
  // Form elements
  const bookingForm = document.getElementById("bookingForm")
  const specialtySelect = document.getElementById("specialty")
  const doctorSelect = document.getElementById("doctor")
  const toast = document.getElementById("toast")
  
  // Update doctors based on specialty selection
  specialtySelect.addEventListener("change", function () {
    const specialty = this.value
    const availableDoctors = doctors[specialty] || []
  
    // Reset doctor select
    doctorSelect.innerHTML = '<option value="">Select a doctor</option>'
  
    // Add doctors for selected specialty
    availableDoctors.forEach((doctor) => {
      const option = document.createElement("option")
      option.value = doctor.id
      option.textContent = doctor.name
      doctorSelect.appendChild(option)
    })
  })
  
  // Set minimum date for appointment to today
  const dateInput = document.getElementById("date")
  const today = new Date().toISOString().split("T")[0]
  dateInput.min = today
  
  // Form submission
  bookingForm.addEventListener("submit", (e) => {
    e.preventDefault()
  
    // Basic form validation
    const formData = new FormData(bookingForm)
    let isValid = true
    let errorMessage = ""
  
    // Validate name
    const name = formData.get("name")
    if (name.length < 2) {
      isValid = false
      errorMessage = "Name must be at least 2 characters long"
    }
  
    // Validate phone
    const phone = formData.get("phone")
    if (phone.length < 10) {
      isValid = false
      errorMessage = "Please enter a valid phone number"
    }
  
    if (!isValid) {
      showToast(errorMessage, "error")
      return
    }
  
    // Get selected doctor name
    const doctorName = doctorSelect.options[doctorSelect.selectedIndex].text
    const appointmentDate = new Date(formData.get("date")).toLocaleDateString()
  
    // Show success message
    showToast(`Appointment booked with ${doctorName} for ${appointmentDate}!`, "success")
  
    // Reset form
    bookingForm.reset()
  })
  
  // Toast notification function
  function showToast(message, type = "success") {
    toast.textContent = message
    toast.style.display = "block"
    toast.style.backgroundColor = type === "success" ? "#4caf50" : "#f44336"
  
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.style.display = "none"
    }, 3000)
  }
  
  