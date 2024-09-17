export const saveToStore = (state: any) =>
  localStorage.setItem("state", JSON.stringify(state));
export const readInitialStateFromStore = () => localStorage.getItem("state");
