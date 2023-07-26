import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

// Función para mostrar un mensaje de éxito
export function showSuccessMessage(message) {
    toast.success(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true, // Ocultar la barra de progreso
    });
}

// Opcionalmente, puedes crear otras funciones para mensajes de error, advertencia, etc.
export function showErrorMessage(message) {
    toast.error(message);
};

export const ConfirmationDialog = ({ open, title, message, onConfirm, onCancel }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onConfirm} color="primary" autoFocus>
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>
    );
};