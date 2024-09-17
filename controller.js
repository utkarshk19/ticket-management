const Ticket = require('../schema/ticketSchema');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    const ticket = new Ticket({ title, description });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a ticket by ID
exports.updateTicketById = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, { title, description, status, updatedAt: Date.now() }, { new: true });
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a ticket by ID
exports.deleteTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
