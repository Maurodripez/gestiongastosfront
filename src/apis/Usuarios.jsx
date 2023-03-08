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