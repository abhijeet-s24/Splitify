const SESSION_KEY = "splitify-session";

export function readSession() {
  try {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (!storedSession) {
      return { token: "", user: null };
    }

    const parsedSession = JSON.parse(storedSession);
    return {
      token: parsedSession?.token || "",
      user: parsedSession?.user || null,
    };
  } catch {
    return { token: "", user: null };
  }
}

export function writeSession(session) {
  if (session?.token && session?.user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return;
  }

  localStorage.removeItem(SESSION_KEY);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
