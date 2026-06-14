document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card').forEach(card => card.classList.add('fade-in'));

  document.querySelectorAll('.alert').forEach(alert => {
    setTimeout(() => new bootstrap.Alert(alert).close(), 5000);
  });

  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
});
