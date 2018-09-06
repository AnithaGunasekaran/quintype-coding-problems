global.startApp = function(container) {
  console.log("Here is the container:", container);

  $(document).ready(function() {
    //Reset all squares to have "?" marks
    resetSquares();
    var dSquares = genDiamondSquare();
    console.log(dSquares);
  });

  $(".diamondsweeper-board").delegate("td", "click", function() {});

  function resetSquares(dSquares, clickedSquares) {
    $this = $(".diamondsweeper-board td a");
    $this.each(function(index) {
      //Add bg color for testing.
      if (dSquares.indexOf(index) >= 0) {
        $(this).css("background-color", "yellow");
      }
      //Add cell index
      $(this).attr("data-cellid", index);
    });
  }

  //Generate diamond squares
  function genDiamondSquare() {
    var dArr = [];
    while (dArr.length <= 7) {
      var rand = Math.round(Math.random() * 63);
      if ($.inArray(rand, dArr) === -1) {
        dArr.push(rand);
      }
    }

    return dArr;
  }
  function bindEvent() {}
};
