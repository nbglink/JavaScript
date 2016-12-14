;(function()
{
    var scale = 10;
    var nMonsters = 3;
    var KEYS = {LEFT : 37, UP : 38, RIGHT : 39, DOWN : 40};

    var randomInt = function(up, down)
    {
        return Math.round(down + Math.random() * (up - down));
    };
    var flip = function()
    {
        return Math.random() < 0.5;
    };

    this.running = true;
    var Game = function (canvasId)
    {
        var canvas = document.getElementById(canvasId);
        this.c = canvas.getContext("2d");
        canvas.width  = this.width * scale;
        canvas.height = this.height * scale;
        this.player = new Player(this.width / 2, 0, this);
        this.keyBoard = new KeyboardController;

        this.field = new Array(this.width);
        for (var i = 0; i < this.width; ++i)
        {
            this.field[i] = new Array(this.height);
        }

        this.FIELD = {EMPTY : 0, FULL : 1, INCONSTRUCTION : 2, RIGHT_EVALUATED : 3, LEFT_EVALUATED : 4};
        this.COLORS = ["black", "green", "yellow", "magenta", "blue"];

        for (var i = 0; i < this.field.length; ++i)
        {
            for (var j = 0; j < this.field[i].length; ++j)
            {
                if (i < 3 || j < 3 || i >= this.width - 3 || j >= this.height - 3)
                {
                    this.field[i][j] = this.FIELD.FULL;
                }
                else
                {
                    this.field[i][j] = this.FIELD.EMPTY;
                }
            }
        }

        this.monsters = [];
        for (var i = 0; i < nMonsters; ++i)
        {
            var min = 10;
            this.monsters.push(new Monster(randomInt(min, this.width  - min),
                randomInt(min, this.height - min),
                flip() ? -0.5 : 0.5,
                flip() ? -0.5 : 0.5,
                this));
        }

        var self = this;
        var tick = function()
        {
            if (!this.running)
            {
                return;
            }
            self.update();
            self.render();
            requestAnimationFrame(tick);
        };
        tick();
    };

    Game.prototype =
    {
        height: 64,
        width: 100,

        update: function ()
        {
            switch (this.keyBoard.lastKey)
            {
                case  KEYS.DOWN:
                    if (this.keyBoard.keysPressed[KEYS.DOWN]  || this.player.running)
                    {
                        this.player.moveDown();
                    }
                    break;
                case  KEYS.RIGHT:
                    if (this.keyBoard.keysPressed[KEYS.RIGHT] || this.player.running)
                    {
                        this.player.moveRight();
                    }
                    break;
                case  KEYS.UP:
                    if (this.keyBoard.keysPressed[KEYS.UP]    || this.player.running)
                    {
                        this.player.moveUp();
                    }
                    break;
                case  KEYS.LEFT:
                    if (this.keyBoard.keysPressed[KEYS.LEFT]  || this.player.running)
                    {
                        this.player.moveLeft();
                    }
                    break;
            }

            var i = Math.round(this.player.x);
            var j = Math.round(this.player.y);
            if (this.field[i][j] === this.FIELD.INCONSTRUCTION || this.hitByMonsters())
            {
                this.lose();
            }

            if (this.field[i][j] === this.FIELD.EMPTY)
            {
                this.player.running = true;
                switch (this.keyBoard.lastKey)
                {
                    case KEYS.DOWN:
                        this.player.leftPoints.push({x: i + 1, y: j});
                        this.player.rightPoints.push({x: i - 1, y: j});
                        break;
                    case KEYS.UP:
                        this.player.leftPoints.push({x: i - 1, y: j});
                        this.player.rightPoints.push({x: i + 1, y: j});
                        break;
                    case KEYS.RIGHT:
                        this.player.leftPoints.push({x: i, y: j - 1});
                        this.player.rightPoints.push({x: i, y: j + 1});
                        break;
                    case KEYS.LEFT:
                        this.player.leftPoints.push({x: i, y: j + 1});
                        this.player.rightPoints.push({x: i, y: j - 1});
                        break;
                }

                this.field[i][j] = this.FIELD.INCONSTRUCTION;
            }
            if (this.field[i][j] === this.FIELD.FULL)
            {
                if (this.player.running)
                {
                    this.computeFill();
                    this.player.leftPoints.length = 0;
                    this.player.rightPoints.length = 0;
                }
                this.player.running = false;
            }

            for (var i = 0; i < nMonsters; ++i)
            {
                this.monsters[i].move();
            }
        },

        render: function ()
        {
            for (var i = 0; i < this.field.length; ++i)
            {
                for (var j = 0; j < this.field[i].length; ++j)
                {
                    this.fillField(i, j, this.COLORS[this.field[i][j]]);
                }
            }
            this.fillField(this.player.x, this.player.y, this.player.color);
            for (var i = 0; i < this.monsters.length; ++i)
            {
                this.fillField(this.monsters[i].x, this.monsters[i].y, this.monsters[i].color);
            }
        },

        fillField: function (x, y, color)
        {
            this.c.fillStyle = color;
            this.c.fillRect(x * scale, y * scale, scale, scale);
        },

        replaceField: function (before, after)
        {
            for (var i = 0; i < this.field.length; ++i)
            {
                for (var j = 0; j < this.field[i].length; ++j)
                {
                    if (this.field[i][j] === before)
                    {
                        this.field[i][j] = after;
                    }
                }
            }
        },

        floodFill : function(x, y, startingField, targetField)
        {
            var filled = 0;
            if (this.field[x][y] !== startingField)
            {
                return filled;
            }
            this.field[x][y] = targetField;
            ++filled;
            filled += this.floodFill(x+1, y  , startingField, targetField);
            filled += this.floodFill(x  , y+1, startingField, targetField);
            filled += this.floodFill(x-1, y  , startingField, targetField);
            filled += this.floodFill(x  , y-1, startingField, targetField);
            return filled;
        },

        hitByMonsters : function()
        {
            return !this.noMonstersIn(this.FIELD.INCONSTRUCTION);
        },

        noMonstersIn : function(fieldType)
        {
            for (var i = 0; i < this.monsters.length; ++i)
            {
                if (this.field[this.monsters[i].xPos]
                        [this.monsters[i].yPos] === fieldType)
                {
                    return false;
                }
            }
            return true;
        },

        lose : function ()
        {
            self.running = false;
        },

        computeFill : function()
        {
            this.replaceField(this.FIELD.INCONSTRUCTION, this.FIELD.FULL);

            var leftStartingPoint = null;
            for (var i = 0; i < this.player.leftPoints.length; ++i)
            {
                if (this.field[this.player.leftPoints[i].x][this.player.leftPoints[i].y] === this.FIELD.EMPTY)
                {
                    leftStartingPoint = this.player.leftPoints[i];
                    break;
                }
            }
            var leftSize = leftStartingPoint ? this.floodFill(leftStartingPoint.x,
                leftStartingPoint.y,
                this.FIELD.EMPTY,
                this.FIELD.LEFT_EVALUATED) : 0;

            var rightStartingPoint = null;
            for (var i = 0; i < this.player.rightPoints.length; ++i)
            {
                if (this.field[this.player.rightPoints[i].x][this.player.rightPoints[i].y] === this.FIELD.EMPTY)
                {
                    rightStartingPoint = this.player.rightPoints[i];
                    break;
                }
            }
            var rightSize = rightStartingPoint ? this.floodFill(rightStartingPoint.x,
                rightStartingPoint.y,
                this.FIELD.EMPTY,
                this.FIELD.RIGHT_EVALUATED) : 0;

            rightSize = this.noMonstersIn(this.FIELD.RIGHT_EVALUATED) ? rightSize : Infinity;
            leftSize  = this.noMonstersIn(this.FIELD.LEFT_EVALUATED)  ? leftSize  : Infinity;

            if (rightSize === Infinity && leftSize === Infinity)
            {
                this.replaceField(this.FIELD.RIGHT_EVALUATED, this.FIELD.EMPTY);
                this.replaceField(this.FIELD.LEFT_EVALUATED,  this.FIELD.EMPTY);
            }
            else if (rightSize > leftSize)
            {
                this.replaceField(this.FIELD.LEFT_EVALUATED,  this.FIELD.FULL);
                this.replaceField(this.FIELD.RIGHT_EVALUATED, this.FIELD.EMPTY);
            }
            else
            {
                this.replaceField(this.FIELD.LEFT_EVALUATED,  this.FIELD.EMPTY);
                this.replaceField(this.FIELD.RIGHT_EVALUATED, this.FIELD.FULL);
            }
        }
    };


    var Player = function (x, y, game)
    {
        this.maxX = game.width  - 1;
        this.maxY = game.height - 1;

        this.x = x;
        this.y = y;
        this.running = false;
        this.color = "red";
        this.leftPoints  = [];
        this.rightPoints = [];
    };

    Player.prototype =
    {
        moveLeft : function()
        {
            if (this.xPos > 0)
            {
                --this.x;
            }
        },
        moveRight : function()
        {
            if (this.xPos < this.maxX)
            {
                ++this.x;
            }
        },
        moveUp : function()
        {
            if (this.yPos > 0)
            {
                --this.y;
            }
        },
        moveDown : function()
        {
            if (this.yPos < this.maxY)
            {
                ++this.y;
            }
        },

        get xPos () {return Math.round(this.x);},
        get yPos () {return Math.round(this.y);}
    }

    var Monster = function (x, y, dx, dy, game)
    {
        this.game = game;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = "white";
    };

    Monster.prototype =
    {
        move : function()
        {
            var thisX = Math.round(this.x);
            var thisY = Math.round(this.y);
            var nextX = Math.round(this.x + this.dx);
            var nextY = Math.round(this.y + this.dy);

            if (this.game.field[thisX][nextY] === this.game.FIELD.FULL)
            {
                this.dy = -this.dy;
            }
            if (this.game.field[nextX][thisY] === this.game.FIELD.FULL)
            {
                this.dx = -this.dx;
            }
            this.x += this.dx;
            this.y += this.dy;
        },

        get xPos () {return Math.round(this.x);},
        get yPos () {return Math.round(this.y);}
    };

    var KeyboardController = function()
    {
        this.keysPressed = {};
        this.lastKey = null;
        var self = this;
        window.onkeydown = function(e)
        {
            self.keysPressed[e.keyCode] = true;
            self.lastKey = e.keyCode;
        };
        window.onkeyup = function(e)
        {
            self.keysPressed[e.keyCode] = false;
        };
    };


    window.onload = function()
    {
        var game = new Game("canvas");
    };
})()
