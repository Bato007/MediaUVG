import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Se obtiene como se desea ordenar
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
        return 0;
}

// Se obtienen la funcion que se realizara
function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Se ordenan los datos
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'username', numeric: false, disablePadding: false, label: 'Usuario Vinculado' },
  { id: 'artistname', numeric: false, disablePadding: false, label: 'Nombre Artista' },
];

// Se crean las columnas con la informacion de 'const headCells', junto con las flechas 
// que ordenan 'asc' o 'des'
function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell ></TableCell>
                {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align='center'
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    >
                    <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell.id)}>
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        <span className={classes.visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </span>
                    ) : null}
                    </TableSortLabel>
                </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

// Caracteristicas del encabezado
EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

// Estilos para poner bonita el encabezado de la tabla
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
        },
    title: {
    flex: '1 1 100%',
    },
}));

// El titulo de la tabla se crea aquí
const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();

    return (
        <Toolbar
        // className={clsx(classes.root, {[classes.highlight]: numSelected > 0,})}> Para resaltar el titulo
            className={clsx(classes.root)}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Consulta de Artistas
            </Typography>
        </Toolbar>
    );
};

// Estilos para la tabla
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    notActive: {
        color: '#ff0000',
    },
    active: {
        color: '#00bb2d',
    },
}));

/*
 * Se encarga de crear las filas de la tabla y administrar si algo es clickeado
 *      rows - una lista que contenga los valores que se filtraron
 *      rowsNumber - es el tamaño de la lista filtrada
 *      onClick - la funcion que se encarga de guardar la fila seleccionada
 *      page - el numero de pagina en la que se debe de encontrar la tabla
 *      setPage - funcion actualiza el estado de la pagina  
 */
export default function SongTable({
  rows,
  rowsNumber,
  onClick,
  page,
  setPage,
}) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('songname');
    const [selected, setSelected] = React.useState([]);
    const [rowsPerPage] = React.useState(5);

    // Se encarga de administrar el orden en el que se muestran los datos
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // Se encarga de administrar cuando se le da click a una fila
    const handleClick = (event, row) => {
        let newSelected = [];

        // Si nada esta seleccionado se asigna, luego se mira si no es la misma y se asigna
        if (selected.length === 0){
            newSelected[0] = row;
        } else{
            if(selected[0] !== row){
                newSelected[0] = row;
            }
        }   
        setSelected(newSelected);

        // Se encarga de mandar la fila seleccionada, si no hay nada en la lista
        // entonces queire decir que aun no han seleccionado y manda un default
        if (newSelected.length > 0){
            onClick(newSelected[0]);
        } else {
            onClick({
                username: '',
                artistname: '',
            });
        }
    };

    // Cambio de pagina
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Se encarga de verificar si esta en la lista de seleccionado
    const isSelected = (row) => {
        let flag = selected.indexOf(row) !== -1; // Verifica si esta
        
        if (flag){
            flag = selected[0].id === row.id;
        }

        return flag
    }

    // Hace el calculo de cuantas filas hacen falta para llenar la ultima pagina
    const emptyRows = 5 - Math.min(5, rowsNumber - page * 5);

// Se crea el resto de la tabla
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer>

          {/* Se crea el el encabezado de la tabla */}
          <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size = 'medium'
          aria-label="enhanced table"
          >
            <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}/>
            <TableBody>
            {/* Se crean las filas de la tabla */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                  hover
                  onClick={(event) => handleClick(event, row)}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.username}
                  selected={isItemSelected}
                  >
                      {/* Propiedades de cada una de las filas */}
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell 
                        component="th" 
                        id={labelId} 
                        scope="row" 
                        padding="none"
                      >
                        {row.username}
                      </TableCell>
                      <TableCell align="center">{row.artistname}</TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                  <TableRow style={{ height: (53) * emptyRows }}>
                  <TableCell colSpan={6} />
                  </TableRow>
              )}
            </TableBody>
          </Table>
      </TableContainer>

      {/* Aqui es en donde se cambia la pagina y el numero de elementos con los que se cuenta */}
      <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}/>
      </Paper>
      
  </div>
  );
}