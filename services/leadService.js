import Lead from "../models/leads.js";

export const getLeads = async () => {
    return await Lead.find().sort({ createdAt: -1 }); // Newest first
};

export const getLeadById = async (id) => {
    return await Lead.findById(id);
};

export const createLead = async (leadData) => {
    const newLead = new Lead(leadData);
    return await newLead.save();
};

export const deleteLead = async (id) => {
    return await Lead.findByIdAndDelete(id);
};
