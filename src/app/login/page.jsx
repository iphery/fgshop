"use client";
import { API_PINEAPPLE } from "@/utils/constans";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit1 = () => {
    console.log("apadf");
    console.log(email);
    console.log(password);
  };
  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_PINEAPPLE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      console.log("Login successful, session ID:", data.sessionId);
      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <div>update</div>
      <input
        type="text"
        placeholder="email"
        onInput={(val) => {
          //console.log(val.target.value);
          setEmail(val.target.value);
        }}
      />
      <input
        type="text"
        placehoder="password"
        onInput={(val) => {
          // console.log(val.target.value);
          setPassword(val.target.value);
        }}
      />
      <div
        className="cursor-default hover:text-muted bg-primary mt-10"
        onClick={submit}
      >
        Submit
      </div>
    </div>
  );
}
