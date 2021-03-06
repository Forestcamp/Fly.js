/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, createjs, game*/

this.game = this.game || {};

(function () {
    'use strict';

    var Laser = function (stage, render) {
        this.initialize(stage, render);
    };

    var p = Laser.prototype = new flyjs.Entity();

    p.Flyjs_EntityLaser_initialize = p.initialize;
    p.Flyjs_EntityLaser_update = p.update;
    p.Flyjs_Entity_setHitBounds = p.setHitBounds;
    /**
     *
     * @param scene
     */
    p.initialize = function (scene) {
        this.Flyjs_EntityLaser_initialize(scene);
        this.name = "Laser";
        this.draw();
    };

    p.draw = function () {
        this.bullet = new createjs.Shape();

        var g = this.bullet.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.4));
        g.beginFill("rgba(217,83,77,0.7)");
        g.rect(0, 0, 5, 20);

        this.Flyjs_Entity_setHitBounds({
            x: this.bullet.x,
            y: this.bullet.y,
            width: 5,
            height: 20
        });

        this.addChild(this.bullet);

    };

    p.update = function (event) {

        this.Flyjs_EntityLaser_update();
        if (event && event.collisionList[0] == "EnemyShip") {
            this.scene.remove(this);
            return;
        }
        if (this.bullet.y < 0) {
            this.scene.remove(this);
            return;
        }

        this.bullet.y -= 10;
    };

    p.setPosition = function (position) {
        this.bullet.x = position.x;
        this.bullet.y = position.y;
    };

    game.Laser = Laser;
}());