// let color_palette = ["#aafff4de", "#05eeffe1", "#d0f985db", "#ffe1e7e2"];
// let basePalette = ["#fc97b7", "#ff6ec7"];
let padding = 300;
async function setup() {
  createCanvas(2000, 1400); // 畫布大小：width, height

  let color_rand = random();
  // features setting
  if (color_rand < 0.4) {
    // "rusty blue"
    color_palette = [
      "#aafff4de",
      "#05eeffe1",
      "#d0f985db",
      "#ffe1e7e2",
      "#ffad31",
      "#04a7b9ba",
      "#945031",
      "#ffad31d3",
    ];
    basePalette = ["#05eeffe1"];
  } else if (color_rand < 0.7) {
    // "blue"s
    color_palette = ["#d0f985db", "#ffe1e7e2", "#04a7b9", "#ffad31dd"];
    basePalette = ["#a0e7e5", "#ffe1e7e2"];
  } else {
    // "light blue"
    color_palette = [
      "#d0f985db",
      "#aafff4de",
      "#EDDBB3",
      "#ffe1e7e2",
      "#699BE5",
      "#ffad31",
    ];
    basePalette = ["#aafff4de", "#aafff4de"];
  }
  background(random(basePalette)); // 背景顏色
  colorMode(HSB);

  let xsum = 0;
  for (let i = 0; i < 15; i++) {
    let R = 3;
    let xSpan = 2;
    let ySpan = R + 2;
    let xCount = 2;
    let yCount = 1000;
    let x = xsum;
    let y = 0;

    BA_rect(x, y, xCount, yCount, xSpan, ySpan, R);
    BA_rect(x + 15, y, xCount, yCount, xSpan, ySpan, R);

    xsum += 150;
  }

  // 只畫一次
  noLoop();
}

function draw() {}

// _x: 起始x座標, _y: 起始y座標, _xCount: x方向點點排數, _yCount: y方向點點排數, _xSpan: x方向間距, _ySpan: y方向間距, _R: 點點大小
async function BA_rect(_x, _y, _xCount, _yCount, _xSpan, _ySpan, _R) {
  let mainClr = random(color_palette); // 隨機選一個顏色
  let fade_scale = random() * 2; // 0-1

  let mainHue = hue(mainClr);
  let mainSat = saturation(mainClr);
  let mainBri = brightness(mainClr);

  let lightClr = color(mainHue, mainSat - 10, mainBri + 50); // 顏色變亮

  // 繪製點點矩陣
  for (let i = 0; i < _xCount; i++) {
    let px = i * _xSpan + _x; // 計算 x 座標
    for (let j = 0; j < _yCount; j++) {
      let py = j * _ySpan + _y; // 計算 y 座標

      let fade_rate = j / _yCount; // 0-1
      fade_rate = map(fade_rate, 0, 1, 0, fade_scale);
      if (random() > fade_rate) {
        push(); // 儲存畫布目前狀態
        translate(px, py); // 移動畫布原點
        // fill(lightClr); // 填色

        if (random() > 0.5) {
          fill(abs(sin(py / 10)) < 0.3 ? lightClr : mainClr); // 畫出亮
        } else {
          fill(abs(sin(px / 10)) < 0.3 ? lightClr : mainClr);
        }
        noStroke(); // 不要外框線

        let r = _R * random(0.8, 1.5);
        circle(0, 0, r); //

        // 用線條繪製 XX 材質
        if (random() < 0.05) {
          noFill();
          stroke(mainClr);
          strokeWeight(2);
          line(-r, -r, r, r);
          line(-r, r, r, -r);
        }

        // 用弧線繪製毛茸茸材質
        if (random() < 0.01) {
          noFill();
          stroke(random(color_palette)); // 隨機跳色
          strokeWeight(2);
          push();
          rotate(random(TWO_PI));
          let arcW = r * 2 * random(0.8, 2);
          let arcH = r * 2 * random(0.8, 2);
          arc(-random(r), random(r), arcW, arcH, 0, PI * 1.5);
          pop();
        }

        pop(); // 回復至畫布先前狀態
      }
    }
  }
}
