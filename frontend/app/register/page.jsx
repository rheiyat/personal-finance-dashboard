"use client";

import AuthForm from "../../components/AuthForm";
import { register } from "../../lib/api";

export default function RegisterPage() {
  return <AuthForm type="register" onSubmit={register} />;
}
