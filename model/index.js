const fs = require('fs').promises
// const path = require('path')
const { HttpCode } = require('../helpers/codes.js')
const contacts = require('./contacts.json')

// const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async (req, res, next) => {
  try {
    // const contacts = await fs.readFile(contactsPath, 'utf-8')
    await res.status(HttpCode.OK).json({ contacts, status: 'success' })
  } catch (err) {
    next(err)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const [contact] = await contacts.filter(item => item.id === Number(req.params.contactId))
    if (!contact) {
      return res.status(HttpCode.NOT_FOUND).json({ status: 'Not found' })
    }
    res.status(HttpCode.OK).json({ contact, status: 'success' })
  } catch (err) {
    next(err)
  }
}

const removeContact = async (req, res, next) => {
  try {
    if (!contacts.find(item => item.id === Number(req.params.contactId))) {
      return res.status(HttpCode.NOT_FOUND).json({ status: 'Not found' })
    }
    const newContacts = await contacts.find(contact => contact.id !== Number(req.params.id))
    fs.writeFile(contacts, JSON.stringify(newContacts), 'utf-8')
    res.status(HttpCode.OK).json({ status: 'success' })
  } catch (err) {
    next(err)
  }
}

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone
    }
    // contacts.push(newContact)
    const newContacts = [...contacts, newContact]
    fs.writeFile(contacts, newContacts, 'utf-8')
    res.status(HttpCode.CREATED).json({ status: 'created' })
  } catch (err) {
    next(err)
  }
}

const updateContact = async (req, res, next) => {
  const { name, email, phone } = req.body
  contacts.forEach(contact => {
    if (!contact.id === Number(req.params.contactId)) {
      return res.status(HttpCode.BAD_REQUEST).json({ status: 'Bad Request' })
    }
    if (name) contact.name = name
    if (email) contact.email = email
    if (phone) contact.phone = phone
    res.status(HttpCode.OK).json({ status: 'Success' })
  })
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
