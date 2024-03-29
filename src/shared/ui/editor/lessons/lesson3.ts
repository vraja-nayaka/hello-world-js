export default [
    `'ПАРАМЕТРЫ ФУНКЦИЙ (params)'

// В функцию можно передавать параметры
function sum(a, b) {
  return a + b;
}

// Что тут является параметрами?
§§function±sum±§a, b±return§§;
`,
    `// Верно, эта функция calc складывает две переменных
let result = sum(12, 25);
console.log(result); // -> §§1225±"38"±38±§37§§;
`,
// ! TODO: порядок аргументов тут не важен!
    `// Отлично, давай сложим другие числа
§>let±newResult±=±sum±(±1998±,±26±)§>
`,
    `// И выведем результат:
§>console.log±(±newResult±)±;± // -> ±2024±§let±§return§§;
`,
    `// Теперь напишем функцию для вычитания:
§>function subtract(a, b) {±return a - b;±}§§;
`,
    `// Как и саму функцию, так и ее параметры мы называем сами, как хотим
// и количество параметров может быть любым:
function goForward(mySuperParam1, next, itIs3) {
    return mySuperParam1 * itIs3 + next;
}
// Но лучше чтобы их названия несли в себе какой-то смысл

// Давай напишем функцию, которая быдет выдавать яблоко
// Обрати внимание, что после любых выражений ставится ";", но после "}" при объявлении функции точка с запятой не ставится
function getApple(firstParam, secondParam, thirdParam) {
    §>return±🍎±;±§firstParam±§}±§{±§secondParam±§thirdParam§§§;
}
`,
];
