"use server";

import { Resend } from "resend";

export async function subscription(formData) {
	try {
		const email = formData.get("email")?.toString();
		const url = formData.get("url")?.toString();

		if (!email || !url) {
			return { success: false, message: "Please enter your email." };
		}

		const resend = new Resend(process.env.RESEND_API_KEY);

		// send email to the user
		await resend.emails.send({
			from: "info <info@replicamotorcyclegear.com>",
			to: ["rain@rideglove.com"],
			subject: `New Subscriber - ${email}`,
			html: `<p>Email: ${email}</p><p>URL: ${url}</p>`
		});
		return { success: true, message: "Subscribe successful." };
	} catch (error) {
		console.error("Subscription error:", error);
		return { success: false, message: "Subscribe failed, please try again later." };
	}
}
