/* user input form: send to Google Sheet, then show thank-you dialog */
const scriptURL = "[PASTE WEB URL HERE]";
const contactForm = document.getElementById("contactFormEl");

if ([INSERT SHEET NAME]) {
  [INSERT SHEET NAME].addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData([INSERT SHEET NAME]);

    fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(response => {
        document.getElementById("[INSERT SHEET NAME]").style.display = "none";
        document.getElementById("thankYouDialog").showModal();
      })
      .catch(error => {
        alert("There was an error sending your message. Please try again later.");
      });
  });
}
