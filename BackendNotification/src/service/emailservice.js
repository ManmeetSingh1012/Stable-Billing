import nodemailer from "nodemailer";
// {data} used to destructure the data from the object
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

const send_low_stock_notification = async ({ information }) => {
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
    subject: "Low Stock Alert: Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <div style="border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px;">
          <h2 style="color: #007BFF;">Low Stock Notification</h2>
          <p>Dear Customer,</p>
          <p>We hope this email finds you well. We want to inform you that the stock for one of your monitored products is running low:</p>
          <div style="margin: 20px 0; padding: 15px; background: #f9f9f9; border: 1px solid #e0e0e0; border-radius: 8px;">

          

          
            <strong>Product Name:</strong> <span style="color: #D9534F;">${information.products}</span><br>
           
          </div>
          <p>We recommend taking immediate action to replenish the stock to avoid interruptions.</p>
          <p>If you have any questions or need further assistance, feel free to contact us.</p>
          <p>Warm regards,</p>
          <p><strong>The Stable Billing Company Team</strong></p>
        </div>
      </div>
    `,
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

export { send_low_stock_notification, send_mail };
