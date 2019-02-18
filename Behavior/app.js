
window.addEventListener("load", function(){
    new Projectile.Main();
});

var OuterBorder = 0;
var de;
var Projectile;
var x = innerWidth;
var y = innerHeight;

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

            this.Particles = new PIXI.Container();
            this.Particles.number = 30;
            this.app.stage.addChild( this.Particles );
            for (var i = 0; i < this.Particles.number  ; i++) {
                var circle = new PIXI.Graphics();
                circle.visible = false;
                circle.beginFill(0xffffff , 0.8);
                circle.drawCircle(0,0,15);
                circle.endFill();
                this.Particles.addChild( circle );
            }
            for (var i = 0; i < this.Particles.number  ; i++) {
                var circle = new PIXI.Graphics();
                circle.visible = false;
                circle.beginFill(0xffffff , 0.6);
                circle.drawCircle(0,0,15);
                circle.endFill();
                this.Particles.addChild( circle );
            }
            for (var i = 0; i < this.Particles.number  ; i++) {
                var circle = new PIXI.Graphics();
                circle.visible = false;
                circle.beginFill(0xffffff , 0.4);
                circle.drawCircle(0,0,15);
                circle.endFill();
                this.Particles.addChild( circle );
            }
            this.handleResize();

            
            this.app.ticker.add( function(){ return _this.handleTick(); });

            window.addEventListener("resize", function () {
                _this.handleResize();
            });

        }
        Main.prototype.handleTick = function(){
            var _this = this;
            for (var i = 0; i < 25; i++) {
                var target = this.container.children[i];
                if( target.isover ){
                    if( target.alpha < 0 ){
                        target.visible = false;
                        continue;
                    }
                    if( target.alpha === 1 ){
                        for (var i = 0; i < this.Particles.number*3; i++) {
                            var hitcircle = this.Particles.children[i];
                            hitcircle.visible = true;
                            hitcircle.x = target.x + this.container.x;
                            hitcircle.y = target.y + this.container.y;
                        }
                    }
                    target.alpha -= 0.02;
                    target.scale.x *= 0.98;
                    target.scale.y *= 0.98;
                }
            }
            for (var i = 0; i < this.Particles.number ; i++) {
                var target = this.Particles.children[i];
                target.x += 3*Math.sin(Math.PI*2*i/this.Particles.number);
                target.y += 3*Math.cos(Math.PI*2*i/this.Particles.number);
            }
            for (var i = this.Particles.number ; i < this.Particles.number*2 ; i++) {
                var target = this.Particles.children[i];
                target.x += 2*Math.sin(Math.PI*2*i/this.Particles.number);
                target.y += 2*Math.cos(Math.PI*2*i/this.Particles.number);
            }
            for (var i = this.Particles.number*2; i < this.Particles.number*3 ; i++) {
                var target = this.Particles.children[i];
                target.x += 1*Math.sin(Math.PI*2*i/this.Particles.number);
                target.y += 1*Math.cos(Math.PI*2*i/this.Particles.number);
            }
            this.app.render( this.app );
        };
        Main.prototype.handleResize = function(){
            this.app.renderer.resize(innerWidth-OuterBorder*2, innerHeight-OuterBorder*2 );
            this.container.x = (this.app.screen.width - this.container.width) / 2;
            this.container.y = (this.app.screen.height - this.container.height) / 2;

        };
        Main.prototype.onButtonDown = function(){
            this.isdown = true;
        };
        Main.prototype.onButtonOver = function(){
            this.isover = true;
        };

        return Main;
    })();
    Projectile.Main = Main;

})(Projectile || (Projectile = {}));