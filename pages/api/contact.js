import nodemailer from "nodemailer";

export default async (req, res) => {
	const { nombre, email, mensaje, empresa } = req.body;

	const transporter = nodemailer.createTransport({
		host: "smtp.office365.com",
		port: 587,
        secure: true,
		auth: {
			user: process.env.USER,
			pass: process.env.PASS,
		},
	});

	try {
		const emailRes = await transporter.sendMail({
			from: email,
			to: "support@9145217.hubspot-inbox.com",
			subject: `Formulario de contacto ${nombre}`,
			html: `<p>Tienes un nuevo contacto desde la pagina web </p><br>
        <p><strong>Nombre: </strong> ${nombre} </p><br>
        <p><strong>Telefono: </strong> ${empresa} </p><br>
        <p><strong>Message: </strong> ${mensaje} </p><br>`,
		});

		console.log("Mensaje enviado", emailRes.mensajeId);
	} catch (err) {
		console.log(err);
	}

	res.status(200).json(req.body);
};
