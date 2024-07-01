import express from 'express';
import * as contactsController from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = express.Router();

router.get('/', ctrlWrapper(contactsController.getAllContacts));
router.get('/:contactId', ctrlWrapper(contactsController.getContactById));
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContact),
);
router.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContact),
);
router.delete('/:contactId', ctrlWrapper(contactsController.deleteContact));

export default router;
