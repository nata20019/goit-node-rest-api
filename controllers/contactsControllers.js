import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    console.log(req.query);
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json({ status: 200, data: { contacts } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contact = await Contact.findOne({ _id: id, owner });
    if (!contact) {
      next(HttpError(404, `Contact with id = ${id} not found`));
    }
    res.json({ status: 200, data: { contact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const deletedContact = await Contact.findOneAndDelete(
      { _id: id, owner }
      // { new: true }
    );
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
    const { _id: owner } = req.user;
    const newContact = await Contact.create({ ...req.body, owner });
    res.json({ status: 201, data: { newContact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body
      // {
      //   new: true,
      // }
    );
    if (!updatedContact) {
      next(HttpError(404, "Contact not found"));
    }
    res.json({ status: 200, data: { updatedContact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { favorite: req.body.favorite },
      {
        new: true,
      }
    );
    if (!updatedContact) {
      next(HttpError(404, "Contact not found"));
    }
    res.json({ status: 200, data: { updatedContact } });
  } catch (error) {
    next(HttpError(500, error.message));
  }
};
