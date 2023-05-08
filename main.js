// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.

const studentsList = [];

// Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8. Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

function getStudentItem(studentObj) {
  const table = document.getElementById('table');
  const tableElem = document.createElement('div');
  tableElem.id = 'table-elem';

  // вычисляем возраст студента

  const birthDate = new Date(studentObj.dateOfBirth);
  const ageDiffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDiffMs);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);

  const formattedBirthDate = `${birthDate.getDate().toString().padStart(2, '0')}.${(birthDate.getMonth() + 1).toString().padStart(2, '0')}.${birthDate.getFullYear().toString()} (${age} года)`;

  // пишем года обучения
  // Если год обучение не число:
  if (isNaN(studentObj.yearOfStudy)) {
    const yearOfStudy = parseInt(studentObj.yearOfStudy.slice(-4));
    const currentDate = new Date();
    const year = parseInt(currentDate.getFullYear());
    const month = parseInt(currentDate.getMonth()) + 1;
    let currentCourse;

    if (year + 1 === yearOfStudy && month >= 9) {
      currentCourse = 'закончил';
    } else {
      currentCourse = (year + 1) - yearOfStudy;
      if (currentCourse === 0) {
        currentCourse = 1;
      } else if (currentCourse > 4) {
        currentCourse = 'закончил';
      }
    }

    const formattedYearOfStudy = yearOfStudy + '-' + (yearOfStudy + 4) + " " + `(${currentCourse} курс)`;

    // записываем данные в таблицу
    tableElem.append(
    studentObj.surname + ' ',
    studentObj.name + ' ',
    studentObj.lastName + ', ',
    studentObj.faculty + ', ',
    formattedBirthDate + ', ',
    formattedYearOfStudy
    );
   table.appendChild(tableElem);
  } else { // если год обучения число:
    const millOfStudy = studentObj.yearOfStudy;
    console.log (millOfStudy);
    const date = new Date(millOfStudy);
    const yearOfStudy = parseInt(date.getFullYear());
    const currentDate = new Date();
    const year = parseInt(currentDate.getFullYear());
    const month = parseInt(currentDate.getMonth()) + 1;
    let currentCourse;

    if (year + 1 === yearOfStudy && month >= 9) {
      currentCourse = 'закончил';
    } else {
      currentCourse = (year + 1) - yearOfStudy;
      if (currentCourse === 0) {
        currentCourse = 1;
      } else if (currentCourse > 4) {
        currentCourse = 'закончил';
      }
    }

    const formattedYearOfStudy = yearOfStudy + '-' + (yearOfStudy + 4) + " " + `(${currentCourse} курс)`;

    // записываем данные в таблицу
    tableElem.append(
    studentObj.surname + ' ',
    studentObj.name + ' ',
    studentObj.lastName + ', ',
    studentObj.faculty + ', ',
    formattedBirthDate + ', ',
    formattedYearOfStudy
    );
   table.appendChild(tableElem);
  }
}


// Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.Функция должна использовать ранее созданную функцию создания одной записи для студента.Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.

function renderStudentsTable(studentsArray) {
  const table = document.getElementById('table');

  // Очищаем таблицу перед добавлением новых элементов
  table.innerHTML = '';

  // Создаем элементы таблицы для каждого студента
  studentsArray.forEach((student) => {
    getStudentItem(student);
  });
}

// Этап 5. К форме добавления студента добавьте слушатель события отправки формы, в котором будет проверка введенных данных.Если проверка пройдет успешно, добавляйте объект с данными студентов в массив студентов и запустите функцию отрисовки таблицы студентов, созданную на этапе 4.

