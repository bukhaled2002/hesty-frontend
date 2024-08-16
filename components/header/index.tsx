// This part remains a Server Component

import { auth } from "@/auth";
import HeaderContainer from "./HeaderContainer";

export default async function Header() {
  const data = await auth();

  return <HeaderContainer data={data} />;
}
