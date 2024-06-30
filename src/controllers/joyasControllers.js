import { HATEOAS } from "../helpers/hateoas.js";
import { getJoyas, joyasFiltroModel } from "../models/joyasModel.js";

// HATEOAS
export const getJoyasHateoas = async (req, res) => {
  try {
    const { limits = 10, page = 1, order_by = 'id_ASC' } = req.query;

    const limit = parseInt(limits, 10);
    const offset = (parseInt(page, 10) - 1) * limit;
    const [order, direction] = order_by.split('_');

    const joyasData = await getJoyas(limit, offset, order, direction);
    const joyasHateoas = await HATEOAS("joyas", joyasData);

    res.status(200).json({ joya: joyasHateoas });
  } catch (error) {
    console.error("Error en getJoyas:", error);
    res.status(500).json({ error: "Error" });
  }
};

//FILTROS
export const joyasFiltro = async (req, res) => {
  try {
    const queryStrings = req.query;
    const inventario = await joyasFiltroModel(queryStrings);
    res.status(200).json(inventario);
  } catch (error) {
    console.error("Error en los filtro:", error);
    res.status(500).json({ error: "Error" });
  }
};
