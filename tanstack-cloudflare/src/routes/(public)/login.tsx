import {
	createFileRoute,
	Link,
	useNavigate,
	redirect,
} from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GoogleButton } from "@/components/auth/google-button";
import { OtpDialog } from "@/components/auth/otp-dialog";

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

export const Route = createFileRoute("/(public)/login")({
	beforeLoad: ({ context }) => {
		// if (context.session) {
		// 	throw redirect({ to: "/" });
		// }
	},
	component: LoginComponent,
});

function LoginComponent() {
	const [otpDialogOpen, setOtpDialogOpen] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: { email: "", password: "" },
		validators: { onChange: loginSchema },
		onSubmit: async ({ value }) => {
			setFormError(null);

			const { error } = await authClient.signIn.email({
				email: value.email,
				password: value.password,
			});

			if (error) {
				// Handle unverified email by triggering OTP flow
				if (error.code === "EMAIL_NOT_VERIFIED") {
					const otpResult = await authClient.emailOtp.sendVerificationOtp({
						email: value.email,
						type: "email-verification",
					});

					if (otpResult.error) {
						setFormError(
							otpResult.error.message ?? "Failed to send verification code.",
						);
						return;
					}

					setOtpDialogOpen(true);
					return;
				}

				setFormError(error.message ?? "Invalid email or password.");
				return;
			}

			navigate({ to: "/" });
		},
	});

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
			<div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm bg-white">
				<h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
					Welcome Back
				</h1>

				<GoogleButton text="Login with Google" onError={setFormError} />

				<div className="relative my-6">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t border-gray-200" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white px-2 text-gray-500">
							Or continue with email
						</span>
					</div>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					{formError && (
						<p
							className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100"
							role="alert"
						>
							{formError}
						</p>
					)}

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium mb-1 text-gray-700"
						>
							Email
						</label>
						<form.Field
							name="email"
							children={(field) => (
								<>
									<input
										id="email"
										type="email"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="name@example.com"
										className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 && (
										<p className="text-red-500 text-xs mt-1">
											{field.state.meta.errors
												.map((err) => err?.message ?? err)
												.join(", ")}
										</p>
									)}
								</>
							)}
						/>
					</div>

					<div>
						<div className="flex items-center justify-between mb-1">
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700"
							>
								Password
							</label>
							<Link
								to="/forgot-password"
								search={{ email: form.getFieldValue("email") }}
								className="text-xs font-medium text-blue-600 hover:underline focus:outline-none"
							>
								Forgot password?
							</Link>
						</div>
						<form.Field
							name="password"
							children={(field) => (
								<>
									<input
										id="password"
										type="password"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="••••••••"
										className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 && (
										<p className="text-red-500 text-xs mt-1">
											{field.state.meta.errors
												.map((err) => err?.message ?? err)
												.join(", ")}
										</p>
									)}
								</>
							)}
						/>
					</div>

					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
					>
						{([canSubmit, isSubmitting]) => (
							<button
								type="submit"
								disabled={!canSubmit || isSubmitting}
								className="w-full bg-blue-600 text-white rounded-md px-3 py-2 font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
							>
								{isSubmitting ? "Logging in..." : "Login"}
							</button>
						)}
					</form.Subscribe>
				</form>

				<p className="mt-6 text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link
						to="/signup"
						className="text-blue-600 font-medium hover:underline"
					>
						Sign up
					</Link>
				</p>
			</div>

			<OtpDialog
				open={otpDialogOpen}
				onOpenChange={setOtpDialogOpen}
				email={form.getFieldValue("email")}
			/>
		</div>
	);
}
