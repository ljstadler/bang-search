import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
    errorComponent({ error }) {
        return (
            <div className="flex flex-col items-center justify-center h-screen m-0">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Error
                </h1>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {error.message}
                </p>
            </div>
        );
    },
    notFoundComponent() {
        return (
            <div className="flex flex-col items-center justify-center h-screen m-0">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Not Found
                </h1>
            </div>
        );
    },
});
