<!--
 -  2018/12/20  lize
 -->
<template>
  <div class = "Konva">

    <div id = "demo"></div>
    <div id = "container"></div>

  </div>
</template>

<script>
  import konva from 'konva'
    export default {
        data () {
            return {}
        },
        mounted () {
//          this.ertret();
//          this.wqerwe();
//          this.asd();
//          this.asdasd();
          this.text();

        },
        methods: {

            wqerwe(){

              var stage = new Konva.Stage({
                container : 'demo',    //container 用来容纳舞台的容器
                width : window.innerWidth,
                height : window.innerHeight
              })

              var layer = new Konva.Layer();  //创建一个层

              var text = new Konva.Text({
                x: 10,
                y: 10,
                fontFamily: 'Calibri',
                fontSize: 24,
                text: '',
                fill: 'white'
              });
              stage.add(layer);               //把层添加到舞台
              var layer2 = new Konva.Layer({});  //创建第二个层
              stage.add(layer2);

              var outRect = new Konva.Rect({
                x:100,      //矩形相对父容器的坐标
                y:100,
                width: 500,   //矩形的宽高
                height:50,
                strokeWidth:10,    //描边的宽度
                stroke:'#aaa',     //描边的颜色
                cornerRadius: 25      //圆角
              });
              layer.add(outRect);    //把绘制的图形添加到图层上
              layer.draw();       //切记要绘制图层

              //绘制内部矩形
              var innerRect = new Konva.Rect({
                x:100,
                y:100,
                width: 500*0.5,      //设置外部矩形的宽度为外部矩形的一半
                height:50,
                fill:'skyblue',      //填充颜色
                cornerRadius: 25
              });
              layer2.add(innerRect);
              layer2.draw();

              var group = new Konva.Group({
                x : 0,
                y : 0
              });
              group.add(innerRect);     //把两个矩形添加到组中
              group.add(outRect);
              layer.add(group);    //把组添加到层中
              layer.draw();
              var tween = new Konva.Tween({
                node: rect,             //要进行动画的Konva对象
                x: 300,                 //要进行动画的属性
                opacity: 0.8,
                duration: 1,            //持续时间
                easing: Konva.Easings.EaseIn, //动画的动画效果
                yoyo: true,             //是否进行循环播放的设置
                onFinish: function() {
                  //动画执行结束后，执行此方法
                }
              });
              tween.play();   //启动动画

            },
            asd(){

              var width = window.innerWidth;
              var height = window.innerHeight;

              function getData() {
                return {
                  '1st Floor': {
                    color: 'blue',
                    points: [366, 298, 500, 284, 499, 204, 352, 183, 72, 228, 74, 274]
                  },
                  '2nd Floor': {
                    color: 'red',
                    points: [72, 228, 73, 193, 340, 96, 498, 154, 498, 191, 341, 171]
                  },
                  '3rd Floor': {
                    color: 'yellow',
                    points: [73, 192, 73, 160, 340, 23, 500, 109, 499, 139, 342, 93]
                  },
                  'Gym': {
                    color: 'green',
                    points: [498, 283, 503, 146, 560, 136, 576, 144, 576, 278, 500, 283]
                  }
                };
              }
              function updateTooltip(tooltip, x, y, text) {
                tooltip.getText().setText(text);
                tooltip.setPosition({
                  x : x,
                  y : y
                });
                tooltip.show();
              }
              var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height
              });
              var shapesLayer = new Konva.Layer();
              var tooltipLayer = new Konva.Layer();

              var tooltip = new Konva.Label({
                opacity: 0.75,
                visible: false,
                listening: false
              });

              tooltip.add(new Konva.Tag({
                fill: 'black',
                pointerDirection: 'down',
                pointerWidth: 10,
                pointerHeight: 10,
                lineJoin: 'round',
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffset: 10,
                shadowOpacity: 0.5
              }));

              tooltip.add(new Konva.Text({
                text: '',
                fontFamily: 'Calibri',
                fontSize: 18,
                padding: 5,
                fill: 'white'
              }));

              tooltipLayer.add(tooltip);

              // get areas data
              var areas = getData();

              // draw areas
              for(var key in areas) {

                var area = areas[key];
                var points = area.points;

                var shape = new Konva.Line({
                  points: points,
                  fill: area.color,
                  opacity: 0,
                  closed : true,
                  // custom attr
                  key: key
                });

                shapesLayer.add(shape);

              }

              stage.add(shapesLayer);
              stage.add(tooltipLayer);

              stage.on('mouseover', function(evt) {
                var shape = evt.target;
                if (shape) {
                  shape.setOpacity(0.5);
                  shapesLayer.draw();
                }
              });
              stage.on('mouseout', function(evt) {
                var shape = evt.target;
                if (shape) {
                  shape.setOpacity(0);
                  shapesLayer.draw();
                  tooltip.hide();
                  tooltipLayer.draw();
                }
              });
              stage.on('mousemove', function(evt) {
                var shape = evt.target;
                if (shape) {
                  var mousePos = stage.getPointerPosition();
                  var x = mousePos.x;
                  var y = mousePos.y - 5;
                  updateTooltip(tooltip, x, y, shape.attrs.key);
                  tooltipLayer.batchDraw();
                }
              });

            },
            asdasd(){

              var width = window.innerWidth;
              var height = window.innerHeight;

              /*
               * Vector math functions
               */
              function dot(a, b) {
                return ((a.x * b.x) + (a.y * b.y));
              }
              function magnitude(a) {
                return Math.sqrt((a.x * a.x) + (a.y * a.y));
              }
              function normalize(a) {
                var mag = magnitude(a);

                if(mag === 0) {
                  return {
                    x: 0,
                    y: 0
                  };
                }
                else {
                  return {
                    x: a.x / mag,
                    y: a.y / mag
                  };
                }
              }
              function add(a, b) {
                return {
                  x: a.x + b.x,
                  y: a.y + b.y
                };
              }
              function angleBetween(a, b) {
                return Math.acos(dot(a, b) / (magnitude(a) * magnitude(b)));
              }
              function rotate(a, angle) {
                var ca = Math.cos(angle);
                var sa = Math.sin(angle);
                var rx = a.x * ca - a.y * sa;
                var ry = a.x * sa + a.y * ca;
                return {
                  x: rx * -1,
                  y: ry * -1
                };
              }
              function invert(a) {
                return {
                  x: a.x * -1,
                  y: a.y * -1
                };
              }
              /*
               * this cross product function has been simplified by
               * setting x and y to zero because vectors a and b
               * lie in the canvas plane
               */
              function cross(a, b) {
                return {
                  x: 0,
                  y: 0,
                  z: (a.x * b.y) - (b.x * a.y)
                };
              }
              function getNormal(curve, ball) {
                var curveLayer = curve.getLayer();
                var context = curveLayer.getContext();
                var testRadius = 20;
                // pixels
                var totalX = 0;
                var totalY = 0;
                var x = ball.getX();
                var y = ball.getY();
                /*
                 * check various points around the center point
                 * to determine the normal vector
                 */
                for(var n = 0; n < 20; n++) {
                  var angle = n * 2 * Math.PI / 20;
                  var offsetX = testRadius * Math.cos(angle);
                  var offsetY = testRadius * Math.sin(angle);
                  var testX = x + offsetX;
                  var testY = y + offsetY;
                  if(!context._context.isPointInPath(testX, testY)) {
                    totalX += offsetX;
                    totalY += offsetY;
                  }
                }

                var normal;

                if(totalX === 0 && totalY === 0) {
                  normal = {
                    x: 0,
                    y: -1
                  };
                }
                else {
                  normal = {
                    x: totalX,
                    y: totalY
                  };
                }

                return normalize(normal);
              }
              function handleCurveCollision(ball, curve) {
                var curveLayer = curve.getLayer();
                var x = ball.getX();
                var y = ball.getY();

                var curveDamper = 0.05;
                // 5% energy loss
                if(curveLayer.getIntersection({x:x, y:y})) {
                  var normal = getNormal(curve, ball);
                  if(normal !== null) {
                    var angleToNormal = angleBetween(normal, invert(ball.velocity));
                    var crossProduct = cross(normal, ball.velocity);
                    var polarity = crossProduct.z > 0 ? 1 : -1;
                    var collisonAngle = polarity * angleToNormal * 2;
                    var collisionVector = rotate(ball.velocity, collisonAngle);

                    ball.velocity.x = collisionVector.x;
                    ball.velocity.y = collisionVector.y;
                    ball.velocity.x *= (1 - curveDamper);
                    ball.velocity.y *= (1 - curveDamper);

                    x += normal.x;
                    if(ball.velocity.y > 0.1) {
                      y += normal.y;
                    }
                    else {
                      y += normal.y / 10;
                    }
                    ball.x(x).y(y);
                  }

                  tween.finish();
                }

              }
              function updateBall(frame) {
                var timeDiff = frame.timeDiff;
                var stage = ball.getStage();
                var height = stage.getHeight();
                var width = stage.getWidth();
                var x = ball.getX();
                var y = ball.getY();
                var radius = ball.getRadius();

                tween.reverse();

                // physics variables
                var gravity = 10;
                // px / second^2
                var speedIncrementFromGravityEachFrame = gravity * timeDiff / 1000;
                var collisionDamper = 0.2;
                // 20% energy loss
                var floorFriction = 5;
                // px / second^2
                var floorFrictionSpeedReduction = floorFriction * timeDiff / 1000;

                // if ball is being dragged and dropped
                if(ball.isDragging()) {
                  var mousePos = stage.getPointerPosition();

                  if(mousePos) {
                    var mouseX = mousePos.x;
                    var mouseY = mousePos.y;

                    var c = 0.06 * timeDiff;
                    ball.velocity = {
                      x: c * (mouseX - ball.lastMouseX),
                      y: c * (mouseY - ball.lastMouseY)
                    };

                    ball.lastMouseX = mouseX;
                    ball.lastMouseY = mouseY;
                  }
                }
                else {
                  // gravity
                  ball.velocity.y += speedIncrementFromGravityEachFrame;
                  x += ball.velocity.x;
                  y += ball.velocity.y;

                  // ceiling condition
                  if(y < radius) {
                    y = radius;
                    ball.velocity.y *= -1;
                    ball.velocity.y *= (1 - collisionDamper);
                  }

                  // floor condition
                  if(y > (height - radius)) {
                    y = height - radius;
                    ball.velocity.y *= -1;
                    ball.velocity.y *= (1 - collisionDamper);
                  }

                  // floor friction
                  if(y == height - radius) {
                    if(ball.velocity.x > 0.1) {
                      ball.velocity.y -= floorFrictionSpeedReduction;
                    }
                    else if(ball.velocity.x < -0.1) {
                      ball.velocity.x += floorFrictionSpeedReduction;
                    }
                    else {
                      ball.velocity.x = 0;
                    }
                  }

                  // right wall condition
                  if(x > (width - radius)) {
                    x = width - radius;
                    ball.velocity.x *= -1;
                    ball.velocity.x *= (1 - collisionDamper);
                  }

                  // left wall condition
                  if(x < radius) {
                    x = radius;
                    ball.velocity.x *= -1;
                    ball.velocity.x *= (1 - collisionDamper);
                  }

                  ball.setPosition({x:x, y:y});

                  /*
                   * if the ball comes into contact with the
                   * curve, then bounce it in the direction of the
                   * curve's surface normal
                   */
                  collision = handleCurveCollision(ball, curve);

                }
              }

              var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height
              });

              var curveLayer = new Konva.Layer();
              var ballLayer = new Konva.Layer();
              var radius = 20;
              var anim;

              var curve = new Konva.Shape({
                sceneFunc: function(context) {
                  context.beginPath();
                  context.moveTo(40, height);
                  context.bezierCurveTo(width * 0.2, -1 * height * 0.5, width * 0.7, height * 1.3, width, height * 0.5);
                  context.lineTo(width, height);
                  context.lineTo(40, height);
                  context.closePath();
                  context.fillShape(this);
                },
                fill: '#8dbdff'
              });

              curveLayer.add(curve);

              // create ball
              var ball = new Konva.Circle({
                x: 190,
                y: 20,
                radius: radius,
                fill: 'blue',
                draggable: true,
                opacity: 0.8
              });

              // custom property
              ball.velocity = {
                x: 0,
                y: 0
              };

              ball.on('dragstart', function() {
                ball.velocity = {
                  x: 0,
                  y: 0
                };
                anim.start();
              });

              ball.on('mousedown', function() {
                anim.stop();
              });

              ball.on('mouseover', function() {
                document.body.style.cursor = 'pointer';
              });

              ball.on('mouseout', function() {
                document.body.style.cursor = 'default';
              });

              ballLayer.add(ball);
              stage.add(curveLayer);
              stage.add(ballLayer);

              var tween = new Konva.Tween({
                node: ball,
                fill: 'red',
                duration: 0.3,
                easing: Konva.Easings.EaseOut
              });

              anim = new Konva.Animation(function(frame) {
                updateBall(frame);
              }, ballLayer);

              anim.start();

            },
            ertret(){

              var width = window.innerWidth;
              var height = window.innerHeight;

              Konva.angleDeg = false;
              function animate(animatedLayer, star, frame) {
                // 20% slow down per second
                var angularFriction = 0.2;
                var angularVelocityChange = star.angularVelocity * frame.timeDiff * (1 - angularFriction) / 1000;
                star.angularVelocity -= angularVelocityChange;

                if (star.controlled) {
                  star.angularVelocity = (star.getRotation() - star.lastRotation) * 1000 / frame.timeDiff;
                }
                else {
                  star.rotate(frame.timeDiff * star.angularVelocity / 1000);
                }

                star.lastRotation = star.getRotation();
              }

              var stage = new Konva.Stage({
                container: 'container',
                width: width,
                height: height
              });

              var animatedLayer = new Konva.Layer();

              var star = new Konva.Star({
                x: stage.getWidth() / 2,
                y: stage.getHeight() / 2,
                outerRadius: 80,
                innerRadius: 40,
                stroke: '#005500',
                fill: '#b5ff88',
                strokeWidth: 4,
                numPoints: 5,
                lineJoin: 'round',
                shadowOffset: 5,
                shadowBlur: 10,
                shadowColor: 'black',
                shadowOpacity: 0.5,
                opacity: 0.8
              });

              // custom properties
              star.lastRotation = 0;
              star.angularVelocity = 6;
              star.controlled = false;

              star.on('mousedown touchstart', function (evt) {
                this.angularVelocity = 0;
                this.controlled = true;
              });

              animatedLayer.add(star);

              var center = new Konva.Circle({
                x: stage.getWidth() / 2,
                y: stage.getHeight() / 2,
                radius: 3,
                fill: '#555'
              });

              animatedLayer.add(center);

              // add listeners to container
              stage.on('contentMouseup contentTouchend', function () {
                star.controlled = false;
              });

              stage.on('contentMousemove contentTouchmove', function () {
                if (star.controlled) {
                  var mousePos = stage.getPointerPosition();
                  var x = star.getX() - mousePos.x;
                  var y = star.getY() - mousePos.y;
                  star.setRotation(0.5 * Math.PI + Math.atan(y / x));

                  if (mousePos.x <= stage.getWidth() / 2) {
                    star.rotate(Math.PI);
                  }
                }
              });

              stage.add(animatedLayer);

              var anim = new Konva.Animation(function (frame) {
                animate(animatedLayer, star, frame);
              }, animatedLayer);

              // wait one second and then spin the star
              setTimeout(function () {
                anim.start();
              });

            },

          text(){

            var stage = new Konva.Stage({
              container: 'container',
              width: 340,
              height: 300
            });

            var layer = new Konva.Layer();

            var simpleText = new Konva.Text({
              x: stage.getWidth() / 2,
              y: 15,
              text: 'Simple Text',
              fontSize: 30,
              fontFamily: 'Calibri',
              fill: 'green'
            });

            // to align text in the middle of the screen, we can set the
            // shape offset to the center of the text shape after instantiating it
            simpleText.setOffset({
              x: simpleText.getWidth() / 2
            });

            // since this text is inside of a defined area, we can center it using
            // align: 'center'
            var complexText = new Konva.Text({
              x: 20,
              y: 60,
              text: 'COMPLEX TEXT\n\nAll the world\'s a stage, and all the men and women merely players. They have their exits and their entrances.',
              fontSize: 18,
              fontFamily: 'Calibri',
              fill: '#555',
              width: 300,
              padding: 20,
              align: 'center'
            });

            var rect = new Konva.Rect({
              x: 20,
              y: 60,
              stroke: '#555',
              strokeWidth: 5,
              fill: '#ddd',
              width: 300,
              height: complexText.getHeight(),
              shadowColor: 'black',
              shadowBlur: 10,
              shadowOffset: [10, 10],
              shadowOpacity: 0.2,
              cornerRadius: 10
            });

            // add the shapes to the layer
            layer.add(simpleText);
            layer.add(rect);
            layer.add(complexText);

            // add the layer to the stage
            stage.add(layer);

          },

          tree(){

            let stage = new Konva.Stage({
              container: 'container',
              width: 800,
              height: 600
            });

            let layer = new Konva.Layer();

            let simpleText = new Konva.Text({
              x: stage.getWidth() / 2,
              y: 15,
              text: 'Simple Text',
              fontSize: 30,
              fontFamily: 'Calibri',
              fill: 'green'
            });


          }

        }
    }
</script>

<style scoped lang="scss">

</style>
