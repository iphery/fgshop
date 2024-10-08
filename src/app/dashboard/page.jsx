"use client";
import { API_PINEAPPLE } from "@/utils/constans";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const checkAuth = async () => {
    console.log("Cookies before auth check:", document.cookie);
    const res = await fetch(`${API_PINEAPPLE}/protected`, {
      credentials: "include",
    });
    console.log(res);
    console.log("Cookies after request:", document.cookie);
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (!user) return <div>Loading...</div>;

  return <div>Welcome, {user.username}!</div>;
}
