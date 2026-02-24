import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

interface ResetPasswordDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	email: string;
}

export function ResetPasswordDialog({
	open,
	onOpenChange,
	email,
}: ResetPasswordDialogProps) {
	const [otp, setOtp] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const navigate = useNavigate();

	const handleReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (password !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		if (password.length < 8) {
			setError("Password must be at least 8 characters long.");
			return;
		}

		setIsSubmitting(true);

		try {
			const { error } = await authClient.emailOtp.resetPassword({
				email,
				otp,
				password,
			});

			if (error) {
				setError(
					error.message ?? "Failed to reset password. Please try again.",
				);
				return;
			}

			onOpenChange(false);
			// After resetting, we usually want them to log in with the new password
			// to ensure everything is synced, or we can just go home if better-auth
			// logs them in automatically (check behavior).
			navigate({ to: "/login" });
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-sm shadow-xl z-50 border border-gray-200">
					<Dialog.Title className="text-xl font-bold mb-2 text-gray-900">
						Set New Password
					</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600 mb-6">
						Enter the 6-digit code sent to{" "}
						<strong className="text-gray-900">{email}</strong> and choose a new
						password.
					</Dialog.Description>

					<form onSubmit={handleReset} className="space-y-4">
						<div>
							<label
								htmlFor="reset-otp"
								className="block text-sm font-medium mb-1 text-gray-700"
							>
								Verification Code
							</label>
							<input
								id="reset-otp"
								type="text"
								value={otp}
								onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
								placeholder="000000"
								maxLength={6}
								className="w-full border border-gray-300 rounded-md px-3 py-2 text-center tracking-widest font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="new-password"
								className="block text-sm font-medium mb-1 text-gray-700"
							>
								New Password
							</label>
							<input
								id="new-password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								required
							/>
						</div>

						<div>
							<label
								htmlFor="confirm-password"
								className="block text-sm font-medium mb-1 text-gray-700"
							>
								Confirm New Password
							</label>
							<input
								id="confirm-password"
								type="password"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								placeholder="••••••••"
								className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								required
							/>
						</div>

						{error && (
							<p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
								{error}
							</p>
						)}

						<button
							type="submit"
							disabled={otp.length !== 6 || !password || isSubmitting}
							className="w-full bg-blue-600 text-white rounded-md px-4 py-2.5 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
						>
							{isSubmitting ? "Resetting..." : "Update Password"}
						</button>
					</form>

					<Dialog.Close asChild>
						<button
							type="button"
							className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
							aria-label="Close"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
