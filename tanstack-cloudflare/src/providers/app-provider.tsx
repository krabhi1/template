import { createContext, type ReactNode, useCallback, useContext } from "react";
import { authClient } from "@/lib/auth-client";
import { Route } from "@/routes/__root";
import type { User } from "@/server/auth";

interface AppContextType {
	user: User;
	signOut: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
	const { session: initialSession } = Route.useRouteContext();

	const { data: liveSession } = authClient.useSession();
	const session = liveSession ?? initialSession;
	if (!session) {
		throw new Error("AppProvider must be used within an authenticated route");
	}

	const navigate = Route.useNavigate();
	const signOut = useCallback(
		() =>
			authClient.signOut({
				fetchOptions: {
					onSuccess: () => {
						navigate({ to: "/" });
					},
				},
			}),
		[navigate],
	);

	return (
		<AppContext.Provider
			value={{
				user: session.user,
				signOut,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (context === undefined) {
		throw new Error("useAppContext must be used within an AppProvider");
	}
	return context;
};
