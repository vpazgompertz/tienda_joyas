import { Router } from "express";
import {
  getJoyasHateoas,
  joyasFiltro,
} from "../controllers/joyasControllers.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Bienvenido a la API");
});

router.get("/joyas", getJoyasHateoas);
router.get("/joyas/filtros", joyasFiltro);

export default router;
