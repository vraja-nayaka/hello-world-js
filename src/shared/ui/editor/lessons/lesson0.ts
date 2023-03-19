export const lesson0: string[] = [
    `// Привет! Этими цветами отмечены комментарии к коду

// ! Если строка начинается с двух слешей - это комментарий

// ? Выбери с каких символов начинаются комментарии:
§§§//±!!±<>§§`,
    `
Отлично!

// Начнем с простого - ЧИСЛА (numbers)
// Это знакомая нам математика в js.

// ? Выбери правильный ответ:
1 + 2;
// -> §§2±§3±4§§`,
    `
// Хорошо. Двигаемся дальше.

// ! Обрати внимание, все что находится после // в строке в примерах - это лишь комментарии. В реальности ты не увидишь этого ответа, но должен понимать что происходит вычисление

// ? Каков результат сложения?
5 + 4; // -> §§8±§9±10§§
`,
    `
// ? Что нужно отнять от 100, чтобы получить 15?
100 - §§35±75±§85§§; // -> 15`,
    `
// ? А здесь умножение и нужно вписать ответ:
2 * 3; // -> §_6§_
`,
    `
// И еще один пример, чтобы закрепить
// ? На что нужно умножить, чтобы получить 360
6 * §§10±§60±81§§; // -> 360
`,
    `
// ? Деление выглядит так. Впиши ответ.
20 / 4; // -> §_5§_
`,
    `
// Поздравляю, ты вспомнил базовую математку! )

// Теперь рассмотрим СТРОКИ (string)

// !'В отличие от чисел строки пишутся в кавычках'

// ? Выбери string:
§§777±§'777'§§
`,
    `
// ! Cтроки могут содержать любой текст, 🙂 эмодзи или числа
'Кавычки могут быть одинарными'
"или двойными"
\`или косыми - все это строки\`

Какое значение не относится к строке?
§§\`2⚽️24\`±"Число"±§// комментарий±'28'§§
`,
    `
// Строки можно складывать. Тогда они склеиваются:
'Привет ' + 'javascript'

Получаем одну строку:
// -> 'Привет javascript'

// ? Теперь твой ход:
'Сочное ' + §§'⚽️'±§'🍎'±'🕸'§§

// Мы хотим получить эту строку:
// -> 'Сочное 🍎'`,
    `
// ? А что нужно прибавить здесь?
"Привет " + §§"медвед"±"пока"±§"сложение"§§;

// -> "Привет сложение"
`,
    `
// А теперь составим выражение полностью
// ? Кликни в пустое поле и выбирай последовательно блоки
§>"Строка "±+±"777"§>

// Мы хотим получить такую строку:
// -> "Строка 777"
`,
    `
// Если мы хотим в строке пробел, то он должен быть частью строки
// Сам собой он не появится
// ? Какой будет результат?
"38" + "попугаев";

§§"38 попугаев"±"38🦜"±§"38попугаев"±"38+попугаев"§§;
`,
    `
// Отлично!

// Давай повторим числа (number), они пишутся без кавычек!
// ? Выбери число
§§"text"±'14'±"number"±§25±"33"§§
`,
    `
// Как ты заметил числа и строки можно также отличить по цвету:
'112' 122 '0' 77 3.14 "007"

// ? Итак последний экзамен по математике:
11 + §§"99"±14±§"0"§§; // -> 110
`,
    `
// На удивление нужен именно "0"!

// Все потому, что JS видит строку, поэтому будет склеивать, а не складывать

То есть 11 + "99" // -> "1199"
// В этом случае JS привел число 11 к строке "11"

Вот такая математика 😁

// Если интересно, то двигаемся дальше!
`,
];
