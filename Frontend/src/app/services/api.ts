export interface AskResponse {
  answer: string;
  sources: string[];
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function ask(question: string): Promise<AskResponse> {
  const url = `${BASE_URL}/ask`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || res.statusText);
    }

    const data = await res.json();
    return data as AskResponse;
  } catch (err) {
    // Normalize error
    if (err instanceof Error) throw err;
    throw new Error("Unknown error calling /ask");
  }
}