const fs = require('fs').promises
const path = require('path')
const { HttpCode } = require('../helpers/codes.js')

const contactsPath = path.join(__dirname, './contacts.json')

const listContacts = async (req, res, next) => {
  try {
    const contacts = await (fs.readFile(contactsPath, 'utf-8'))
    res.status(HttpCode.OK).json({ contacts: JSON.parse(contacts), status: 'success' })
  } catch (err) {
    next(err)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contacts = await (fs.readFile(contactsPath, 'utf-8'))
    const parsedContacts = JSON.parse(contacts)
    const [contact] = parsedContacts.filter(item => item.id === Number(req.params.contactId))
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
    const contacts = await (fs.readFile(contactsPath, 'utf-8'))
    const parsedContacts = JSON.parse(contacts)
    if (!parsedContacts.find(item => item.id === Number(req.params.contactId))) {
      return res.status(HttpCode.NOT_FOUND).json({ status: 'Not found' })
    }
    const filteredContacts = parsedContacts.filter(contact => contact.id !== Number(req.params.contactId))
    console.log(filteredContacts)
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts), 'utf-8')
    res.status(HttpCode.OK).json({ status: 'success' })
  } catch (err) {
    next(err)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contacts = await (fs.readFile(contactsPath, 'utf-8'))
    const parsedContacts = JSON.parse(contacts)
    const { name, email, phone } = req.body
    const newContact = {
      id: Date.now(),
      name,
      email,
      phone
    }
    const newContacts = [...parsedContacts, newContact]
    fs.writeFile(contactsPath, JSON.stringify(newContacts), 'utf-8')
    res.status(HttpCode.CREATED).json({ status: 'created' })
  } catch (err) {
    next(err)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const contacts = await (fs.readFile(contactsPath, 'utf-8'))
    const parsedContacts = JSON.parse(contacts)
    const { name, email, phone } = req.body
    parsedContacts.forEach(contact => {
      if (!contact.id === Number(req.params.contactId)) {
        return res.status(HttpCode.BAD_REQUEST).json({ status: 'Bad Request' })
      }
      if (name) contact.name = name
      if (email) contact.email = email
      if (phone) contact.phone = phone
      res.status(HttpCode.OK).json({ status: 'Success' })
    })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
