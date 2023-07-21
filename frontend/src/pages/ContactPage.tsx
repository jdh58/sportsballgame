import '../styles/ContactPage.css';

export default function ContactPage() {
  return (
    <main className="page contactPage">
      <div className="mainContainer">
        <section className="contactSection">
          <div className="contactHeader">
            <h1>Contact Us</h1>
            <p>
              Have any questions, suggestions, bug reports, or anything else
              you’d like to say? Please e-mail us at{' '}
              <a href="mailto:">sportsballgame@gmail.com</a>, or alternatively
              fill out the form below. We will get back to you as soon as
              possible. Thanks!
            </p>
          </div>
          <form action="">
            <legend>Contact Form</legend>
            <div className="inputContainer">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                minLength={1}
                maxLength={50}
                placeholder="John Doe"
              />
            </div>
            <div className="inputContainer">
              <label htmlFor="name">Your Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                maxLength={100}
                placeholder="abc@example.com"
              />
            </div>
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              placeholder="Your message..."
            />
          </form>
        </section>
      </div>
    </main>
  );
}
