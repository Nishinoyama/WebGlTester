
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
            de = this;

            var _this = this;
            
            this.app = new PIXI.Application(800, 600, {backgroundColor : 0x111111});
            document.body.appendChild(this.app.view);

            this.vertex = new PIXI.Container();
            this.vertex.MAX = 10;

            this.app.stage.addChild( this.vertex );
            for (var i = 0; i < this.vertex.MAX ; i++) {
                var circlevertex = new PIXI.Graphics();
                circlevertex
                    .beginFill( 0xFFFFFF, 0.6 )
                    .lineStyle( 2 , 0xAA0033 , 0.6 )
                    .drawCircle( 0,0 , 30 )
                    .endFill();
                circlevertex.interactive = true;
                circlevertex.buttonMode = true;
                circlevertex
                    .on('pointerdown', this.onVertexDown)
                    .on('pointerup', this.onVertexUp)
                    .on('pointerupoutside', this.onVertexUp)
                    .on('pointerover', this.onVertexOver)
                    .on('pointerout', this.onVertexOut);
                circlevertex.x = Math.random() * x;
                circlevertex.y = Math.random() * y;
                circlevertex.speed = 30;
                circlevertex.angle = Math.random() * Math.PI * 2;
                // circlevertex.visible = false;
                this.vertex.addChild( circlevertex );
                var vertex = new PIXI.Text( ""+i+"" , {
                    fontSize : 10
                });
            }

            this.edge = new PIXI.Container();
            this.app.stage.addChild( this.edge );
            for ( var i = 0; i < this.vertex.MAX; i++ ){
                for( var j = 0; j < this.vertex.MAX; j++ ){
                    if( i === j ) continue;
                    var edge = new PIXI.Graphics();
                    var vertex1 = this.vertex.children[i];
                    var vertex2 = this.vertex.children[j];
                    if( vertex1.x === undefined ) continue;

                    edge
                        .lineStyle( 3, 0xFFFFFF, 0.7 )
                        .moveTo( 0,0 )
                        .lineTo( vertex1.x , vertex1.y )
                        .lineTo( vertex2.x , vertex2.y );
                    edge.from = i;
                    edge.to = j;

                    this.edge.addChild( edge );

                }
            }

            this.buttons = new PIXI.Container();
            var vertexadd = new PIXI.Sprite();
            this.app.stage.addChild( this.buttons );
            

            this.handleResize();
            
            this.app.ticker.add( function(){ return _this.handleTick(); });

            window.addEventListener("resize", function () {
                _this.handleResize();
            });

        }
        Main.prototype.handleTick = function(){
            for( var i = 0; i < this.vertex.MAX ; i++ ){
                var vertex = this.vertex.children[i];

                if( vertex.isdown ){
                    var newPosition = vertex.data.getLocalPosition( vertex.parent );
                    vertex.alpha = 0.9;
                    vertex.speed = 0.2*Math.sqrt( (vertex.y-newPosition.y)**2 + (vertex.x-newPosition.x)**2 );
                    vertex.angle = Math.atan2( (newPosition.y-vertex.y) , (newPosition.x-vertex.x) );
                }
                else{
                    vertex.alpha = 0.6;
                }
                if( vertex.isover ){
                    console.log( "" + i + " is overed ");
                    vertex.scale.x = 1.2;
                    vertex.scale.y = 1.2;
                }
                else{
                    vertex.scale.x = 1.00;
                    vertex.scale.y = 1.00;
                }

                if( vertex.x > this.app.renderer.width || vertex.x < 0 ){
                    vertex.angle = Math.PI - vertex.angle;
                    vertex.speed *= 1.02;
                }
                if( vertex.y > this.app.renderer.height || vertex.y < 0 ){
                    vertex.angle = -vertex.angle;
                    vertex.speed *= 1.02;
                }

                vertex.speed *= 0.95;

                vertex.x += vertex.speed * Math.cos( vertex.angle );
                vertex.y += vertex.speed * Math.sin( vertex.angle );

            }

            for (var i = 0; i < this.edge.children.length ; i++) {
                var edge = this.edge.children[i];
                edge
                    .clear()
                    .lineStyle( 3, 0xFFFFFF, 0.7 )
                    .moveTo( 0,0 )
                    .lineTo( this.vertex.children[ edge.from ].x , this.vertex.children[ edge.from ].y )
                    .lineTo( this.vertex.children[ edge.to].x , this.vertex.children[ edge.to].y );
            }

            this.app.render( this.app );
        };
        Main.prototype.handleResize = function(){
            this.app.renderer.resize(innerWidth-OuterBorder*2, innerHeight-OuterBorder*2 );
        };
        Main.prototype.onVertexDown = function( event ){
            this.data = event.data;
            this.isdown = true;
        };
        Main.prototype.onVertexUp = function(){
            this.isdown = false;
        };
        Main.prototype.onVertexOver = function(){
            this.isover = true;
        };
        Main.prototype.onVertexOut = function(){
            this.isover = false;
        };

        return Main;
    })();
    Projectile.Main = Main;

})(Projectile || (Projectile = {}));