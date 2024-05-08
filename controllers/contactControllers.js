const asyncHanlder = require('express-async-handler')
const Contact = require('../models/contactModel')

const getContacts = asyncHanlder(async (req, res) => {
    const contacts = await Contact.find({ created_by: req.user.id });
    res.status(200).json(contacts)
})
const getContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})
const createContact = asyncHanlder(async (req, res) => {
    const { name, email, mobile } = req.body;
    validateContact(req.body, res)
    const contact = new Contact({ name, email, mobile, created_by: req.user.id })
    await contact.save()
    res.status(201).json({ message: 'Contact created successfully', contact })

})
const updateContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    } 
    if (contact.created_by != req.user.id) {
        res.status(401)
        throw new Error('Not authorized to update this contact')
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({ message: 'Contact updated successfully', updateContact })
})
const deleteContact = asyncHanlder(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if (contact.created_by != req.user.id) {
        res.status(401)
        throw new Error('Not authorized to delete this contact')
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Contact deleted successfully' })
})
const validateContact = ({ name, email, mobile }, res) => {
    if (!name || !email || !mobile) {
        res.status(404);
        throw new Error('All fields are required')
    }
}
module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }