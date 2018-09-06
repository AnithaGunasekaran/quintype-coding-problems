global.startApp = function(container) {
  console.log("Here is the container:", container);

  $(document).ready(function() {
    //Reset all squares to have "?" marks
    resetSquares();
    var dSquares = genDiamondSquare();
    console.log(dSquares);
  });

  $(".diamondsweeper-board").delegate("td", "click", function() {});

  function resetSquares() {
    $(".diamondsweeper-board td div")
      .addClass("unknown")
      .removeClass("arrow diamond");
  }

  function genDiamondSquare() {
    var dArr = [];
    for (var i = 0; i < 7; i++) {
      var rand = Math.round(Math.random() * 63);
      if (!$.inArray(rand, dArr)) {
        dArr.push(rand);
      }
    }
    return dArr;
  }
  function bindEvent() {}
};
