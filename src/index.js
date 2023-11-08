import './style.css';

const open = document.querySelector('.open');
const car = document.querySelector('.car');



const getTestCar = () => {
  const typeBool = Math.random() < 0.6;
  const listCar = typeBool ? testArray.passangerCar : testArray.truck;
  const randomCar = listCar[(Math.floor(Math.random() * listCar.length))];
  return randomCar;
};


open.addEventListener('click', () => {
  console.log('Открыто');
  open.remove();
  car.style.display = 'block';
  car.addEventListener('click', () => {
    console.log(getTestCar());
  });
});


