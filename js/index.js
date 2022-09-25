// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const minWeightInptut = document.querySelector('.minweight__input');// поле с минимальным весом
const maxWeightInput = document.querySelector('.maxweight__input');//  поле с максимальным весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

/*** ОТОБРАЖЕНИЕ ***/

// отрисовка карточек
const display = () => {
  
  let removeFruits=fruitsList.querySelectorAll('li.fruit__item');  
  removeFruits.forEach((plant) => {fruitsList.removeChild(plant);})  

  // function rusColorName2hex(color='античный белый'){return '#'+(niceColors.find(x => x.id === color))['#'];}
  function addColorClass(fruit,color){
    switch (color) {
      case 'фиолетовый':
        fruit.classList.add('fruit_violet');
      break;
      case 'зеленый':
        fruit.classList.add('fruit_green');
      break;
      case 'розово-красный':
        fruit.classList.add('fruit_carmazin');
      break;
      case 'желтый':
        fruit.classList.add('fruit_yellow');
      break;
      case 'светло-коричневый':
        fruit.classList.add('fruit_lightbrown');
      break;
      default:
        fruit.classList.add('fruit_black');
    }
    // return 1;
  }

  for (let i = 0; i < fruits.length; i++) {
    let fruit = document.createElement('li');
    let card = document.createElement('div');
    fruit.className='fruit__item';
    card.className='fruit__info';
    card.innerHTML=`<div>index: ${i+1}</div>
    <div>kind: ${fruits[i].kind}</div>
    <div>color: ${fruits[i].color}</div>
    <div>weight (кг): ${fruits[i].weight}</div>`;
    addColorClass(fruit,fruits[i].color);
    fruitsList.appendChild(fruit);
    fruit.appendChild(card);
  }
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let initialFruits=JSON.stringify(fruits);

  while (fruits.length > 0) {
    // TODO: допишите функцию перемешивания массива
    //
    // Подсказка: находим случайный элемент из fruits, используя getRandomInt
    // вырезаем его из fruits и вставляем в result.
    // ex.: [1, 2, 3], [] => [1, 3], [2] => [3], [2, 1] => [], [2, 1, 3]
    // (массив fruits будет уменьшатся, а result заполняться)
    let randomFruit=getRandomInt(0,(fruits.length)-1);
    result.unshift(fruits[randomFruit]);
    fruits.splice(randomFruit, 1);
  }
  if(initialFruits === JSON.stringify(result)){
    alert('Кажется, всё осталось на своих местах... Попробуйте снова.')
  }
  fruits = result;
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let cuttedArr = fruits.filter(function(fruit) {
    return fruit.weight <= maxWeightInput.value && fruit.weight >= minWeightInptut.value;
  });
  fruits = cuttedArr;
};

filterButton.addEventListener('click', () => {
  let removeFruits=fruitsList.querySelectorAll('li.fruit__item');  
  removeFruits.forEach((plant) => {fruitsList.removeChild(plant);}) 
  filterFruits();
  display();
});
/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparisonColor = (a, b) => {
  return (a.color == b.color) ? 0 : (a.color < b.color ?  1 : -1);
};

const sortAPI = {
  bubbleSort(arr, comparison) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparison) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparison) {
    const start = new Date().getTime();
    sort(arr, comparison);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparisonColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
