import * as leadService from "../services/leadService.js";

export const getLeads = async (req, res) => {
    try {
        const leads = await leadService.getLeads();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch leads", error: error.message });
    }
};

export const getLeadById = async (req, res) => {
    try {
        const lead = await leadService.getLeadById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch lead", error: error.message });
    }
};

export const createLead = async (req, res) => {
    try {
        const newLead = await leadService.createLead(req.body);
        res.status(201).json(newLead);
    } catch (error) {
        res.status(500).json({ message: "Failed to create lead", error: error.message });
    }
};

export const deleteLead = async (req, res) => {
    try {
        const deletedLead = await leadService.deleteLead(req.params.id);
        if (!deletedLead) return res.status(404).json({ message: "Lead not found" });
        res.status(200).json({ message: "Lead deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete lead", error: error.message });
    }
};
