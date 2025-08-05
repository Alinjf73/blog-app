import http from "./httpService";

export async function getCategoriesApi(options) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}

export function getCategoryById(id) {
  return http.get(`/category/${id}`).then(({ data }) => data.data);
}

export function createNewCategory(data) {
  return http.post("/category/add", data).then(({ data }) => data.data);
}

export function updateCategory({ id, data }) {
  return http
    .patch(`/category/update/${id}`, data)
    .then(({ data }) => data.data);
}

export async function removeCategoryApi(id) {
  return http.delete(`/category/remove/${id}`).then(({ data }) => data.data);
}
