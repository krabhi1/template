import { env } from "cloudflare:workers";
import { Resend } from "resend";
import { VerifyEmailTemplate } from "./template";
import { render } from "@react-email/render";
const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerifyEmail(email: string, otp: string) {
	try {
		const html = await render(<VerifyEmailTemplate otp={otp} />);
		const data = await resend.emails.send({
			from: "Demo App <support@mail.krabhi.me>",
			to: email,
			subject: "Verify Your Email",
			html,
		});
	} catch (error) {
		console.error("Error sending email:", error);
	}
}
