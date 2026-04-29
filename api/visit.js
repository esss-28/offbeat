export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const time = new Date().toISOString();
  const userAgent = req.headers['user-agent'];

  await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'origin': 'http://localhost'
    },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      accessToken: process.env.EMAILJS_PRIVATE_KEY,
      template_params: {
        ip_address: ip,
        visit_time: time,
        user_agent: userAgent
      }
    })
  });

  res.status(200).json({ ok: true });
}