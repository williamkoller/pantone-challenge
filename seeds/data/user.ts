import { randomUUID } from 'crypto';
import { faker } from '@faker-js/faker';

const map = new Map();
const uniqueEmails = new Set();

for (let i = 0; i <= 1000000; i++) {
  let email = '';

  do {
    email = `${faker.internet.email()}${i}`;
  } while (uniqueEmails.has(email));

  uniqueEmails.add(email);
  map.set(i, {
    id: randomUUID(),
    name: faker.person.fullName(),
    email: email,
    password: faker.internet.password(),
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date(),
  });
}

const users = Array.from(map.values());

const allEmails = users.map((user) => user.email);
const isUnique = new Set(allEmails).size === users.length;
console.log('Todos os e-mails são únicos?', isUnique);

console.log(users);
export default users;
