import { Element } from 'slate';
import { CodeBlockType, CodeLineType } from './consts';

const toChildren = (content: string) => [{ text: content }];

const toCodeLines = (content: string): Element[] =>
    content.split('\n').map((line) => ({ type: CodeLineType, children: toChildren(line) }));

const getJsxCodeBlock = (codeString: string) => {
    return {
        type: CodeBlockType,
        language: 'jsx',
        children: toCodeLines(codeString),
    };
};

export const initialValue1: Element[] = [
    getJsxCodeBlock(`
    // А здесь умножение и нужно вписать ответ:
    2 * 3; // -> §_6§_
    `),
    getJsxCodeBlock(`// Привет! Этим цветом отмечены комментарии к коду
// Если строка начинается с двух слешей - это комментарий

// Выбери с каких символов начинаются комментарии:
§§§//±!!±<>§§`),
    getJsxCodeBlock(`
Отлично!

// Теперь разберем ЧИСЛА (number)
// Мы можем использовать математику в js.

// Выбери правильный ответ:
1 + 2; // -> §§2±§3±4§§`),
    getJsxCodeBlock(`
// Двигаемся дальше.
// Обрати внимание, все что находится после // в строке в примерах - это лишь комментарии
// В реальности ты не увидишь этого ответа, но должен понимать что происходит вычисление
5 + 4; // -> §§8±§9±10§§
`),
    getJsxCodeBlock(`100 - §§35±75±§85§§; // -> 15`),
    getJsxCodeBlock(`
// А здесь умножение и нужно вписать ответ:
2 * 3; // -> §_6§_
`),
    getJsxCodeBlock(`
// И еще один пример, чтобы закрепить
6 * §§10±§60±81§§; // -> 360
`),
    getJsxCodeBlock(`
// Деление выглядит так:
20 / 4; // -> §_5§_
`),
    getJsxCodeBlock(`
// Поздравляю, ты вспомнил базовую математку

// Теперь рассмотрим СТРОКИ (string)

'В отличие от чисел строки пишутся в кавычках'

// Выбери string:
§§777±§'777'§§
`),
    getJsxCodeBlock(`
'Cтроки могут содержать любой текст, 🙂 эмодзи или числа'
'Кавычки могут быть одинарными'
"или двойными"
\`или косыми - все это строки\`

Какое значение не относится к строке?
§§\`Футбол ⚽️\`±"Число"±§// комментарий±'28'§§
`),
    getJsxCodeBlock(`
// Строки можно складывать. Тогда они склеиваются:
'Привет ' + 'javascript' // -> 'Привет javascript'

'Сочное ' + §§'⚽️'±§'🍎'±'🕸'§§ // -> 'Сочное 🍎'`),
    getJsxCodeBlock(`
"Привет " + §§"медвед"±"пока"±§"сложение"§§; // -> "Привет сложение"
`),
    getJsxCodeBlock(`
// А теперь составим выражение полностью
// (кликни в пустое поле и выбирай последовательно блоки)
§>"Строка "±+±"777"±// ->±"Строка 777"§>
`),
    getJsxCodeBlock(`
// Давай повторим числа (number), они пишутся без кавычек!
// Выбери число
§§"text"±'14'±"number"±§25±"33"§§
`),
    getJsxCodeBlock(`
// Как ты заметил числа и строки можно также отличить по цвету:
'112' 122 '0' 77 3.14 "007"

// Итак последний экзамен по математике:
11 + §§"99"±14±§"0"§§; // -> 110
`),
    getJsxCodeBlock(`
// На удивление нужен именно "0"!

// Все потому, что JS видит строку, поэтому будет склеивать, а не складывать

То есть 11 + "99" // -> "1199"
// В этом случае JS привел число 11 к строке "11"

Вот такая математика 😁

// Если интересно, то двигаемся дальше!
`),
];

export const initialValue2: Element[] = [
    getJsxCodeBlock(`
'Теперь разберем массивы (array):'
// Массив - это упорядоченная коллекция
[] // это пустой массив

Внутри может лежать что угодно:
[34, 'Ключи от квартиры', 'строка с эмодзи 🎉'];

А этот ящик фруктов - это тоже массив
['🍎', '🍐', '🍊', '🍑', '🍍', '🍇'];
// элементы разделены запятой!

"тут будет задание на последовательное собирание массива из предложенных элеменов ][",текст"

Потом подмешаются неправильные элементы также

Потом предложится ввести с клавиатуры массив

В конце тест
Выберите пустой массив

§§[""]±§[]±[0]±null§§;

+ что-то еще
`),
    getJsxCodeBlock(`
// объяви пустой массив
§>const±emptyArray±=±[]±§{±§}±delete§>`),
];
