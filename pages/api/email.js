const mail = require('@sendgrid/mail');

mail.setApiKey(SENDGRID_API_KEY);

export default function handler(req, res) {
    const body = JSON.parse(req.body)

    const message = `Thank you for reaching out to us.\r\n We have received your request and will contact with further procedures.\r\n
    Name: ${body.name}\r\nEmail: ${body.email}\r\nContact Number: ${body.contactNo}`

    const data = {
        to: `${body.email}`,
        from: 'propmarketplace@gmail.com',
        subject: 'Property Marketplace Confirmation',
        text: message,
        html: message.replace(/\r\n/g, '<br>')
    }

    mail.send(data);

    res.status(200).json({ status: 'Ok' })
}
