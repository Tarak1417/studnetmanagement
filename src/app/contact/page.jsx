"use client";
import React,{useState} from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiry: "general",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here, like sending data to backend
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-4">Get in Touch</h1>
        <p className="text-center text-gray-600 mb-8">
          We’d love to hear from you! Whether you have a question about our
          resources, partnerships, or need support, feel free to reach out.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nature of Inquiry
            </label>
            <select
              name="inquiry"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.inquiry}
              onChange={handleChange}
            >
              <option value="general">General Query</option>
              <option value="partnership">Partnership</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              name="message"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
          >
            Send Message
          </button>
        </form>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p className="text-gray-600 mt-2">
            <strong>Email:</strong>{" "}
            <a href="mailto:support@freesourceedu.com" className="text-blue-500">
              support@freesourceedu.com
            </a>
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Phone:</strong> +123-456-7890
          </p>
          <p className="text-gray-600 mt-1">
            <strong>Addrss:</strong> 123 Free Source St., Education City, USA
          </p>
        </div>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.238423205605!2d144.95565131550412!3d-37.817313779751634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d47f4f1b05f%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1612135321130!5m2!1sen!2sin"
          width="100%"
          height="300"
          className="mt-8"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>

        <div className="mt-8 flex justify-center space-x-4">
          <a href="#">
            <img src="/facebook-icon.png" alt="Facebook" className="w-8 h-8" />
          </a>
          <a href="#">
            <img src="/twitter-icon.png" alt="Twitter" className="w-8 h-8" />
          </a>
          <a href="#">
            <img src="/linkedin-icon.png" alt="LinkedIn" className="w-8 h-8" />
          </a>
          <a href="#">
            <img src="/instagram-icon.png" alt="Instagram" className="w-8 h-8" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
