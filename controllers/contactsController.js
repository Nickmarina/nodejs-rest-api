const { HttpCode } = require('../helpers/codes.js')
const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact
} = require('../services/contactService')

const listContactsController = async (req, res, next) => {
  const contacts = await getContacts()
  res.status(HttpCode.OK).json({ contacts, status: 'success' })
}

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  res.status(HttpCode.OK).json({ contact, status: 'success' })
}

const removeContactController = async (req, res, next) => {
  const { id } = req.params
  await deleteContact(id)
  res.status(HttpCode.OK).json({ status: 'contact deleted' })
}

const addContactController = async (req, res, next) => {
  const body = req.body
  const contact = await addContact(body)
  res.status(HttpCode.CREATED).json({ contact, status: 'created' })
}

const updateContactController = async (req, res, next) => {
  const { id, name, email, phone, favorite } = req.body
  const contact = await updateContact({ id, name, email, phone, favorite })
  res.status(HttpCode.CREATED).json({ contact, status: 'updated' })
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
