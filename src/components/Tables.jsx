import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { mostrarUsuarios, actualizarUsuario, eliminarUsuario, getRoles } from "../apis/Usuarios.jsx";
import {
  Button,
  Box,
  Dialog,
  Tooltip,
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  FormHelperText,
} from '@mui/material';
import { showSuccessMessage, showErrorMessage, ConfirmationDialog } from './Extras/alerts.jsx';
import { Delete, Edit } from '@mui/icons-material';

export function TablaUsuarios() {

  const [selectedRolesForEdit, setSelectedRolesForEdit] = useState([]);
  const [editingUser, setEditingUser] = useState({});
  const [tablaActualizada, setTablaActualizada] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setEditingUser(null);
    setIsModalOpen(false);
  };

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const confirmarEliminacion = useCallback(
    async (row) => {
      setUserToDelete(row.original);
      setShowConfirmation(true);
    },
    []
  );

  const handleDeleteUser = async () => {
    setShowConfirmation(false);
    if (userToDelete) {
      try {
        // Llamar a la función para eliminar el usuario
        const { status } = await eliminarUsuario(userToDelete.id);

        if (status === 200) {
          showSuccessMessage('Usuario eliminado correctamente.'); // Llama a la función para mostrar el mensaje de éxito
          setTablaActualizada(true); // Actualizar el estado con la función pasada como prop
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
      }
    }
    setUserToDelete(null);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
    setUserToDelete(null);
  };
  useEffect(() => {
    const obtenerUsuarios = async () => {
      const data = await mostrarUsuarios();
      setData(data);
    };

    obtenerUsuarios();
  }, [tablaActualizada]);

  const ModalEditarUsuario = ({ open, columns, onClose, onSubmit, selectedRoles, initialValues }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = initialValues ? initialValues[column.accessorKey] : ''; // Si hay valores iniciales, usarlos; de lo contrario, establecer una cadena vacía
        return acc;
      }, {}),
    );

    const [noRoles, setNoRoles] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [selectedRolesModal, setSelectedRolesModal] = useState({});
    const [availableRoles, setAvailableRoles] = useState([]);
    useEffect(() => {
      // Obtener la lista de roles desde la API y actualizar el estado
      getRoles().then((data) => {
        setAvailableRoles(data);
        setSelectedRolesModal(() =>
          data.reduce((acc, role) => {
            acc[role.role] = selectedRoles.includes(role.role); // Establecer los checkboxes según los roles recibidos
            return acc;
          }, {}),
        );
      });

      if (selectedRolesForEdit && selectedRolesForEdit.length > 0) {
        setSelectedRolesModal((prevSelectedRoles) => {
          const initialSelectedRoles = { ...prevSelectedRoles };
          selectedRolesForEdit.forEach((role) => {
            initialSelectedRoles[role] = true;
          });
          return initialSelectedRoles;
        });
      } else {
        // Si no hay roles seleccionados o el modal no está en modo edición, establecer el estado local en blanco
        setSelectedRolesModal({});
      }
    }, [selectedRoles]);

    const editarUsuario = async () => {

      if (values.password) {
        // Validar si el campo "Repetir Contraseña" está vacío o no coincide con el valor del campo "Contraseña"
        if (!values.passwordRepeat || values.passwordRepeat !== values.password) {
          setFormErrors({ passwordRepeat: 'Las contraseñas no coinciden.' });
          return; // Evitar la actualización si no se cumplen las condiciones
        }
      }
      const rolesSeleccionados = Object.keys(selectedRolesModal).filter((role) => selectedRolesModal[role]);
      values.roles = rolesSeleccionados; // Agregar los roles seleccionados al objeto de usuario
      console.log("Los roles son: " + values.roles.length);
      if (values.roles.length === 0) {
        setNoRoles({ rolesSelected: 'Selecciona minimo un Rol.' });
        return;
      }
      try {
        // Llamar a la función para actualizar el usuario
        const { status } = await actualizarUsuario(values);
        console.log("estatus: " + status);

        if (status === 200) {
          // La actualización fue exitosa
          showSuccessMessage('Usuario actualizado correctamente.'); // Llama a la función para mostrar el mensaje de éxito
          setTimeout(() => {
            setTablaActualizada(true); // Actualizar el estado con la función pasada como prop
            onClose();
          }, 1500);
        }
      } catch (error) {
        // Error en la llamada a la API
        showErrorMessage('Error al actualizar el usuario');
        console.error('Error en la llamada a la API:', error);
      }
      setFormErrors({});
      setNoRoles({});
    };

    const handleRoleChange = (role, checked) => {
      setSelectedRolesModal((prevSelectedRoles) => ({
        ...prevSelectedRoles,
        [role]: checked !== undefined ? checked : !prevSelectedRoles[role],
      }));

      // Actualizar el estado "values" con los roles seleccionados
      setValues((prevValues) => ({
        ...prevValues,
        roles: Object.keys(selectedRolesForEdit).filter((role) => selectedRolesForEdit[role]),
      }));
    };

    return (
      <Dialog open={open} sx={{ minHeight: "70vh" }}>
        <DialogTitle textAlign="center">Editar Usuario</DialogTitle>
        <DialogContent sx={{ overflowY: "auto" }}>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '300px', md: '400px' },
                gap: '.5rem',
                height: '100%',
                paddingTop: '1rem',
              }}
            >
              {columns.map((column) =>
                column.accessorKey !== 'id' ? (
                  column.accessorKey === 'roles' ? (
                    <Box key={column.accessorKey}>
                      <FormControl>
                        <FormLabel component="legend">{column.header}</FormLabel>
                        <FormGroup>
                          <Grid>
                            {availableRoles.map((role) => (
                              <FormControlLabel
                                key={role.role}
                                control={
                                  <Checkbox
                                    checked={selectedRolesModal[role.role] || false}
                                    onChange={(e) => {
                                      handleRoleChange(role.role, e.target.checked);
                                    }}
                                  />
                                }
                                label={role.role}
                              />
                            ))}
                          </Grid>
                        </FormGroup>
                      </FormControl>
                      {noRoles.rolesSelected && (
                        <FormHelperText sx={{ color: 'red' }}>{noRoles.rolesSelected}</FormHelperText>
                      )}
                    </Box>
                  ) : (
                    <TextField
                      key={column.accessorKey}
                      label={column.header}
                      name={column.accessorKey}
                      value={values[column.accessorKey] || ''}
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    />
                  )
                ) : null
              )}
              <TextField
                label="Contraseña"
                type="password"
                name="password"
                value={values.password || ''}
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
              <TextField
                label="Repetir Contraseña"
                type="password"
                name="passwordRepeat"
                value={values.passwordRepeat || ''}
                onChange={(e) => setValues({ ...values, passwordRepeat: e.target.value })}
                error={!!formErrors.passwordRepeat}
                helperText={formErrors.passwordRepeat}
                sx={{ borderColor: formErrors.passwordRepeat ? 'red' : '' }} // Estilos para el borde rojo
              />
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            color="success"
            onClick={() => {
              editarUsuario();
            }}
            variant="contained"
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
        enableEditing: false,
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "username",
        header: "Usuario",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "email",
        header: "Correo",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "roles",
        header: "Roles",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue().join(", ")}</span>,
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});

  const tableInstanceRef = useRef(null);

  // Función para abrir el modal en modo edición y cargar los datos del usuario a editar
  const handleEditUser = (row) => {
    setEditingUser(row.original);
    setSelectedRolesForEdit(row.original.roles || []);
    setIsModalOpen(true);
  };

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableColumnActions={true}
        enableColumnFilters={true}
        enablePagination={true}
        enableSorting={true}
        enableBottomToolbar={true}
        enableTopToolbar={true}
        muiTableBodyRowProps={{ hover: false }}
        enableColumnOrdering
        onRowSelectionChange={setRowSelection}
        state={{ rowSelection }}
        tableInstanceRef={tableInstanceRef}
        localization={MRT_Localization_ES}
        editingMode="modal"
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => handleEditUser(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => confirmarEliminacion(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        initialState={{ columnVisibility: { id: false } }}
      />
      <ModalEditarUsuario
        columns={columns}
        open={isModalOpen}
        onClose={handleModalClose}
        initialValues={editingUser || null}
        selectedRoles={selectedRolesForEdit} // Pasa los roles seleccionados como prop
        tablaActualizada={tablaActualizada} // Pasar el estado como prop
        setTablaActualizada={setTablaActualizada} // Pasar la función como prop
      />
      <ConfirmationDialog
        open={showConfirmation}
        title="Confirmación de Eliminación"
        message={`¿Está seguro que desea eliminar al usuario: ${userToDelete?.username}?`}
        onConfirm={handleDeleteUser}
        onCancel={handleCloseConfirmation}
      />
    </>
  );
}
