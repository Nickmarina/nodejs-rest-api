const express = require('express')
const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../model')
const { validateCreateContact, validateUpdateContact } = require('../../validation/contacts.js')

router.get('/', listContacts)
router.get('/:contactId', getContactById)
router.post('/', validateCreateContact, addContact)
router.delete('/:contactId', removeContact)
router.patch('/:contactId', validateUpdateContact, updateContact)

module.exports = router
