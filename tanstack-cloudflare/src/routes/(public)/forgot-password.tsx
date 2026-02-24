import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { ResetPasswordDialog } from "@/components/auth/reset-password-dialog";

const forgotPasswordSchema = z.object({
	email: z.string().email("Invalid email address"),
});

export const Route = createFileRoute("/(public)/forgot-password")({
	validateSearch: (search: Record<string, unknown>) => {
		return {
			email: typeof search.email === "string" ? search.email : undefined,
		};
	},
	component: ForgotPasswordComponent,
});

function ForgotPasswordComponent() {
	const { email: searchEmail } = Route.useSearch();
	const [otpDialogOpen, setOtpDialogOpen] = useState(false);
	const [formError, setFormError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: { email: searchEmail ?? "" },
		validators: { onChange: forgotPasswordSchema },
		onSubmit: async ({ value }) => {
			setFormError(null);

			const otpResult = await authClient.emailOtp.sendVerificationOtp({
				email: value.email,
				type: "forget-password",
			});

			if (otpResult.error) {
				setFormError(
					otpResult.error.message ??
						"Failed to send reset code. Please try again.",
				);
				return;
			}

			setOtpDialogOpen(true);
		},
	});

	return (
		<div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
			<div className="w-full max-w-sm p-8 border border-gray-200 rounded-lg shadow-sm bg-white">
				<div className="mb-6">
					<h1 className="text-2xl font-bold text-center text-gray-900">
						Reset Password
					</h1>
					<p className="mt-2 text-center text-sm text-gray-600">
						Enter your email address and we'll send you a code to reset your
						password.
					</p>
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
							Email Address
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
										autoFocus
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
								{isSubmitting ? "Sending Code..." : "Send Reset Code"}
							</button>
						)}
					</form.Subscribe>
				</form>

				<div className="mt-6 text-center text-sm text-gray-600">
					<Link
						to="/login"
						className="text-blue-600 font-medium hover:underline inline-flex items-center gap-1"
					>
						<svg
							className="w-4 h-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 19l-7-7m0 0l7-7m-7 7h18"
							/>
						</svg>
						Back to Login
					</Link>
				</div>
			</div>

			<ResetPasswordDialog
				open={otpDialogOpen}
				onOpenChange={setOtpDialogOpen}
				email={form.getFieldValue("email")}
			/>
		</div>
	);
}
