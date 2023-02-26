import { Element } from 'slate';
import { getJsxCodeBlock } from './utils';

export const lesson1: Element[] = [
    getJsxCodeBlock(`
// ПЕРЕМЕННЫЕ (variables)

// Мы будем объявлять их с помощью ключевого слова let:
let myVariable;

// myVariable - это имя переменной
// оно может быть практически любым словом

Какое слово используем для объявления переменных?
§§start±§let±string§§
`),
    getJsxCodeBlock(`
// Переменные нужны чтобы запоминать что-либо, например числа
// Например
let a = 12;
let b = 4;
a + b // => 16;

let c = 8
a + c // => §§§20±16±12§§
`),
    getJsxCodeBlock(`
// Переменную можно переопределить
let myFavoriteFruit = '🍎';

// Присвоим другое значение
myFavoriteFruit = '🍐';
// в итоге значение заменяется и '🍎' больше не будет в ней
// Сохранится лишь последнее присвоенное значение - §§§'🍐'±'🍎'§§
`),
    getJsxCodeBlock(`
myFavoriteFruit = '🍋';

// Что сейчас лежит внутри myFavoriteFruit?
§§§'🍋'±'🍐'±'🍎'§§
`),
    getJsxCodeBlock(`
// Переменную нельзя дважды объявить
// let myFavoriteFruit = '🍎'; // -> ТАК ДЕЛАТЬ НЕЛЬЗЯ! Потому что мы выше уже объявляли переменную с именем myFavoriteFruit

// Какую переменную можно сейчас объявить?
let §§a±b±c±§d§§;
`),
    getJsxCodeBlock(`
// Верно, d мы еще не объявляли, а остальные (a, b, c) объявляли в начале урока

// Чтобы посмотреть, что лежит в переменной используется вот такая встроенная функция:
console.log(myFavoriteFruit); // -> '🍋'
// С помощью какой функции можно вывести в консоль значение переменной?
§§log.console±§console.log±colorblog±console.look§§;
`),
    getJsxCodeBlock(`
// Теперь давай немного посоставляем выражения:
§>let±fruits±=±'🍋🍐🍎'§>
`),
    getJsxCodeBlock(`
// Объявим другую переменную
§>let±fruitBox±=±"🍋🍐🍎"±§console.log§>
`),
    getJsxCodeBlock(`
// Отлично, продолжаем! 
§>let±money=±100§>
`),
    getJsxCodeBlock(`
// Теперь будем менять переменную money
money = 130;
console.log(money) // -> §§§130±230±100§§
`),
    getJsxCodeBlock(`
money = money + 10;
console.log(money) // -> §§§140±10±240§§
`),
    getJsxCodeBlock(`
money = money - 120;
console.log(money) // -> §§$20±140±0§§
`),
];
