const assistantToggle = document.getElementById('assistantToggle');
const assistantPanel = document.getElementById('assistantPanel');
const assistantClose = document.getElementById('assistantClose');
const assistantForm = document.getElementById('assistantForm');
const assistantMessages = document.getElementById('assistantMessages');
const assistantInput = document.getElementById('assistantInput');
const assistantStart = document.getElementById('assistantStart');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

function openAssistant() {
  assistantPanel.classList.remove('hidden');
  assistantPanel.setAttribute('aria-hidden', 'false');
  assistantInput.focus();
  if (!assistantMessages.hasChildNodes()) {
    addAssistantMessage('system', 'Hi there! I am your virtual assistant. Ask me about our services, courses, photos, or how to get in touch.');
  }
}

function closeAssistant() {
  assistantPanel.classList.add('hidden');
  assistantPanel.setAttribute('aria-hidden', 'true');
}

function addAssistantMessage(type, text) {
  const messageEl = document.createElement('div');
  messageEl.className = `assistant-message ${type}`;
  const bubble = document.createElement('div');
  bubble.className = 'assistant-bubble';
  bubble.textContent = text;
  messageEl.appendChild(bubble);
  assistantMessages.appendChild(messageEl);
  assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

function getAssistantReply(message) {
  const cleaned = message.trim().toLowerCase();
  if (!cleaned) {
    return 'Please type a question or let me know how I can help you.';
  }

  const keywords = {
    hello: ['hello', 'hi', 'hey', 'greetings'],
    services: ['service', 'services', 'offer', 'solution'],
    courses: ['course', 'courses', 'learn', 'training'],
    photos: ['photo', 'photos', 'gallery', 'portfolio'],
    contact: ['contact', 'email', 'phone', 'reach'],
    pricing: ['price', 'pricing', 'cost', 'quote'],
    help: ['help', 'guide', 'assist', 'support'],
  };

  if (keywords.hello.some(word => cleaned.includes(word))) {
    return 'Hello! I can walk you through our services, show course options, or tell you how to contact us.';
  }
  if (keywords.services.some(word => cleaned.includes(word))) {
    return 'We offer web design, digital marketing, photography, and consultation services. If you want a recommendation, tell me what goal you have.';
  }
  if (keywords.courses.some(word => cleaned.includes(word))) {
    return 'Our courses cover digital skills, photography fundamentals, and design basics. Let me know what skill you want to build.';
  }
  if (keywords.photos.some(word => cleaned.includes(word))) {
    return 'Our photo section highlights brand shoots, teamwork, and creative process visuals. Feel free to explore the gallery and share what style you like.';
  }
  if (keywords.contact.some(word => cleaned.includes(word))) {
    return 'You can contact us by email at hello@aradhyainnovations.com or by phone at +91 98765 43210. I am also here to answer your questions directly.';
  }
  if (keywords.pricing.some(word => cleaned.includes(word))) {
    return 'Pricing depends on the service and scope. I recommend reaching out with your details so we can share a tailored estimate.';
  }
  if (keywords.help.some(word => cleaned.includes(word))) {
    return 'Just tell me what you are looking for: a service, a course, or help contacting us. I can guide you to the right section.';
  }

  return 'I am here to help! Ask me about our services, courses, photos, or how to contact us. If you would like, type "services" or "courses" to start.';
}

assistantToggle.addEventListener('click', openAssistant);
if (assistantStart) {
  assistantStart.addEventListener('click', openAssistant);
}
assistantClose.addEventListener('click', closeAssistant);

assistantForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const userMessage = assistantInput.value.trim();
  if (!userMessage) {
    return;
  }
  addAssistantMessage('user', userMessage);
  assistantInput.value = '';
  const reply = getAssistantReply(userMessage);
  setTimeout(() => addAssistantMessage('system', reply), 300);
});

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name && email && message) {
      if (formFeedback) {
        formFeedback.textContent = `Thanks, ${name}! Your message has been sent. We'll respond to ${email} soon.`;
      }
      contactForm.reset();
    } else if (formFeedback) {
      formFeedback.textContent = 'Please complete all fields before sending your message.';
    }
  });
}
