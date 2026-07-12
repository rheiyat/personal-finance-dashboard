export async function login(email, password) {
  const res = await fetch("http://localhost:5050/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  console.log("LOGIN RESPONSE:", data);   // ⭐ ADD THIS

  if (!res.ok) {
    return { message: data.message || "Login failed" };
  }

  localStorage.setItem("token", data.token);

  // TEMP: prevent crash
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  } else {
    localStorage.setItem("user", JSON.stringify({ name: email, email }));
  }

  return data;
}


export async function register(name, email, password) {
  const res = await fetch("http://localhost:5050/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { message: data.message || "Registration failed" };
  }

  // Store token
  localStorage.setItem("token", data.token);

  // Store user EXACTLY as backend returns it
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
