const contacts = require('./contacts');
const { Command } = require('commander');

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторити
const invokeAction= async({ action, id, name, email, phone })=> {
  switch (action) {
    case 'list':
          const allContacts = await contacts.listContacts();
          console.table(allContacts);
      break;

      case 'get':
          const contactById = await contacts.getContactById(id);
          console.log(contactById);
      
      break;

      case 'add':
          const addContact = await contacts.addContact({ name, email, phone });
          console.log(addContact);
      
      break;
      case 'update':
          const updateContact = await contacts.updateById(id, { name, email, phone });
          console.log(updateContact);
          
      case 'remove':
          const deleteContact = await contacts.removeContact(id);
          console.log(deleteContact);
      
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({ action: 'update', id: "o5i7VW6DJv3hA2vX4bbWI", name: 'Theodor', email: 'aaaaaaa@mail.com', phone: '111-50-50-50' });
// invokeAction({ action: 'remove', id: "o5i7VW6DJv3hA2vX4bbWI"});