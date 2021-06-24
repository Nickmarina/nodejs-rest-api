const express = require('express')
const router = express.Router()
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController
} = require('../../controllers/contactsController')
const { validateCreateContact, validateUpdateContact } = require('../../validation/contacts.js')

router.get('/', listContactsController)
router.get('/:contactId', getContactByIdController)
router.post('/', validateCreateContact, addContactController)
router.delete('/:contactId', removeContactController)
router.patch('/:contactId', validateUpdateContact, updateContactController)

module.exports = router
