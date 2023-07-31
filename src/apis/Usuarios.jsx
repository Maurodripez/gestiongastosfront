import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/users";
const getToken = () => localStorage.getItem("token");

async function fetchWithToken(url, options) {
  const token = getToken();

  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}

export async function mostrarUsuarios() {
  const response = await fetchWithToken(`${BASE_URL}/getUsers`, {
    method: "GET",
  });

  const usuarios = await response.json();
  console.log(usuarios);
  return usuarios;
}

export async function actualizarUsuario(datos) {
  if (!datos.hasOwnProperty('password')) {
    datos.password = null;
  }
  console.log(JSON.stringify(datos));

  const response = await fetchWithToken(`${BASE_URL}/updateUser/${datos.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  return { status: response.status };
}

export async function registrarUsuario(datos) {

  const response = await fetch(`${BASE_URL}/createUser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });

  return response.status;

}

export async function eliminarUsuario(id) {
  const response = await fetchWithToken(`${BASE_URL}/deleteUser/${id}`, {
    method: 'DELETE',
  });

  return { status: response.status };
}

export function useLoginUsuario() {
  const navigate = useNavigate();

  async function loginUsuario(datos) {
    console.log(datos);
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const responseBody = await response.json();
        const { Token } = responseBody;

        localStorage.setItem('token', Token);
        console.log("Token: " + Token);

        navigate('/inicio');
      } else {
        console.log("Error al procesar la solicitud");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return loginUsuario;
}

export async function getRoles() {
  const response = await fetchWithToken(`${BASE_URL}/getRoles`, {
    method: "GET",
  });

  return await response.json();
}
