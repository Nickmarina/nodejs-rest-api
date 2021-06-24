const { HttpCode } = require('../helpers/codes.js')
const {
  getContacts,
  getContactById,
  deleteContact,
  addContact,
  updateContact
} = require('../services/contactService')

const listContactsController = async (req, res, next) => {
  try {
    const contacts = await getContacts()
    res.status(HttpCode.OK).json({ contacts, status: 'success' })
  } catch (err) {
    next(err)
  }
}

const getContactByIdController = async (req, res, next) => {
  try {
    const { id } = req.params
    const contact = await getContactById(id)
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ status: 'Not found' })
    }
    res.status(HttpCode.OK).json({ contact, status: 'success' })
  } catch (err) {
    next(err)
  }
}

const removeContactController = async (req, res, next) => {
  try {
    const { id } = req.params
    await deleteContact(id)
    res.status(HttpCode.OK).json({ status: 'contact deleted' })
  } catch (err) {
    next(err)
  }
}

const addContactController = async (req, res, next) => {
  try {
    const body = req.body
    const contact = await addContact(body)
    res.status(HttpCode.CREATED).json({ contact, status: 'created' })
  } catch (err) {
    next(err)
  }
}

const updateContactController = async (req, res, next) => {
  try {
    const { id, name, email, phone, favorite } = req.body
    const contact = await updateContact({ id, name, email, phone, favorite })
    res.status(HttpCode.CREATED).json({ contact, status: 'updated' })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
}
