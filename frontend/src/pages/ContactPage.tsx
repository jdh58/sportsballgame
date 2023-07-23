import Button from '../components/Button';

import Send from '../assets/send.svg';
import '../styles/ContactPage.css';
import { FormEventHandler, useState } from 'react';

export default function ContactPage() {
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const onFormSubmit = async (e) => {
    e.preventDefault();

    // Save the values
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const email = form.elements.email.value;
    const message = form.elements.message.value;

    // Wipe the values and set the button to disabled
    form.elements.name.value = '';
    form.elements.email.value = '';
    form.elements.message.value = '';

    // Save them in the server
    const response = await fetch(
      'https://sportsballgame.onrender.com/api/form/message/submit',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      }
    );

    // Let the user know where their message went
    if (response.ok) {
      setFormMessage('Message sent!');
    } else {
      setFormMessage(
        'Message failed to send. Make sure you filled it out correctly, or try emailing us!'
      );
    }
  };

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
          <form action="" onSubmit={onFormSubmit}>
            <legend>Contact Form</legend>
            <div className="inputContainer">
              <label htmlFor="name">Your Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required={true}
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
              required={true}
            />
            {formMessage && <div className="formMessage">{formMessage}</div>}
            <Button
              label="Send"
              type="submit"
              icon={Send}
              classes="small"
              disabled={false}
              onClick={undefined}
            />
          </form>
        </section>
      </div>
    </main>
  );
}
