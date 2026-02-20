document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const statusDiv = document.getElementById('status');

  if (!form) return;

  const showThankYouPopup = () => {
    const existing = document.getElementById('thankYouPopup');
    if (existing) {
      existing.remove();
    }

    const popup = document.createElement('div');
    popup.id = 'thankYouPopup';
    popup.className = 'thank-you-popup';
    popup.innerHTML = `
      <div class="thank-you-card">
        <button type="button" class="thank-you-close" aria-label="Close">&times;</button>
        <div class="thank-you-icon">&#10003;</div>
        <h4>Thank You</h4>
        <p>Thank you for your response. We will connect as soon as possible.</p>
      </div>
    `;

    document.body.appendChild(popup);

    const closeBtn = popup.querySelector('.thank-you-close');
    closeBtn?.addEventListener('click', () => popup.remove());

    setTimeout(() => {
      popup.classList.add('show');
    }, 10);

    setTimeout(() => {
      popup.remove();
    }, 4500);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: form.name?.value || '',
      email: form.email?.value || '',
      subject: form.subject?.value || '',
      message: form.message?.value || ''
    };

    if (statusDiv) {
      statusDiv.textContent = '';
    }

    try {
      await fetch('/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (_) {}

    form.reset();
    showThankYouPopup();
  });
});

