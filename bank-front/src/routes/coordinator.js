export const goToLogin = (history) => {
  history.push("/login");
};

export const goToCreateUser = (history) => {
  history.push("/createUser");
};

export const goToHome = (history) => {
  history.push("/");
};

export const goToPayment = (history) => {
  history.push("/payment");
};

export const goToExtract = (history, id) => {
  history.push(`/extract/${id}`);
};

export const goToTransfer = (history, id) => {
  history.push("/transfer");
};

export const goToPreviousPage = (history) => {
  history.goBack();
};
