export default [
    `
// Теперь немного математики с числами внутри переменных

// ? Объявляем переменную counter
§>let±counter;§>
`,
    `
// ? Теперь присвой переменной counter значение 0
§>counter±=±0;§>
`,
    `
// ! Оператор присвоения " = " имеет самый низкий приоритет
// Поэтому, всегда сначала вычисляется все что справа, а затем уже идет присвоение
counter = 2 + 2;

// ? Что выведет консоль?
console.log(counter); // -> §§2±"2 + 2"±§4±'counter'§§;
`,
    `
// ? Теперь давай объявим переменную newCounter:
§_let newCounter;§_

// ! не забудь про точку с запятой (;) в конце
`,
    `
// ! Мы можем при присваивании значения переменной ссылаться на другую переменную

newCounter = counter;
// Эта команда присвоит переменной newCounter значение переменной counter

// Поскольку counter выше у нас стал равен 4, то и newCounter теперь тоже 4

newCounter = counter + 4;

// ? Чему теперь равна переменная newCounter?
console.log(newCounter); // -> §§4±§8±'counter'§§;
`,
    `// Еще одна деталь:
counter = 4;
// Присвоим переменной newCounter новое значение
newCounter = counter + 9;
// ! Когда мы используем переменную js подставляет ее значение по месту использования

// То есть выполняться будет так:
newCounter = 4 + 9;
// Затем сложение осуществится
newCounter = 13;

// ? Чему теперь равна переменная newCounter?
console.log(newCounter); // -> §§§13±4±counter§§;
`,
    `
// Помним, что counter сейчас равен 4

// Присвоим новое значение переменной newCounter:
newCounter = counter + 4;
// ! Важно, что в этом случае менятется только переменная newCounter
// ! Переменная counter не меняется, она просто используется!

// ? Чему осталась равна переменная counter?
console.log(counter); // -> §§§4±8±64§§;
`,
    `
// Будь внимателен!
// Теперь присвоим другое значение:
counter = 4;

let myCar = "Mazda";

console.log(counter); // -> §§§4±5±"Mazda"±8§§;
`,
    `
// Да, внимательность в программировании крайне важна

Выше мы присвоили значение "Mazda" переменной myCar!
А выводили в консоль переменную counter, которая равна 4

// ? Давай присвоим переменной myCar новое значение
§>myCar±=±"BMW";§>
`,
    `
// Еще один примерчик с подвохом:
counter = 2 + 5;

console.log(myCar); // -> §§6±5±§"BMW"±2§§;
`,
    `
// Неплохо, кажется теперь ты будешь внимательнее

// Давай на последок вспомним склеиваниее строк и чисел

// Итак теперь у нас myCar = "BMW" и counter = 7

// ? Что выведет консоль лог?
console.log(myCar + counter); // -> §§"myCarcounter"±§"BMW7"±"myCar7"§§

// ! Переменные сперва возьмут из памяти свои значения, и подставят их вместо себя, а затем уже произойдет сложение
`,
    `
// ? Напоследок найди соотвествие:
§~console.log()±веведение значения в консоль§"let"±Строка§let±Оператор объявления переменной§=±оператор присваивания§~
`,
    `Ты молодец, освоил очень важную тему!
 `,
];
