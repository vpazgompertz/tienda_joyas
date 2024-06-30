import format from "pg-format";
import { pool } from "../../database/config.js";

export const getJoyas = async (limit, offset, order, direction) => {
  const query = format(
    `SELECT * FROM inventario ORDER BY %I %s LIMIT %L OFFSET %L`,
    order,
    direction,
    limit,
    offset
  );

  const result = await pool.query(query);
  return result.rows;
};

export const joyasFiltroModel = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  const values = [];

  const addFiltro = (campo, comparador, valor) => {
    values.push(valor);
    const { length } = filtros;
    filtros.push(`${campo} ${comparador} $${length + 1}`);
  };

  if (precio_max) addFiltro("precio", "<=", precio_max);
  if (precio_min) addFiltro("precio", ">=", precio_min);
  if (categoria) addFiltro("categoria", "=", categoria);
  if (metal) addFiltro("metal", "=", metal);

  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    consulta += ` WHERE ${filtros.join(" AND ")}`;
  }

  const { rows: inventario } = await pool.query(consulta, values);
  return inventario;
};
