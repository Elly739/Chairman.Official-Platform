import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const STUDIO_COOKIE = "chairman_studio_session";
const STUDIO_VALUE = "active";

export function getStudioPassword() {
  return process.env.STUDIO_PASSWORD ?? "chairman-admin";
}

export async function isStudioAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get(STUDIO_COOKIE)?.value === STUDIO_VALUE;
}

export async function requireStudioAuth(nextPath = "/studio") {
  const authenticated = await isStudioAuthenticated();

  if (!authenticated) {
    redirect(`/studio/login?next=${encodeURIComponent(nextPath)}`);
  }
}

export async function createStudioSession() {
  const cookieStore = await cookies();
  cookieStore.set(STUDIO_COOKIE, STUDIO_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
  });
}

export async function clearStudioSession() {
  const cookieStore = await cookies();
  cookieStore.delete(STUDIO_COOKIE);
}
