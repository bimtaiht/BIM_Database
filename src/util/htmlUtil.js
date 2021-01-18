export const createMarkup = (data) => {
  try {
    return { __html: data };
  }
  catch {
    data = "Invalid html";
    return { __html: data };
  }
}