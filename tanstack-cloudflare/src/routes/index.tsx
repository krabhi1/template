import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/components/dashboard";
import Landing from "@/components/landing/index";
import { authClient } from "@/lib/auth-client";
import { AppProvider } from "@/providers/app-provider";
export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { session: initialSession } = Route.useRouteContext();

	const { data: liveSession } = authClient.useSession();
	const session = liveSession ?? initialSession;
	if (!session) return <Landing />;
	return (
		<AppProvider>
			<Dashboard />
		</AppProvider>
	);
}
