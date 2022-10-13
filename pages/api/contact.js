import nodemailer from "nodemailer";

export default async (req, res) => {
	const { nombre, email, telefono, empresa, mensaje } = req.body;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: `${process.env.NEXT_PUBLIC_API_EMAIL}`,
			pass: `${process.env.NEXT_PUBLIC_API_PASS}`,
		},
	});

	try {
		const emailRes = await transporter.sendMail({
			from: "Formulario contatacto uancamilo",
			to: "support@23135118.hubspot-inbox.com",
			subject: `Formulario de contacto de ${nombre}`,
			html: `<p>Tienes un nuevo mensaje desde la pagina web</p><br>
			<p><strong>Nombre: </strong> ${nombre} </p><br>
			<p><strong>Email: </strong> ${email} </p><br>
			<p><strong>Empresa: </strong> ${empresa} </p><br>
			<p><strong>Teléfono: </strong> ${telefono} </p><br>
			<p><strong>Mensaje: </strong> ${mensaje} </p><br>`,
		});
	} catch (err) {
		console.log(err);
	}

	res.status(200).json(req.body);
};
