const { HttpCode } = require('../helpers/codes.js')
const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../services/contactService')

const listContactsController = async (req, res, next) => {
  const contacts = await getContacts()
  res.status(HttpCode.OK).json({ contacts, status: 'success' })
}

const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.OK).json({ contact, status: 'success' })
}

const removeContactController = async (req, res, next) => {
  const { contactId } = req.params
  const deletedContact = await deleteContact(contactId)
  if (!deletedContact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.OK).json({ status: 'contact deleted' })
}

const addContactController = async (req, res, next) => {
  const body = req.body
  const contact = await addContact(body)
  res.status(HttpCode.CREATED).json({ contact, status: 'created' })
}

const updateContactController = async (req, res, next) => {
  const { contactId } = req.params
  const body = req.body
  const contact = await updateContact(contactId, body)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.CREATED).json({ contact, status: 'updated' })
}

const updateStatusContactController = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const contact = await updateStatusContact(contactId, favorite)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.CREATED).json({ contact, status: 'updated' })
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController
}
