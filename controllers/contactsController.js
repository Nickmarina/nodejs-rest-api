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
  const { _id: userId } = req.user
  let { skip = 0, limit = 20 } = req.query
  skip = parseInt(skip)
  limit = parseInt(limit) > 20 ? 20 : parseInt(limit)
  const contacts = await getContacts(userId, { skip, limit })
  res.status(HttpCode.OK).json({ contacts, skip, limit, status: 'success' })
}

const getContactByIdController = async (req, res, next) => {
  const { _id: userId } = req.user
  const { contactId } = req.params
  const contact = await getContactById(contactId, userId)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.OK).json({ contact, status: 'success' })
}

const removeContactController = async (req, res, next) => {
  const { _id: userId } = req.user
  const { contactId } = req.params
  const contact = await deleteContact(contactId, userId)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.OK).json({ status: 'contact deleted' })
}

const addContactController = async (req, res, next) => {
  const body = req.body
  const { _id: userId } = req.user
  const contact = await addContact(body, userId)
  res.status(HttpCode.CREATED).json({ contact, status: 'created' })
}

const updateContactController = async (req, res, next) => {
  const { _id: userId } = req.user
  const { contactId } = req.params
  const body = req.body
  const contact = await updateContact(contactId, body, userId)
  if (!contact) return res.status(HttpCode.BAD_REQUEST).json({ status: 'invalid id' })
  res.status(HttpCode.CREATED).json({ contact, status: 'updated' })
}

const updateStatusContactController = async (req, res, next) => {
  const { _id: userId } = req.user
  const { contactId } = req.params
  const { favorite } = req.body
  const contact = await updateStatusContact(contactId, favorite, userId)
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
