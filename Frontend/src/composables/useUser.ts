import { CurrentUser } from "../types/CurrentUser";
import HttpClient from "../utils/httpClient";

export function useCurrentUser() {
  const client = new HttpClient();
  const state = reactive({
    user: undefined as CurrentUser | undefined,
  });

  async function load() {
    const response = await client.get("/api/me");
    const user_object = response.data as CurrentUser;
    state.user = user_object;
  }

  load();

  return {
    load,
    ...state.user,
  };
}