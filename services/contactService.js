const { Contact } = require('../db/contactsModel')

const getContacts = async() => {
  const contacts = await Contact.find({})
  return contacts
}

const getContactById = async(id) => {
  const contact = await Contact.findById(id)
  return contact
}

const deleteContact = async(id) => {
  return await Contact.findByIdAndRemove(id)
}

const addContact = async(body) => {
  const contact = new Contact(body)
  await contact.save()
  return contact
}

const updateContact = async({ id, name, email, phone, favorite }) => {
  const contact = await Contact.findByIdAndUpdate(id, { $set: { name, email, phone, favorite } })
  return contact
}

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact
}
