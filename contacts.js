const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');


// метод path.join збирає та нормалізує абсолютний шлях до файлу
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
// console.log(contactsPath);


// читає файл контактів, форматує його та повертає масив контактів, 
const listContacts = async () => {
    const data = (await fs.readFile(contactsPath));
    return JSON.parse(data);
  
};

// відфільтровує по id та повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений
const getContactById = async id => {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    return result || null;
};

// отримуємо всі контакти, знаходимо необхідний по id. Якщо не знайдено такий індекс, то повертає null.
//  Повертає об'єкт видаленого контакту(метод splice) 
// Повністю перезаписує список контактів
const removeContact = async (id) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
};


// отримує всі контакти, розпиляє їх, додає новий контакт. Повністю перезаписує масив контактів вже з новим контактом.
//  Повертає об'єкт доданого контакту.
const addContact = async (data) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;

};

// отримуємо всі контакти, знаходимо необхідний по id. Якщо не знайдено такий індекс, то повертає null.
// Якщо знайдено, то перезаписуємо масив контакту та оновлюємо весь список контактів. Повертає об'єкт оновленого контакту
const updateById = async (id, data) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
        return null;
    }
    contacts[index] = { id, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
};


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateById
}