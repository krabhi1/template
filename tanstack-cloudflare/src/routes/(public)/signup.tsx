import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { GoogleButton } from "@/components/auth/google-button";
import { OtpDialog } from "@/components/auth/otp-dialog";

const signupSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must contain at least one uppercase letter"),
});

export const Route = createFileRoute("/(public)/signup")({
	component: SignupComponent,
});

function SignupComponent() {
	const [otpDialogOpen, setOtpDialogOpen] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: { name: "", email: "", password: "" },
		validators: { onChange: signupSchema },
		onSubmit: async ({ value }) => {
			setFormError(null);

			const signUpResult = await authClient.signUp.email({
				email: value.email,
				password: value.password,
				name: value.name,
			});

			if (!signUpResult.error) {
				const otpResult = await authClient.emailOtp.sendVerificationOtp({
					email: value.email,
					type: "email-verification",
				});

				if (otpResult.error) {
					setFormError(
						otpResult.error.message ??
							"Failed to send verification code. Please try again.",
					);
					return;
				}

				setOtpDialogOpen(true);
				return;
			}

			if (signUpResult.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
				setFormError("Account already exists. Redirecting to login...");
				setTimeout(() => {
					navigate({
						to: "/login",
						search: { email: value.email },
					});
				}, 2000);
				return;
			}

			setFormError(
				signUpResult.error.message ?? "Unable to sign up. Please try again.",
			);
		},
	});

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
			<div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm bg-white">
				<h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
					Create an Account
				</h1>

				<GoogleButton text="Sign up with Google" onError={setFormError} />

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
						<label className="block text-sm font-medium mb-1 text-gray-700">
							Name
						</label>
						<form.Field
							name="name"
							children={(field) => (
								<>
									<input
										type="text"
										value={field.state.value}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="John Doe"
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
						<label className="block text-sm font-medium mb-1 text-gray-700">
							Email
						</label>
						<form.Field
							name="email"
							children={(field) => (
								<>
									<input
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
						<label className="block text-sm font-medium mb-1 text-gray-700">
							Password
						</label>
						<form.Field
							name="password"
							children={(field) => (
								<>
									<input
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
								{isSubmitting ? "Creating Account..." : "Sign Up"}
							</button>
						)}
					</form.Subscribe>
				</form>

				<p className="mt-6 text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link
						to="/login"
						className="text-blue-600 font-medium hover:underline"
					>
						Login
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
