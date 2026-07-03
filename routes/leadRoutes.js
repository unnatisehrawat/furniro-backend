import express from "express";
import { getLeads, getLeadById, createLead, deleteLead } from "../controllers/leadController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectAdmin, getLeads);
router.get("/:id", protectAdmin, getLeadById);
router.post("/", createLead);
router.delete("/:id", protectAdmin, deleteLead);

export default router;