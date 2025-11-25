import { createClient } from 'redis';

const client = createClient({
  url: "redis-12674.crce206.ap-south-1-1.ec2.redns.redis-cloud.com:12674"
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

await client.set('test', 'tadaaa');
const value = await client.get('key');
console.log(value); // >>> value

// await client.hSet('user-session:123', {
//     name: 'John',
//     surname: 'Smith',
//     company: 'Redis',
//     age: 29
// })

// let userSession = await client.hGetAll('user-session:123');
// console.log(JSON.stringify(userSession, null, 2));
/* >>>
{
  "surname": "Smith",
  "name": "John",
  "company": "Redis",
  "age": "29"
}
 */

// await client.quit();
