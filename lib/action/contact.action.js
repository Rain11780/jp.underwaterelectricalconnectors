"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Resend } from "resend";

const r2 = new S3Client({
	region: "auto",
	endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
	}
});

export async function contact(formData) {
	try {
		const name = formData.get("name").trim();
		const company = formData.get("company").trim();
		const email = formData.get("email").trim();
		const phone = formData.get("phone").trim();
		const quantity = formData.get("quantity").trim();
		const message = formData.get("message").trim();
		const url = formData.get("url").trim();

		// File Upload
		const uploadedFiles = [];
		const fileEntries = Array.from(formData.entries()).filter(([key]) => key.startsWith("file_"));
		for (const [key, file] of fileEntries) {
			if (file && typeof file === "object" && "size" in file && file.size > 0) {
				const fileName = `${Date.now()}-${file.name || "unnamed_file"}`;
				const arrayBuffer = await file.arrayBuffer();
				const buffer = Buffer.from(arrayBuffer);
				await r2.send(
					new PutObjectCommand({
						Bucket: process.env.R2_BUCKET_NAME,
						Key: fileName,
						Body: buffer,
						ContentType: file.type || "application/octet-stream"
					})
				);
				const fileUrl = `https://${process.env.R2_PUBLIC_DOMAIN}/${fileName}`;
				uploadedFiles.push({ name: file.name, url: fileUrl });
			}
		}

		// Email Send
		const resend = new Resend(process.env.RESEND_API_KEY);
		await resend.emails.send({
			from: "info <info@replicamotorcyclegear.com>",
			to: ["rain@rideglove.com"],
			subject: `New Quote Request - ${email}`,
			html: `
				<h2>New Quote Request</h2>
				${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
				${company && company !== "Not provided" ? `<p><strong>Company:</strong> ${company}</p>` : ""}
				${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
				${phone && phone !== "Not provided" ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
				${quantity && quantity !== "Not specified" ? `<p><strong>Purchase Quantity:</strong> ${quantity}</p>` : ""}
				${message ? `<p><strong>Message:</strong> ${message}</p>` : ""}
				${url ? `<p><strong>URL:</strong> ${url}</p>` : ""}
				${uploadedFiles.length > 0 ? `<p><strong>Files:</strong></p><ul>${uploadedFiles.map((file) => `<li><a href="${file.url}">${file.name}</a></li>`).join("")}</ul>` : ""}
				<p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
			`.trim()
		});
		return { success: true, message: "Thank you for your message, we will get back to you shortly." };
	} catch (error) {
		console.error("Contact action error:", error);
		return { success: false, message: "Failed to process your request" };
	}
}
