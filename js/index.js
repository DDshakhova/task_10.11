// DOM-элементы
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const minWeightInput = document.querySelector('.minweight__input'); // поле с минимальным весом
const maxWeightInput = document.querySelector('.maxweight__input'); //  поле с максимальным весом
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
// !!! добавила новые элементы, чтобы лучше проиллюстрировать сортировку по цветам радуги
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22},
  {"kind": "Августин", "color": "желтый", "weight": 23},
  {"kind": "Инжир", "color": "синий", "weight": 44},
  {"kind": "Гранат", "color": "красный", "weight": 2},
  {"kind": "Терн", "color": "голубой", "weight": 10},
  {"kind": "Физалис", "color": "оранжевый", "weight": 29}
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
      case 'синий':
        fruit.classList.add('fruit_navy');
      break;
      case 'красный':
        fruit.classList.add('fruit_red');
      break;
      case 'голубой':
        fruit.classList.add('fruit_blue');
      break;
      case 'оранжевый':
        fruit.classList.add('fruit_orange');
      break;
      default:
        fruit.classList.add('fruit_black');
    }
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
// взвешиваем фрукты: получаем данные, введённые пользователем в соответсвующие формы
// записываем взвешенные фрукты в массив fruits
const filterFruits = () => {
  let weighedFruits = fruits.filter(function(fruit) {
    return fruit.weight <= maxWeightInput.value && fruit.weight >= minWeightInput.value;
  });
  fruits = weighedFruits;
};

// кнопка фильтровать
filterButton.addEventListener('click', () => {
  // перезаписываем результат фильтрации исходным, возвращая его в работу,
  // чтобы пользователь мог передумать и выставить новые значения min/max,
  // не используя кнопку сброса
  // добавленные фрукты НЕ БУДУТ доступны при фильтрации
  // можно отключить следующую строку, чтобы сделать их доступными
  fruits = JSON.parse(fruitsJSON);
  // сама фильтрация
  filterFruits();
  display();
});


/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

// распологаем цвета, как в радуге
const comparisonColor = (fruit1, fruit2) => {
  const priorityColor = ['красный','розово-красный','оранжевый','светло-коричневый','желтый','зеленый','голубой','синий','фиолетовый'];
  const priority1 = priorityColor.indexOf(fruit1.color);
  const priority2 = priorityColor.indexOf(fruit2.color);
  return priority1 > priority2;
};

const sortAPI = {
  // функция сортировки ПУЗЫРЬКОМ
  bubbleSort(arr, comparison) {
    // внешняя итерация по элементам
    for (let i = 0; i < (arr.length-1); i++) { 
    // внутренняя итерация для перестановки элемента в конец массива
      for (let j = 0; j < (arr.length-1-i); j++) { 
    // сравниваем элементы    
        if (comparison(arr[j], arr[j+1])) { 
    // производим обмен элементов
            let temp = arr[j+1]; 
            arr[j+1] = arr[j]; 
            arr[j] = temp; 
        }
      }
    } 
  },

  // функция БЫСТРОЙ сортировки
  quickSort(arr, comparison) {
     // функция обмена элементов
     function swap(items, firstIndex, secondIndex) {
      const temp = items[firstIndex];
      items[firstIndex] = items[secondIndex];
      items[secondIndex] = temp;
    }

    // функция разделитель
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

    // алгоритм быстрой сортировки
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

// кнопка сменить алгоритм сортировки:
// переключает значение sortKind между 'bubbleSort' / 'quickSort'
sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind==='bubbleSort'? 'quickSort':'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

// кнопка сортировать
sortActionButton.addEventListener('click', () => {
  // выводим в sortTimeLabel значение 'sorting...'
  sortTimeLabel.textContent = 'sorting...';
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparisonColor);
  display();
  // выводим в sortTimeLabel значение sortTime
  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

// кнопка добавить фрукт
// создаём карточку нового фрукта, получая значения из форм kindInput, colorInput, weightInput
addActionButton.addEventListener('click', () => {
  
  // проверка пустых форм
  if (kindInput.value != '' && colorInput.value != '' && weightInput.value != '') {
    let obj = {};
    obj["kind"] = kindInput.value;
    obj["color"] = colorInput.value;
    obj["weight"] = weightInput.value;
    fruits.push(obj);
    // очищаем поля, чтобы перед добавлением нового фрукта пользователю не пришлось стирать данные вручную
    kindInput.value = '';
    colorInput.value = '';
    weightInput.value = '';
      display();
      } else {
    alert('Пожалуйста, проверьте правильность заполнения полей'); // предупреждение с просьбой заполнить формы
      }
  display();
});

// кнопка сброса: отменяет перемешивание, фильтрацию, удаляет добавленные фрукты, очищает все поля
resetButton.addEventListener('click', () => {
  fruits = JSON.parse(fruitsJSON);
  display();
  maxWeightInput.value = '';
  minWeightInput.value = '';
  kindInput.value = '';
  colorInput.value = '';
  weightInput.value = '';
});
