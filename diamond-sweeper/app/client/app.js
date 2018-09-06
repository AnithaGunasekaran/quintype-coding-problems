global.startApp = function(container) {
  console.log("Here is the container:", container);

  //Globals
  var score = 64;
  var clickedSquares = [];
  var dSquares = genDiamondSquare();
  var rightEdges = [7, 15, 23, 31, 39, 47, 55, 63];
  var leftEdges = [0, 8, 16, 24, 32, 40, 48, 56];

  $(document).ready(function() {
    $("#score").text(score);
    resetSquares();
  });

  $(".diamondsweeper-board td a").bind("click", function() {
    var clickedId = Number($(this).attr("data-cellid"));
    var indexOfDiamond = dSquares.indexOf(clickedId);
    clickedSquares.push(clickedId); // to store the progress

    $("td a").removeClass("arrow");

    if (indexOfDiamond >= 0) {
      //User has clicked on diamond square.
      $(this).addClass("diamond");
      dSquares.splice(indexOfDiamond, 1); //Removing the diamond square from the array
    } else {
      //Logic to decide the direction of arrow
      var direction;
      if (leftEdges.indexOf(clickedId) >= 0) {
        direction = cornerCases(dSquares, clickedId, "left"); //Edge case
      } else if (rightEdges.indexOf(clickedId) >= 0) {
        direction = cornerCases(dSquares, clickedId, "right"); //Edge case
      } else {
        direction = calAdjacentCells(dSquares, clickedId, 8);
      }
      if (direction !== undefined) {
        $(this).addClass("arrow " + direction);
      }
    }

    $(this).removeClass("unknown");

    //Update score
    score--;
    $("#score").text(score);

    $(this).off("click"); //Unbind click event on a clicked cell

    //No more diamonds left. Game over
    if (dSquares.length === 0) {
      $(".alert")
        .text("Game Over")
        .addClass("alert-success");
      $("table td a").off("click");
    }
  });

  function resetSquares() {
    $(".diamondsweeper-board td a").each(function(index) {
      //Add bg color for testing.
      if (dSquares.indexOf(index) >= 0) {
        $(this).css("background-color", "yellow");
      }
      //Add cell index
      $(this).attr("data-cellid", index);
    });
  }

  //Helper function to take care of the logic when user clicks on corner cells
  function cornerCases(dSquares, clickedId, direction) {
    var top = clickedId - 8;
    var bottom = clickedId + 8;
    console.log(direction);
    if (direction === "left") {
      var topRight = top + 1; //Top Right
      var middleRight = clickedId + 1; // Right cell
      var bottomRight = bottom + 1; // Bottim Right
      //Checking for the presence of diamonds in adjacent cells. Since the edge cell, only one side is checked
      if (dSquares.indexOf(middleRight) >= 0) {
        return "right";
      } else if (dSquares.indexOf(top) >= 0) {
        return "up";
      } else if (dSquares.indexOf(topRight) >= 0) {
        return "bottom-left";
      } else if (dSquares.indexOf(bottom) >= 0) {
        return "down";
      } else if (dSquares.indexOf(bottomRight) >= 0) {
        return "top-left";
      }
    } else {
      var topLeft = top - 1; //Top Left
      var middleLeft = clickedId - 1; //Middle Left
      var bottomLeft = bottom - 1; // Bottom left

      if (dSquares.indexOf(middleLeft) >= 0) {
        return "left";
      } else if (dSquares.indexOf(top) >= 0) {
        return "up";
      } else if (dSquares.indexOf(bottom) >= 0) {
        return "down";
      } else if (dSquares.indexOf(topLeft) >= 0) {
        return "bottom-left";
      } else if (dSquares.indexOf(bottomLeft) >= 0) {
        return "top-left";
      }
    }
    return;
  }

  //Get Adjacent cells
  function calAdjacentCells(dSquares, clickedId) {
    //Get adjacent cells in top row
    var top = clickedId - 8;
    var topLeft = top - 1;
    var topRight = top + 1;

    //Get adjacent cells in same row
    var middleLeft = clickedId - 1;
    var middleRight = clickedId + 1;

    //Get adjacent cells in botom row
    var bottom = clickedId + 8;
    var bottomLeft = bottom - 1;
    var bottomRight = bottom + 1;

    if (dSquares.indexOf(middleRight) >= 0) {
      return "right";
    } else if (dSquares.indexOf(middleLeft) >= 0) {
      return "left";
    } else if (dSquares.indexOf(topRight) >= 0) {
      return "bottom-right";
    } else if (dSquares.indexOf(topLeft) >= 0) {
      return "bottom-left";
    } else if (dSquares.indexOf(top) >= 0) {
      return "up";
    } else if (dSquares.indexOf(bottomRight) >= 0) {
      return "top-right";
    } else if (dSquares.indexOf(bottomLeft) >= 0) {
      return "top-left";
    } else if (dSquares.indexOf(bottom) >= 0) {
      return "down";
    }
    return;
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

  $("#save").click(function() {
    localStorage.setItem("clickedSquare", clickedSquares);
    localStorage.setItem("score", score);
    localStorage.setItem("diamonds", dSquares);
  });
};
