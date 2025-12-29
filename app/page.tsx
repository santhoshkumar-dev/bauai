import { redirect } from "next/navigation";

export default async function HomePage() {
  // Redirect to material requests if logged in, otherwise to login
  redirect("/material-requests");
}
