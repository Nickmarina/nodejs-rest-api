const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelper')
const{ authMiddleware } = require('../../helpers/authMiddleware')
const {
  listContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateStatusContactController
} = require('../../controllers/contactsController')
const { validateCreateContact, validateUpdateContact, validateUpdateStatus } = require('../../validation/contacts.js')

router.use(authMiddleware)
router.get('/', asyncWrapper(listContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', validateCreateContact, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(removeContactController))
router.put('/:contactId', validateUpdateContact, asyncWrapper(updateContactController))
router.patch('/:contactId/favorite', validateUpdateStatus, asyncWrapper(updateStatusContactController))

module.exports = router
