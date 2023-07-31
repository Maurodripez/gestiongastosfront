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

//valida si el correo esta bien escrito
export const isValidEmail = (email) => {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

//Valida si el usuario ya esta en uso
export async function validateUsername(username) {

    console.log("Datos " + username);

    const response = await fetchWithToken(`${BASE_URL}/validUsername/${username}`, {
        method: 'GET',
    });

    const data = await response.json();
    console.log("El usuario existe: " + data);
    return data;
}

//Valida si el correo ya esta en uso
export async function validateEmail(email) {
    console.log("Datos " + email);

    const response = await fetchWithToken(`${BASE_URL}/validEmail`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: email,
    });

    const data = await response.json();
    console.log("El correo existe: " + JSON.stringify(data));
    return data;
}

//Envia el token para verificar el correo
export async function validateTokenEmail(token) {
    const response = await fetch(`${BASE_URL}/validTokenEmail/${token}`, {
        method: 'POST',
    });

    return response.status;
}

//Verifica si el correo ya esta verificado
export async function emailIsVerify(username) {
    const response = await fetch(`${BASE_URL}/emailIsVerify/${username}`, {
        method: 'GET',
    });
    const data = await response.json();
    console.log("esta verificado el correo? " + JSON.stringify(data));
    return data;
}

//Reenvia el correo para verificar 
export async function resendEmailVerification(username) {
    const response = await fetch(`${BASE_URL}/resendValidEmail/${username}`, {
        method: 'GET',
    });
    const status = response.status;
    console.log("correo enviado? " + status);
    return status;
}


