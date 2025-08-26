import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf8" });
  return JSON.parse(data);
}

async function writeContacts(data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

async function getContactById(id) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact || null;
}

async function deleteContact(id) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await writeContacts(contacts);
  return deletedContact;
}

async function addContact(contact) {
  const contacts = await readContacts();
  const newContact = { ...contact, id: crypto.randomUUID() };
  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
}

async function updateContact(id, updatedFields) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...updatedFields };
  await writeContacts(contacts);
  return contacts[index];
}

export default {
  readContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
};
