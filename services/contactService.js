const { Contact } = require('../db/contactsModel')

const getContacts = async(userId, { skip, limit }) => {
  console.log(userId)
  const contacts = await Contact.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort({ favorite: -1 })
  return contacts
}

const getContactById = async(id, userId) => {
  const contact = await Contact.findOne({ _id: id, userId })
  return contact
}

const deleteContact = async(id, userId) => {
  const contact = await Contact.findOneAndRemove({ _id: id, userId })
  return contact
}

const addContact = async(body, userId) => {
  const contact = new Contact({ ...body, userId })
  await contact.save()
  return contact
}

const updateContact = async(contactId, body, userId) => {
  const contact = await Contact.findOneAndUpdate({ _id: contactId, userId }, { $set: { ...body } }, { new: true })
  return contact
}

const updateStatusContact = async(contactId, favorite, userId) => {
  const contact = await Contact.findOneAndUpdate({ _id: contactId, userId }, { $set: { favorite } }, { new: true })
  return contact
}

module.exports = {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
}
