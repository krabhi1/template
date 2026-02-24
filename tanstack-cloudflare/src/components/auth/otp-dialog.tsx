import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { authClient } from "@/lib/auth-client";

interface OtpDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	email: string;
}

export function OtpDialog({ open, onOpenChange, email }: OtpDialogProps) {
	const [otp, setOtp] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isVerifying, setIsVerifying] = useState(false);
	const navigate = useNavigate();

	const handleVerify = async () => {
		setError(null);
		setIsVerifying(true);

		try {
			// Using signIn.emailOtp as it verifies and logs the user in simultaneously
			const { error } = await authClient.signIn.emailOtp({
				email,
				otp,
			});

			if (error) {
				setError(error.message ?? "Verification failed. Please try again.");
				return;
			}

			onOpenChange(false);
			navigate({ to: "/" });
		} catch (err) {
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setIsVerifying(false);
		}
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
				<Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-sm shadow-xl z-50 border border-gray-200">
					<Dialog.Title className="text-xl font-bold mb-2 text-gray-900">
						Verify Your Email
					</Dialog.Title>
					<Dialog.Description className="text-sm text-gray-600 mb-6">
						We've sent a 6-digit verification code to{" "}
						<strong className="text-gray-900">{email}</strong>. Please enter it
						below to continue.
					</Dialog.Description>

					<div className="space-y-6">
						<div>
							<label
								htmlFor="otp"
								className="block text-sm font-medium mb-2 text-gray-700"
							>
								Verification Code
							</label>
							<input
								id="otp"
								type="text"
								value={otp}
								onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
								placeholder="000000"
								maxLength={6}
								className="w-full border border-gray-300 rounded-md px-4 py-3 text-center tracking-[0.5em] text-2xl font-mono focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								autoFocus
							/>
						</div>

						{error && (
							<p className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
								{error}
							</p>
						)}

						<button
							type="button"
							onClick={handleVerify}
							disabled={otp.length !== 6 || isVerifying}
							className="w-full bg-blue-600 text-white rounded-md px-4 py-3 font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
						>
							{isVerifying ? "Verifying..." : "Verify & Continue"}
						</button>
					</div>

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
