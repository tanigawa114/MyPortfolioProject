/**
 * @author Tetsuya Tanigawa
 * @since 2020/04/01
 */
"use strict";

{
  /** 出題出力領域 */
  const target = document.getElementById("target");
  /** 正解数出力領域 */
  const scoreLabel = document.getElementById("score");
  /** ミス回数出力領域 */
  const missLabel = document.getElementById("miss");
  /** 制限時間出力領域 */
  const timerLabel = document.getElementById("timer");

  /**
   * タイピング文字列配列
   * @const {Array}
   */
  const words = ["apple", "sky", "blue", "middle", "set"];
  /**
   * タイピング文字列
   * @type {string}
   */
  let word;
  /**
   * ロケーション
   * @type {number}
   */
  let loc;
  /**
   * 正解回数
   * @type {number}
   */
  let score;
  /**
   * ミス回数
   * @type {number}
   */
  let miss;
  /**
   * 制限時間（ミリ秒）
   * @type {number}
   */
  const timeLimit = 10 * 1000;
  /**
   * 開始時間
   * @type {number}
   */
  let startTime;
  /**
   * 開始フラグ
   * @type {boolean} true:開始している false:開始していない
   */
  let isPlaying = false;

  /**
   * 出題文字更新
   */
  function updateTarget() {
    let placeholder = "";
    for (let i = 0; i < loc; i++) {
      placeholder += "_";
    }
    target.textContent = placeholder + word.substring(loc);
  }

  /**
   * 制限時間をカウントダウンさせる処理
   *
   * 10ミリ秒毎に制限時間を再描画させる。
   * 制限時間が0秒になったら結果を表示させる。
   */
  function updateTimer() {
    const timerLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timerLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if (timerLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = "0.00";
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = "click to replay";
    }
  }

  /**
   * 結果表示処理
   *
   * ブラウザのアラート機能に結果を表示させる。
   */
  function showResult() {
    // 正解率を算出
    const accuracy = score + miss === 0 ? 0 : (score / (score + miss)) * 100;
    alert(
      `${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`
    );
  }

  /**
   * 画面クリック時イベント
   */
  window.addEventListener("click", () => {
    if (isPlaying) {
      return;
    }
    isPlaying = true;

    // ゲーム開始時に初期化
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });

  /**
   * キーボード入力時のイベント
   */
  window.addEventListener("keydown", e => {
    if (!isPlaying) {
      return;
    }

    if (e.key === word[loc]) {
      // 正解時
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();

      score++;
      scoreLabel.textContent = score;
    } else {
      // ミス時
      miss++;
      missLabel.textContent = miss;
    }
  });
}
