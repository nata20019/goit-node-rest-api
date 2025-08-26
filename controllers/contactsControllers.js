import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.readContacts();
    res.json({ status: 200, data: { contacts } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.getContactById(id);
    if (!contact) {
      next(HttpError(404, "Contact not found"));
    }
    res.json({ status: 200, data: { contact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await contactsService.deleteContact(id);
    if (!deletedContact) {
      next(HttpError(404, "Contact not found"));
    }
    res.json({
      status: 200,
      message: "Contact deleted",
      data: { deletedContact },
    });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await contactsService.addContact(req.body);
    res.json({ status: 201, data: { newContact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await contactsService.updateContact(id, req.body);
    if (!updatedContact) {
      next(HttpError(404, "Contact not found"));
    }
    res.json({ status: 200, data: { updatedContact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};
