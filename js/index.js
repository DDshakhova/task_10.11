// DOM-элементы
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input');// поле с минимальным весом
const maxWeightInput = document.querySelector('.maxweight__input');//  поле с максимальным весом
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const resetButton = document.querySelector('.reset__btn'); // кнопка сброса
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
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

  // очищаем fruitsList от вложенных элементов,
  // чтобы заполнить актуальными данными из fruits
  let removeFruits=fruitsList.querySelectorAll('li.fruit__item');  
  removeFruits.forEach((plant) => {fruitsList.removeChild(plant);})  

  // заполняем карточки
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

   // рамки для карточек по цвету фрукта
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
  }
};

// первая отрисовка карточек
display();

// кнопка сброса: отменяет перемешивание, фильтрацию, удаляет добавленные фрукты
resetButton.addEventListener('click', () => {
  fruits = JSON.parse(fruitsJSON);
  display();
});

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let resultingFruits = [];
  let initialFruits=JSON.stringify(fruits);
  //  находим случайный элемент из fruits, используя getRandomInt
  //  вставляем в resultingFruits и вырезаем его из fruits.
  //  массив fruits уменьшаeтся, а result заполняeтся
  while (fruits.length > 0) {
    let randomFruit=getRandomInt(0,(fruits.length)-1);
    resultingFruits.unshift(fruits[randomFruit]);
    fruits.splice(randomFruit, 1);
  }
  // если порядок не изменился при перемешивании, выводим предупреждение
  if(initialFruits === JSON.stringify(resultingFruits)){
    alert('Кажется, всё осталось на своих местах... Попробуйте снова.')
  }
  fruits = resultingFruits;
};
// кнопка перемешать
shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  let weighedFruits = fruits.filter(function(fruit) {
    return fruit.weight <= maxWeightInput.value && fruit.weight >= minWeightInput.value;
  });
  fruits = weighedFruits;
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

const comparisonColor = (fruit1, fruit2) => {
  const priorityColor = ['розово-красный','светло-коричневый','желтый','зеленый','фиолетовый'];
  const priority1 = priorityColor.indexOf(fruit1.color);
  const priority2 = priorityColor.indexOf(fruit2.color);
  return priority1 > priority2;
};

const sortAPI = {
  bubbleSort(arr, comparison) {
    // TODO: допишите функцию сортировки пузырьком
    for (let i = 0; i < (arr.length-1); i++) { 
      for (let j = 0; j < (arr.length-1-i); j++) { 
        if (comparison(arr[j], arr[j+1])) { 
            let temp = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = temp; 
        }
      }
    } 
  },

  quickSort(arr, comparison) {
     // Метод помогающий поменять местами элементы массива.
     function swap(items, firstIndex, secondIndex) {
      const tmp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = tmp;
    }

    // Метод позволяющий выполнить итерацию проверки Пивота, Грыницы и Текущего елемента.
    function partition(items, left, right) {
      let pivot = items[Math.floor((right + left) / 2)];
      let i = left;
      let j = right;

      while (i <= j) {
          while (comparisonColor(pivot, items[i])) {
              i++;
          }
          while (comparisonColor(items[j], pivot)) {
              j--;
          }
          if (i <= j) {
              swap(items, i, j);
              i++;
              j--;
          }
      }
      return i;
    }

    // реукурсивная функция для быстрой сортировки массива.
    function qs (items, left, right) {
      let index;

      if (items.length > 1) {
        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;
        index = partition(items, left, right);
        
        if (left < index - 1) {
          qs(items, left, index - 1);
        } 
        if (index < right) {
          qs(items, index, right);
        }
      }
    }

    qs(arr);
  },
    // TODO: допишите функцию быстрой сортировки


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
  sortKind = sortKind==='bubbleSort'? 'quickSort':'bubbleSort';
  sortKindLabel.textContent = sortKind;
  
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparisonColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  if (kindInput.value != '' && colorInput.value != '' && weightInput.value != '') {
    let obj = {};
    obj["kind"] = kindInput.value;
    obj["color"] = colorInput.value;
    obj["weight"] = weightInput.value;
    fruits.push(obj);
      display();
      } else {
    alert('Пожалуйста, проверьте правильность заполнения полей');
      }
  display();
});
