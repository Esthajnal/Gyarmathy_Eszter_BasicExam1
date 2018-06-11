function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  //console.log(costCreditsAsc(userDatas));
  var newDatas = withoutConsumablesNull(userDatas);

  /*function kiiratas(newDatas) {
    for (var i in newDatas) {
      console.log(`${i} : ${newDatas[i].value}`);
    }
  }
  kiiratas(newDatas)*/
  for (var i = 0; i < userDatas.length; i++) {
    cartes(userDatas[i], objShapceshipList);
  }
  console.log(everyWillBeUnknown(userDatas));

}
//ár szerint növekvő function
function costCreditsAsc(arr) {
  var i = arr.length;
  var swap = false;

  do {
    swap = false;
    for (var j = 0; j < i - 1; j++) {
      if (arr[j].cost_in_credits === null) {
        arr[j].cost_in_credits = 0;
      };
      if (parseInt(arr[j].cost_in_credits) > parseInt(arr[j + 1].cost_in_credits)) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swap = true;
      }
    }
    i--;
  } while (i >= 0 && swap);
  return arr;
};

//Csak azok amikben a consumable nem null.
function withoutConsumablesNull(arr) {
  var newDatas = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].consumables != null) {
      newDatas += arr[i];
    }
  }
  return newDatas;
}

function everyWillBeUnknown(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++)
      if (arr[j] === null) {
        arr[j] = "unknown";
      }
  }
  return arr;
}

var objShapceshipList = document.querySelector(".shapceship-list")

function cartes(person, containerPanels) {
  var objCartes = document.createElement('DIV');
  var objImgDiv = document.createElement('DIV');
  var objImg = document.createElement('IMG');
  var objDatasDiv = document.createElement('DIV');

  objShapceshipList.appendChild(objCartes);
  objCartes.classList.add('cartes');
  objCartes.appendChild(objImgDiv);
  objImgDiv.classList.add('imgdiv');
  objImgDiv.appendChild(objImg);
  objImg.setAttribute('src', 'Img/' + person.image);
  objCartes.appendChild(objDatasDiv);
  objDatasDiv.classList.add('datasdiv');
  objDatasDiv.innerHTML = `${person.consumables}<br>${person.denomination}<br>${person.cargo_capacity}<br>${person.passengers}<br>${person.max_atmosphering_speed}<br>${person.crew}<br>${person.lengthiness}<br>${person.model}<br>${person.cost_in_credits}<br>${person.manufacturer}`
}

function getCartes(array, place) {

}









getData("/json/spaceships.json", successAjax);