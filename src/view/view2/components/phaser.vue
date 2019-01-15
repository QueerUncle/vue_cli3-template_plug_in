<!--
 -  2018/12/25  lize
 -->
<template>
  <div class = "phaser" id = "phaser">
    <div id = "phaser-example"></div>
  </div>
</template>

<script>
  import Phaser  from 'phaser';
    export default {
        data () {
            return {
                menu:[
                  {
                      name:"西瓜",

                      childer:[

                        {
                            name:"橙子",

                            childer:[

                              {

                                  name:"评估破"

                              }

                            ]
                        }

                      ]
                  }

                ],
              game:null,
              scene:null,
              signal:null,

              tmp: {
                    text: []
              }
            }
        },
        created () {
//            let a = (new Date()).getTime();
//            for(let i=0;i<1000000; i++){
//
//            }


            this.initialize();



        },
        methods: {
          //初始化
          initialize(){

              let config =  {
                  type: Phaser.AUTO,
                  width: 400,
                  height: 900,
                  pixelArt:false,

                  disableContextMenu: true,
                batchSize: 500,
                clearBeforeRender: false,
                domBehindCanvas: false,
//                backgroundColor:"#ff0000",
//                  physics: {
//                    default: 'arcade',
//                    arcade: {
//                      gravity: { y: 200 }
//                    }
//                  },
                  scene:{
                    preload: this.preload(),
                    create: this.create(),
                    update: this.update(111)
                  }
                };

            this.game = new Phaser.Game(config);

          },
          preload(){

              return function(){

                this.load.setBaseURL('http://localhost:8085');

                this.load.image('red', 'img/moveDown.png');

                this.load.image('logo', 'img/moveUp.png');

              }

          },
          create(){

            console.log(this.menu);

            let _this = this;
//
            let edc = this.asd(this.menu);

           return function(){

             this.fpsText = this.add.text(10, 10, "FPS : 0", {fontSize: 30, color: '#ffffff', align: 'left'})
             this.lastUpdateTime = 0;
             this.counter = 0;

//             this.physics.world.setBounds(0, 0, 3392, 240);

             let x = 100;

             let s = 100;

             let n = 0;

             for(let y of edc){

               _this.tmp.text[n] = this.add.text(x, s, 'content', {font: "15px Arial", fill: "#19de65",}).setInteractive({ cursor: "pointer" })

               _this.tmp.text[n]._moveKey = false;

               _this.tmp.text[n].on('pointerdown', function (pointer) {

                 this._moveKey = !this._moveKey;

               });

               _this.tmp.text[n]._n = n++;

               x+=5;

               s+=16;

             }

//
//             let text = this.add.text(100, 100, 'content', {font: "15px Arial", fill: "#19de65",}).setInteractive({ cursor: "pointer" }).on('pointerdown', function (pointer) {
//
//               console.log(pointer);
//
//               console.log(555)
//
//             });
//
//             let logo = this.add.sprite(400, 300, 'logo').setInteractive();
//
//             console.log(text);
//
//             console.log(this);

//            text.on();

           }

          },

          update(e){

            let _this = this;
            return function(){

              let currTime = Date.now();
              this.counter++;
              if (currTime > this.lastUpdateTime + 1000) {
                this.lastUpdateTime = currTime;
                this.fpsText.setText("FPS : "+ this.counter + ' ' + this.sys.game.renderer.nativeTextures.length);
                this.counter = 0;
              }

                for ( let v of   _this.tmp.text) {
                    if (v._moveKey) {
                        v.x +=1;
                    }
                }
            }

          },

          asd(list,arr){


              let newAry = arr ? arr : [];

              for(let t of list){

                  newAry.push({name:t.name});

                  if(t.childer && t.childer.length>0){

                      return this.asd(t.childer,newAry)

                  }

              }



              for(let i = 0; i<100; i++){

                  let obj = {};

                  obj[name] = i;

                  newAry.push(obj)

              }

              return newAry

          }


        }
    }
</script>

<style scoped lang="scss">

</style>
