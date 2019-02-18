// <reference path="pixi/pixi.d.ts" />
// 色々踏まえ、自分なりに作ってみる

window.addEventListener("load", function(){
    new Projectile.Main();
});

var debug;
var OuterBorder = 0;

var Projectile;
(function (Projectile) {
    /**
     * メインクラス
     * @class Projectile.Main
     */

    

    var Main = ( function() {
        /**
         * @constructor
         */
        function Main(){
            var _this = this;

            this.MAX_PARTICLES = 3;
            this.paricleContainer = [];

            debug = this;
            this.stage = new PIXI.Stage(0x0);
            var options = {
                view: null,
                transparent: false,
                resolution: 1
            };
            this.renderer = PIXI.autoDetectRenderer(800,600, options );
            document.body.appendChild( this.renderer.view );

            // マウスの動きごとの関数、タッチパネルも対応
            // data -> b.InteractionData
            this.stage.mousedown = this.stage.touchstart = function (data) {
                _this.handleMouseDown(data);
            };
            this.stage.mousemove = this.stage.touchmove = function (data) {
                _this.handleMouseMove(data);
            };
            this.stage.mouseup = this.stage.mouseupoutside = this.stage.touchend = this.stage.touchendoutside = function (data) {
                _this.handleMouseUp(data);
            };

            // Tickerの作成
            requestAnimFrame( function(){ return _this.handleTick(); });

            // PIXIのキャンバスに描く、描かられるものたち
            this.circle = new PIXI.Graphics();
            this.circle.interactive = true;
            for (var ci = 0; ci < this.MAX_PARTICLES; ci++) {
                var cc = new PIXI.Graphics();
                this.paricleContainer.push( cc );
                this.stage.addChild( this.paricleContainer[ci] );
            }
            this.stage.addChild(this.circle);

            this.image = PIXI.Texture.fromImage("/img/flower.png");
            this.logoimage = new PIXI.Sprite( this.image );
            this.logoimage.anchor.x = 0.5;
            this.logoimage.anchor.y = 0.5;
            this.stage.addChild(this.logoimage);

            // リサイズに応じる
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });

        }

        Main.prototype.handleMouseDown = function( event ){
        };
        Main.prototype.handleMouseMove = function( event ){
        };
        Main.prototype.handleMouseUp = function( event ){
        };
        /**
         * エンターフレームイベント
         */ 
        Main.prototype.handleTick = function(){
            var _this = this;

            /**
             * **描画の親玉**  
             * .clear() : それが消える？  
             * .x,.y : 相対x,y座標  
             * .beginFill( color, alpha ) : 塗りつぶす色,非透過度   
             * .endFill() : beginFillとセット  
             * .drawCircle(x,y,rad) : (x,y)に半径radの円を作図
             */
            var gCircle = this.circle;
            /**
             * **画像描画**  
             * .rotation : 時計回り、弧度法  (0~2pi)
             * .alpha : **非**透過度 0<=alpha<=1 周期は1 , マイナス以下は完全透過
             */
            var gIMG = this.logoimage;
            // 仮想描画 ( HSP の redraw 0 みたいなもの )

            gCircle.clear();
            gCircle.beginFill("0xFFFFFF", 1);
            gCircle.drawCircle(0,0,30);
            gCircle.endFill();
            gCircle.x++;
            gCircle.y++;

            gIMG.x = innerWidth/2;
            gIMG.y = innerHeight/2;
            gIMG.rotation += 0.02;
            gIMG.alpha -= 0.002;


            // 現実描画 ( HSP : redraw 1 )
            this.renderer.render( this.stage );

            // 自　分　を　呼　ぶ
            // アニメーションが1フレーム進んでから自分を呼ぶ
            requestAnimFrame( function(){ return _this.handleTick(); });
        };
        Main.prototype.handleResize = function(){
            this.renderer.view.style.border = "" + OuterBorder + "px dashed darkblue";
            this.renderer.resize(innerWidth-OuterBorder*2, innerHeight-OuterBorder*2 );
        };

        return Main;
    })();
    Projectile.Main = Main;

})(Projectile || (Projectile = {}));