const form = document.getElementById('students-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // получаем все инпуты
  const inputName = document.getElementById('student-name');
  const inputSurname = document.getElementById('student-surname');
  const inputMiddleName = document.getElementById('student-otchestvo');
  const inputBd = document.getElementById('student-bd');
  const inputYearOfStudy = document.getElementById('student-year-of-study');
  const inputFaculty = document.getElementById('student-faculty');
  // получаем значения инпутов
  const name = inputName.value.trim();
  const surname = inputSurname.value.trim();
  const middleName = inputMiddleName.value.trim();
  const birthDay = inputBd.valueAsDate;
  const yearOfStudy = inputYearOfStudy.valueAsDate;
  const faculty = inputFaculty.value.trim();

	// функция, для записи в объект правильной даты

	function dateFormatting(input, key, studentObj) {
		const day = input.getDate().toString().padStart(2, '0');
		const month = (input.getMonth() + 1).toString().padStart(2, '0');
		const year = input.getFullYear().toString();
		const formattedDate = `${day}.${month}.${year}`;

		studentObj[key] = formattedDate;
	}

  // валидация

  // функция для создания ошибки
  function validationError (input, errorMessage, label) {
    label = document.getElementById(label);
    let errorSpan = label.querySelector('.error-span');
    if (!errorSpan) {
      input.style.cssText = 'outline: 1px solid red;';
      label.style.position = 'relative';
      errorSpan = document.createElement('span');
      errorSpan.classList.add('error-span');
      errorSpan.style.cssText = 'color: red; font-size: 10px; position: absolute; right: 5px; top: 22px;';
      errorSpan.textContent = errorMessage;
      label.appendChild(errorSpan);

      input.addEventListener('input', () => {
        errorSpan.remove();
        input.style.cssText = 'outline: unset;';
      });
    }
  }

  // сама валидация инпутов
  if (!name || !surname || !middleName || !birthDay || !yearOfStudy || !faculty) {
    event.preventDefault();
    if (!name) {
        validationError (inputName, 'Указать имя обязательно', 'name-label');
    }
    if (!surname) {
        validationError (inputSurname, 'Указать фамилию обязательно', 'surname-label');
    }
    if (!middleName) {
        validationError (inputMiddleName, 'Указать отчество обязательно', 'middlename-label');
    }
    // отдельная валидация дат
    const minBirthDay = new Date('1900-01-01').getTime();
    const maxBirthDay = new Date().getTime();

    if (!birthDay) {
      validationError (inputBd, 'Указать дату рождения обязательно', 'bd-label');
    } else if (birthDay.getTime() < minBirthDay || birthDay.getTime() > maxBirthDay) {
      validationError (inputBd, 'Некорректная дата рождения', 'bd-label');
    };

    const minYearOfStudy = new Date('2000-01-01').getTime();
    const maxYearOfStudy = new Date().getTime();

    if (!yearOfStudy) {
      validationError (inputYearOfStudy, 'Указать дату поступления обязательно', 'year-of-study-label');
    } else if (yearOfStudy.getTime() < minYearOfStudy || yearOfStudy.getTime() > maxYearOfStudy) {
      validationError (inputYearOfStudy, 'Некорректная дата поступления', 'year-of-study-label');
    };

    if (!faculty) {
        validationError (inputFaculty, 'Указать факультет обязательно', 'faculty-label');
    }
  } else { // если валидация прошла успешно
		// создаём и формируем объект студента
		const studentObj = {};
		// записываем в него данные
    studentObj.name = name;
    studentObj.surname = surname;
    studentObj.lastName = middleName;
		// получаем дату рождения
		dateFormatting(birthDay, 'dateOfBirth', studentObj);
		// получаем дату поступления
		dateFormatting(yearOfStudy, 'yearOfStudy', studentObj);
    studentObj.faculty = faculty;
    studentsList.push(studentObj);

    for (const input of [inputName, inputSurname, inputMiddleName, inputBd, inputYearOfStudy, inputFaculty]) {
      input.value = '';
    }
    renderStudentsTable(studentsList);
    console.log (studentsList);
  }
});

// Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.

function sorting (studentsArray, key) {
  return studentsArray.sort((a, b) => a[key].localeCompare(b[key]));
}

// кнопки сортировки

const nameBtn = document.getElementById('name-btn');
const surnameBtn = document.getElementById('surname-btn');
const middlenameBtn = document.getElementById('middlename-btn');
const facultyBtn = document.getElementById('faculty-btn');
const birthDateBtn = document.getElementById('bd-btn');
const yearOfStudyBtn = document.getElementById('years-btn');

