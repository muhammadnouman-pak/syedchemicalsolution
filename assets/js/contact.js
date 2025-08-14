// Contact form functionality
function submitContactForm(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const contactData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    timestamp: new Date().toISOString(),
  }

  // Save to localStorage (in a real app, you'd send to a server)
  const contacts = JSON.parse(localStorage.getItem("contacts") || "[]")
  contacts.push(contactData)
  localStorage.setItem("contacts", JSON.stringify(contacts))

  // Show success message
  if (typeof showNotification !== "undefined") {
    showNotification("Thank you for your message! We will get back to you soon.")
  } else {
    console.error("showNotification function is not defined.")
  }

  // Reset form
  event.target.reset()
}

// Show notification function (if not already defined)
function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.remove()
  }, 3000)
}
