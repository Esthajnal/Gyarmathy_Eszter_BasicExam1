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
  console.log(costCreditsAsc(userDatas));
}

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
}


getData("/json/spaceships.json", successAjax);