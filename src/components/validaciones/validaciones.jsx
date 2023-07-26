export const processUserDataForUpdate = (usuarioActualizado) => {
    if (!usuarioActualizado.hasOwnProperty('password')) {
        usuarioActualizado.password = null;
    }
};
