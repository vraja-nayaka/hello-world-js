export default [
    `
// Привет, это более сложные задачи, чтобы проверить свои знания, подготовиться к собеседованию, или узнать что-то новое

// ! Проверь свои знания JS

// ? Что получим в результате выполнения функции
function sum(a, b) {
    return a + b;
}

sum(1, '2');

§§NaN±3±§'12'±TypeError§§
`,
`
// ? Что выведет консоль?
function checkMurka(data) {
    if (data === { cat: 'murka' }) {
        console.log('Это моя Мурка');
    } else if (data == { cat: 'murka' }) {
        console.log('Это все еще моя Мурка');
    } else {
        console.log('Хмм.. Похоже, это не Мурка');
    }
}

checkMurka({ cat: 'murka' });

§§'Это моя Мурка'±'Это все еще моя Мурка'±§'Хмм.. Похоже, это не Мурка'§§
`,
`
// ? Что выведет консоль?
console.log(typeof typeof 1);

§§"number"±§"string"±"object"±"undefined"§§
`,
`
// ? Что выведет консоль?
const foo = {
    id: 1,
    getId() {
      return this.id;
    },
    bar: {
        id: 999,
        getId() {
            return this.id;
        }
    }
}
console.log(foo.bar.getId());

§§1±§999±undefined±'foo.bar.getId'§§
`,
`
// ? А теперь?
let x = foo.bar.getId;
console.log(x())


§§1±999±§undefined±'foo.bar.getId'§§
`,
`
setTimeout(() => console.log(1));
setTimeout(() => console.log(2));

Promise.resolve().then(() => {
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
});

console.log(5);

// ? В каком порядке выведутся консоль-логи?

// -> §§1 2 3 4 5±5 1 2 3 4±5 1 2 4 3±§5 4 3 1 2±5 4 3 2 1§§
`,
``
];
