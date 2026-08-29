import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/company/")({
  beforeLoad: () => {
    throw redirect({ to: "/company/intelligence", replace: true });
  },
});
