(function() {
  "use strict";

  var ths = document.getElementsByTagName("th");
  var sortOrder = 1;

  /**
   * テーブルボディ構築
   */
  function rebueldTbody(rows) {
    var tbody = document.querySelector("tbody");

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }

    var i;
    for (i = 0; i < rows.length; i++) {
      tbody.appendChild(rows[i]);
    }
  }

  /**
   * クラス名更新
   */
  function updateClassName(th) {
    var k;
    for (k = 0; k < ths.length; k++) {
      ths[k].className = "";
    }
    th.className = sortOrder === 1 ? "asc" : "desc";
  }

  /**
   * 比較
   */
  function compare(a, b, col, type) {
    var _a = a.children[col].textContent;
    var _b = b.children[col].textContent;

    if (type === "number") {
      var _a = _a * 1;
      var _b = _b * 1;
    } else if (type === "string") {
      var _a = _a.toLowerCase();
      var _b = _b.toLowerCase();
    }

    if (_a < _b) {
      return -1;
    }
    if (_a > _b) {
      return 1;
    }
    return 0;
  }

  /**
   * 行ソート
   */
  function sortRows(th) {
    var rows = Array.prototype.slice.call(
      document.querySelectorAll("tbody > tr")
    );
    var col = th.cellIndex;
    var type = th.dataset.type;

    rows.sort(function(a, b) {
      return compare(a, b, col, type) * sortOrder;
    });
    return rows;
  }

  /**
   * セットアップ
   */
  function setUp() {
    var i;
    for (i = 0; i < ths.length; i++) {
      ths[i].addEventListener("click", function() {
        var rows;
        rows = sortRows(this);

        rebueldTbody(rows);

        updateClassName(this);

        sortOrder *= -1;
      });
    }
  }

  setUp();
})();
