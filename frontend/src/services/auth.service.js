import api from "./api";

export const login = async (email, password, onLoginSuccess) => {
  const payload = {email,password}

  const res = await api.post("/users/login", payload,{withCredentials:true});
  
  if (onLoginSuccess) {
    onLoginSuccess(res.data.data.user);
    
  }
  
  return
};

export const register = async (fullname, username, email, password, avatar) => {
  const formData = new FormData();
  formData.append("fullname", fullname);
  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const res = api.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }})
    return
};

// Fetch all users for assignment / admin lists
export const getAllUsers = () => api.get("/users/get-all-users");
