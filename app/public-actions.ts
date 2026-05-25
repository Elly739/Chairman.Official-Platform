"use server";

import { revalidatePath } from "next/cache";
import { addContactInquiry, addSubscriber } from "@/lib/audience-store";

export type PublicActionState = {
  message?: string;
  success?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactInquiry(
  _prevState: PublicActionState,
  formData: FormData
): Promise<PublicActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return { success: false, message: "Fill in your name, email, subject, and message." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "Enter a valid email address." };
  }

  addContactInquiry({ name, email, subject, message });
  revalidatePath("/contact");
  return { success: true, message: "Your message has been received. Chairman.Official can follow up from there." };
}

export async function subscribeAudience(
  _prevState: PublicActionState,
  formData: FormData
): Promise<PublicActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const source = String(formData.get("source") ?? "Website Homepage").trim() || "Website Homepage";

  if (!email) {
    return { success: false, message: "Add an email address before subscribing." };
  }

  if (!isValidEmail(email)) {
    return { success: false, message: "Enter a valid email address." };
  }

  addSubscriber({ email, source });
  revalidatePath("/");
  revalidatePath("/contact");
  return { success: true, message: "Subscription received. You are now in the Chairman.Official audience list." };
}
