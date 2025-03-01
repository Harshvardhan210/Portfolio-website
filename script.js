// Mobile Menu Toggle
const menuBtn = document.querySelector(".menu-btn")
const nav = document.querySelector("nav")

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active")
})

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll("nav ul li a")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active")
  })
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()

    const targetId = this.getAttribute("href")
    if (targetId === "#") return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Active navigation based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll("nav ul li a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    const headerHeight = document.querySelector("header").offsetHeight

    if (window.pageYOffset >= sectionTop - headerHeight - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Testimonial Slider
const testimonialItems = document.querySelectorAll(".testimonial-item")
const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
let currentTestimonial = 0

// Show only the active testimonial
function showTestimonial(index) {
  testimonialItems.forEach((item) => item.classList.remove("active"))
  testimonialItems[index].classList.add("active")
}

// Next testimonial
nextBtn.addEventListener("click", () => {
  currentTestimonial++
  if (currentTestimonial >= testimonialItems.length) {
    currentTestimonial = 0
  }
  showTestimonial(currentTestimonial)
})

// Previous testimonial
prevBtn.addEventListener("click", () => {
  currentTestimonial--
  if (currentTestimonial < 0) {
    currentTestimonial = testimonialItems.length - 1
  }
  showTestimonial(currentTestimonial)
})

// Form submission
const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Get form values
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const subject = document.getElementById("subject").value
    const message = document.getElementById("message").value

    // Here you would typically send the form data to a server
    // For demonstration, we'll just log it and show an alert
    console.log({ name, email, subject, message })

    // Show success message
    alert("Thank you for your message! I will get back to you soon.")

    // Reset form
    contactForm.reset()
  })
}

// Project cards animation
function animateProjectCards() {
  const projectCards = document.querySelectorAll(".project-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate")
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    },
  )

  projectCards.forEach((card) => {
    observer.observe(card)
  })
}

// Call the project cards animation function when the page loads
window.addEventListener("load", animateProjectCards)

// Add animation on scroll for other elements
window.addEventListener("load", () => {
  const animatedElements = document.querySelectorAll(".skill-card, .internship-card, .certification-card")

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1
          entry.target.style.transform = "translateY(0)"
        }
      })
    },
    { threshold: 0.1 },
  )

  animatedElements.forEach((element) => {
    element.style.opacity = 0
    element.style.transform = "translateY(20px)"
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease"
    observer.observe(element)
  })
})

