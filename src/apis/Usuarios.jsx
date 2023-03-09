import { useNavigate } from "react-router-dom";
export async function mostrarUsuarios() {
  const request = await fetch(
    "http://localhost:8080/api/usuarios/ObtenerUsuarios",
    {
      method: "GET",
    }
  );
  const usuarios = await request.json();
  return usuarios;
}
export async function editarUsuario(datos) {
  const response = await fetch('http://localhost:8080/api/usuarios/EditarUsuario', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  const data = await response.json();
  return data;
}
export async function crearUsuario(datos) {
  const response = await fetch('http://localhost:8080/api/usuarios/CrearUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  });
  const data = await response.json();
  return data;
}
export async function eliminarUsuario(id) {
  const response = await fetch(`http://localhost:8080/api/usuarios/EliminarUsuario/${id}`, {
    method: 'DELETE',
  });
  const data = await response.text();
  return data;
}
export function useLoginUsuario() {
  const navigate = useNavigate();

  async function loginUsuario(datos) {
    try {
      const response = await fetch("http://localhost:8080/api/authUser/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });
      if (await response.text() === "ok") {
        console.log("Ingreso exitoso");
        navigate('/inicio');
      } else {
        console.log("Error al procesar la solicitud");
      }
    } catch (error) {
      console.log("Error de red");
    }
  }

  return loginUsuario;
}