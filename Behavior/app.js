
window.addEventListener("load", function(){
    new Projectile.Main();
});

var OuterBorder = 0;
var de;
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
            de = this;
            
            this.app = new PIXI.Application(800, 600, {backgroundColor : 0x111111});
            document.body.appendChild(this.app.view);

            this.container = new PIXI.Container();
            this.app.stage.addChild( this.container);
            var texture = PIXI.Texture.fromImage('../img/flower.png');

            for (var i = 0; i < 25; i++) {
                var flower = new PIXI.Sprite(texture);
                flower.anchor.set(0.5);
                flower.x = (i % 5) * 100;
                flower.y = Math.floor(i / 5) * 100;
                flower.interactive = true;
                flower.buttonMode = true;
                flower
                    .on('pointerdown', this.onButtonDown)
                    .on('pointerup', this.onButtonUp)
                    .on('pointerupoutside', this.onButtonUp)
                    .on('pointerover', this.onButtonOver)
                    .on('pointerout', this.onButtonOut);
                this.container.addChild(flower);
            }

            // Center on the screen
            this.container.x = (this.app.screen.width - this.container.width) / 2;
            this.container.y = (this.app.screen.height - this.container.height) / 2;

            
            this.app.ticker.add( function(){ return _this.handleTick(); });

            // リサイズに応じる
            this.handleResize();
            window.addEventListener("resize", function () {
                _this.handleResize();
            });

        }
        Main.prototype.handleTick = function(){
            var _this = this;
            for (var i = 0; i < 25; i++) {
                var target = this.container.children[i];
                if( target.isdown ){
                    if( target.alpha < 0 ){
                        target.visible = false;
                        continue;
                    }
                    target.alpha -= 0.02;
                    target.scale.x += 0.02;
                    target.scale.y += 0.02;
                }
            }
            this.app.render( this.app );
        };
        Main.prototype.handleResize = function(){
            this.app.renderer.resize(innerWidth-OuterBorder*2, innerHeight-OuterBorder*2 );
        };
        Main.prototype.onButtonDown = function(){
            this.isdown = true;
        };

        return Main;
    })();
    Projectile.Main = Main;

})(Projectile || (Projectile = {}));