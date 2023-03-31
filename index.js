const { Command } = require("commander");
const program = new Command();
const contacts = require('./contacts.js');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async({action, id, name, email, phone}) => {
switch (action) {
    case "list":
        const list = await contacts.listContacts()
        console.table(list)
        break;
    
      case "get":
        const contactById = await contacts.getContactById(id)
        console.log("contactById", contactById)
        break;
    
        case "remove":
        const remove = await contacts.removeContact(id)
        console.log("remove", remove)
        break;
    
        case "add":
        const newContact = await contacts.addContact(name, email, phone)
        console.log("newContact", newContact)
        break;
    
      case "update":
        const updateContact = await contacts.updateContact(id, { name, email, phone})
     console.log("updateContact", updateContact);
    break;

  default:
    console.warn("\x1B[31m Unknown action type!");
        break;
}
}

invokeAction(argv)

