import nodemailer from "nodemailer";

const send_mail = async (information) => {
  console.log("control is here" + information.email);

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "manmeetsinghnss@gmail.com",
      pass: "jtbz vjak lfft dlyu", // Use an App Password here
    },
  });

  // Email data
  const mailOptions = {
    from: "manmeetsinghnss@gmail.com",
    to: `${information.email}`,
    subject: "Invoice from Stable Billing Company",
    text: `Dear Customer,\n\nThank you for choosing Stable Billing Company.\n\nPlease find your invoice attached to this email for your reference. If you have any questions or need further assistance, feel free to contact us.\n\nWarm regards,\nThe Stable Billing Company Team`,
    attachments: [
      {
        filename: information.filename,
        path: information.path,
      },
    ],
  };

  //console.log("control is here 2");

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info.response;
  } catch (error) {
    console.error("Error sending email:", error);
    return error;
  }

  //   console.log("control ends here");
};

export default send_mail;
