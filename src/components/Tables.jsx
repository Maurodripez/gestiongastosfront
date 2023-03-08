import React, { useMemo, useRef, useState, useEffect,useCallback } from "react";
import MaterialReactTable from "material-react-table";
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { mostrarUsuarios, editarUsuario, crearUsuario,eliminarUsuario } from "../apis/Usuarios.jsx";
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
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
const usuarios = async () => await mostrarUsuarios();

export function TablaUsuarios() {
  const ModalCrearUsuario = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
      columns.reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = '';
        return acc;
      }, {}),
    );

    const handleSubmit = () => {
      //put your validation logic here
      onSubmit(values);
      delete values.idUsuario;
      crearUsuario(values);
      setTablaActualizada(true);
      //console.log(values);
      onClose();
    };

    return (
      <Dialog open={open}>
        <DialogTitle textAlign="center">Nuevo Usuario</DialogTitle>
        <DialogContent>
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: '100%',
                minWidth: { xs: '300px', sm: '360px', md: '400px' },
                gap: '1.5rem',
              }}
            >
              {columns.map((column) =>
                column.accessorKey !== 'idUsuario' ? (
                  <TextField
                    key={column.accessorKey}
                    label={column.header}
                    name={column.accessorKey}
                    onChange={(e) =>
                      setValues({ ...values, [e.target.name]: e.target.value })
                    }
                  />
                ) : null
              )}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: '1.25rem' }}>
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="success" onClick={handleSubmit} variant="contained">
            Nuevo Usuario
          </Button>
        </DialogActions>
      </Dialog>

    );
  };
  const columns = useMemo(
    // Para utilizar este patrón necesitamos tener un accessorKey o accessorFn (para objetos anidados), que especifica qué propiedad del objeto debe ser usada en esta columna.
    // También podemos configurar un header personalizado y opcionalmente una función Cell personalizada para Renderizar la celda de manera personalizada:
    () => [
      {
        accessorKey: "idUsuario",
        header: "Id",
        enableEditing: false,
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "nombre",
        header: "Nombre",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "correo",
        header: "Correo",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: "contrasenia",
        header: "Contraseña",
        muiTableHeadCellProps: { sx: { color: "#1f2937" } },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
    ],
    []
  );

  const [rowSelection, setRowSelection] = useState({});
  useEffect(() => {
    //do something when the row selection changes
  }, [rowSelection]);

  const tableInstanceRef = useRef(null);

  useEffect(() => {
    usuarios().then((data) => setData(data));
  }, []);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tablaActualizada, setTablaActualizada] = useState(false);
  const [data, setData] = React.useState([]);
  const [tableData, setTableData] = useState(() => data);
  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRow = async ({ exitEditingMode, row, values }) => {
    //if using flat data and simple accessorKeys/ids, you can just do a simple assignment here.
    tableData[row.index] = values;
    //send/receive api updates here
    setTableData([...tableData]);
    editarUsuario(tableData[0])
      .then(data => console.log(data))
      .catch(error => console.error(error));
    setTablaActualizada(true);
    exitEditingMode(); //required to exit editing mode
  };

  //useefect para actualizar la tabla si cambia el estado
  useEffect(() => {
    if (tablaActualizada) {
      usuarios().then((data) => {
        setData(data);
        setTableData(data); // actualizar datos de la tabla
        setTablaActualizada(false); // restablecer estado de tabla actualizada
      });
    }
  }, [tablaActualizada]);
  const handleDeleteRow = useCallback(
    (row) => {
      console.log(row);
      const confirmed = window.confirm('¿Está seguro que desea eliminar?'+row.getValue('idUsuario'));
      if (confirmed) {
        let respuesta = eliminarUsuario(row.getValue("idUsuario"));
        alert(respuesta);
      }
    },
    [tablaActualizada],
  );
  // Se usa fetch para obtener los datos de la API antes de pasarlos a la tabla
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
        editingMode="modal" //default
        enableEditing
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Edit />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        onEditingRowSave={handleSaveRow}
        initialState={{ columnVisibility: { idUsuario: false } }}
        renderTopToolbarCustomActions={() => (
          <Button
            color="success"
            onClick={() => setCreateModalOpen(true)}
            variant="contained"
          >
            Nuevo Usuario
          </Button>
        )}
      />
      <ModalCrearUsuario
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  );
}
