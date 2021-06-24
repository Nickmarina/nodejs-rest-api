const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController
} = require('../../controllers/contactsController')
const { validateCreateContact, validateUpdateContact } = require('../../validation/contacts.js')

router.get('/', asyncWrapper(listContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', validateCreateContact, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(removeContactController))
router.patch('/:contactId', validateUpdateContact, asyncWrapper(updateContactController))

module.exports = router
