import nodemailer from "nodemailer";

export default async function sendNotification(contact) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_NOTIFY_EMAIL } =
    process.env;
  if (!SMTP_HOST || !CONTACT_NOTIFY_EMAIL) return; // nothing configured

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const info = await transporter.sendMail({
    from: CONTACT_NOTIFY_EMAIL,
    to: CONTACT_NOTIFY_EMAIL,
    subject: `New contact from ${contact.name}`,
    text: `Name: ${contact.name}\nEmail: ${contact.email}\nMessage:\n${contact.message}`,
  });

  return info;
}