// обработки кликов по кнопкам

// сортировка по ФИО
nameBtn.addEventListener('click', () => {
  const sortedList = sorting(studentsList, 'name');
  renderStudentsTable(sortedList);
});
surnameBtn.addEventListener('click', () => {
  const sortedList = sorting(studentsList, 'surname');
  renderStudentsTable(sortedList);
});
middlenameBtn.addEventListener('click', () => {
  const sortedList = sorting(studentsList, 'lastName');
  renderStudentsTable(sortedList);
});
// сортировка по факультету
facultyBtn.addEventListener('click', () => {
  const sortedList = sorting(studentsList, 'faculty');
  renderStudentsTable(sortedList);
});
// сортировка по дате рождения
birthDateBtn.addEventListener('click', () => {
  for (const student of studentsList) {
    const date = new Date(student.dateOfBirth);
    const mill = date.getTime();
    student.dateOfBirth = mill;
  }
  const sortedList = studentsList.sort((a, b) => a.dateOfBirth - b.dateOfBirth);
  renderStudentsTable(sortedList);
});
// сортировка по годам обучения
yearOfStudyBtn.addEventListener('click', () => {
  for (const student of studentsList) {
    const date = new Date(student.yearOfStudy);
    const mill = date.getTime();
    student.yearOfStudy = mill;
  }
  const sortedList = studentsList.sort((a, b) => a.yearOfStudy - b.yearOfStudy);
  renderStudentsTable(sortedList);
});

// Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы.

// функция для поиска подстроки
function filter(array, key, value) {
  const filteredArr = array.filter(student => {
    return student[key].toLowerCase().includes(value.toLowerCase());
  });
  return filteredArr;
}

// функция для поиска начального года обучения
function filterStartingYear(array, key, value) {
  const filteredArr = array.filter(student => {
    const year = student[key].slice(6, 10);
    return year === value;
  });
  return filteredArr;
}

// функция для поиска окончательного года обучения
function filterGraduationYear(array, key, value) {
  for (const student of array) {
    const date = new Date(student[key]);
    const year = parseInt(date.getFullYear());
    student.graduationYearOfStudy = year + 4;
  }
  const filteredArr = studentsList.filter(student => {
    return student.graduationYearOfStudy == value;
  });
  return filteredArr;
}

// форма и инпуты фильтрации
const filterForm = document.getElementById('filter-form');
const surnameInput = document.getElementById('surname-filter');
const nameInput = document.getElementById('name-filter');
const middlenameInput = document.getElementById('middlename-filter');
const facultyInput = document.getElementById('faculty-filter');
const startingYearInput = document.getElementById('startingYear-filter');
const graduationYearInput = document.getElementById('graduationYear-filter');

// отправка формы фильтрации
filterForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // получаем значение инпутов
  const surnameValue = surnameInput.value.trim();
  const nameValue = nameInput.value.trim();
  const middlenameValue = middlenameInput.value.trim();
  const facultyValue = facultyInput.value.trim();
  const startingYearValue = startingYearInput.value.trim();
  const graduationYearValue = graduationYearInput.value.trim();

  let filteredStudents = studentsList;

  if (surnameValue) {
    filteredStudents = filter(studentsList, 'surname', surnameValue);
  }

  if (nameValue) {
    filteredStudents = filter(studentsList, 'name', nameValue);
  }

  if (middlenameValue) {
    filteredStudents = filter(studentsList, 'lastName', middlenameValue);
  }

  if (facultyValue) {
    filteredStudents = filter(studentsList, 'faculty', facultyValue);
  }

  if (startingYearValue) {
    filteredStudents = filterStartingYear(studentsList, 'yearOfStudy', startingYearValue);
  }

  if (graduationYearValue) {
    filteredStudents = filterGraduationYear(studentsList, 'yearOfStudy', graduationYearValue);
  };

  renderStudentsTable(filteredStudents);
  console.log (filteredStudents);
})
