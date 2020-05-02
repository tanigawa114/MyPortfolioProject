/**
 * @author Tetsuya Tanigawa
 * @since 2020/03/31
 */
"use strict";

{
  /**
   * パネルクラス
   */
  class Panel {
    constructor() {
      const section = document.createElement("section");
      section.classList.add("panel");

      this.img = document.createElement("img");
      this.img.src = this.getRandomImage();

      this.timeoutId = undefined;

      this.stop = document.createElement("div");
      this.stop.textContent = "STOP";
      this.stop.classList.add("stop", "inactive");
      this.stop.addEventListener("click", () => {
        if (this.stop.classList.contains("inactive")) {
          return;
        }
        this.stop.classList.add("inactive");
        clearTimeout(this.timeoutId);

        panelsLeft--;

        if (panelsLeft === 0) {
          checkResult();
          spin.classList.remove("inactive");
          panelsLeft = 3;
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector("main");
      main.appendChild(section);
    }

    /**
     *
     */
    getRandomImage() {
      const images = ["img/seven.png", "img/bell.png", "img/cherry.png"];

      return images[Math.floor(Math.random() * images.length)];
    }

    /**
     *
     */
    spin() {
      this.img.src = this.getRandomImage();
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    /**
     *
     */
    isUnmatched(p1, p2) {
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    /**
     *
     */
    unmatch() {
      this.img.classList.add("unmatched");
    }

    /**
     *
     */
    activate() {
      this.img.classList.remove("unmatched");
      this.stop.classList.remove("inactive");
    }
  }

  /**
   * 結果判定
   */
  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  /**
   * SPINボタンエレメント
   */
  const spin = document.getElementById("spin");
  /**
   * パネル枚数
   * @type {number}
   */
  let panelsLeft = 3;
  /**
   * パネル配列
   * @type {Array}
   */
  const panels = [
    new Panel(spin, panelsLeft),
    new Panel(spin, panelsLeft),
    new Panel(spin, panelsLeft)
  ];

  /**
   * SPINボタン押下時イベント
   */
  spin.addEventListener("click", () => {
    if (spin.classList.contains("inactive")) {
      return;
    }

    spin.classList.add("inactive");
    panels.forEach(panel => {
      panel.activate();
      panel.spin();
    });
  });
}
