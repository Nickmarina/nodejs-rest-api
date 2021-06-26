const { Contact } = require('../db/contactsModel')

const getContacts = async() => {
  const contacts = await Contact.find()
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

const updateContact = async(contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, { $set: { ...body } }, { new: true })
  return contact
}

const updateStatusContact = async(contactId, favorite) => {
  const updatedStatus = await Contact.findByIdAndUpdate(contactId, { $set: { favorite } }, { new: true })
  return updatedStatus
}

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
}
