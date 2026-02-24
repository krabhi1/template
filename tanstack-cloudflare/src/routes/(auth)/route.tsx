import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
	beforeLoad: ({ context, location }) => {
		if (!context.session) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
