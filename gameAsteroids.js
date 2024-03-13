

const AsteroidMaxSpeed=8;

var Asteroids = [];
var globalAsteroidCount = 0;

const numAsteroidSprites = 63;
const numExplosionSprites = 20;

function CreateAsteroid(ID)
{
        for (var i=1; i <= numAsteroidSprites; i++) {
                var img = document.createElement("img");
                img.src = "./graph/asteroid/ast" + i + ".png";
                img.id ="imgAst" + i + "-" + ID;
                img.style.position = "absolute";
                img.style.left = "-100px";
                img.style.top = "-100px";
                document.body.appendChild(img);
        }
}


function CreateExplosion(ID)
{
        for (var i=1; i <= numExplosionSprites; i++) {
            var img = document.createElement("img");
            img.src = "./graph/explosion/exp" + i + ".png";
            img.id ="imgExp" + i + "-" + ID;
            img.style.position = "absolute";
            img.style.left = "-100px";
            img.style.top = "-100px";
            document.body.appendChild(img);
        }
}


function RemoveAsteroid(ID)
{
        for (var i=1; i <= numAsteroidSprites; i++) {
            var img = document. getElementById("imgAst" + i + "-" + ID); 
            img.parentNode.removeChild(img);
        }
}


function RemoveExplosion(ID)
{
        for (var i=1; i <= numExplosionSprites; i++) {
            var img = document. getElementById("imgExp" + i + "-" + ID); 
            img.parentNode.removeChild(img);
        }
}


class aAsteroid {
    constructor (ID) {

        CreateAsteroid(ID);
        CreateExplosion(ID);

        this.id = ID;

        this.x = Math.floor(Math.random() * (BrowserPageWidth - 128)) + 64; // numbers: screen left + right offset
        this.y = 0;
        this.speed = (Math.floor(Math.random() * AsteroidMaxSpeed) + 1) / 4;

        this.AsteroidSpriteNum = 1;
        this.AsteroidDrawSpriteNum = 1;

        this.ExplosionSpriteNum = 1;
        this.drawExplosionSpriteNum = 1;

        this.status = "rotate";
    }


    drawAsteroid() {

        this.AsteroidSpriteNum++;
        this.AsteroidDrawSpriteNum = Math.round(this.AsteroidSpriteNum / 5) + 1;

        if (this.AsteroidDrawSpriteNum >= numAsteroidSprites)
        {
            this.AsteroidDrawSpriteNum = 1;
            this.AsteroidSpriteNum = 1;
        }

        if (this.asteroidElement) this.asteroidElement.style.visibility = "hidden";
        this.asteroidElement  = document.getElementById("imgAst" + this.AsteroidDrawSpriteNum + "-" + this.id);
        if (!this.asteroidElement) return;
        this.asteroidElement.style.left = this.x + "px";
        this.asteroidElement.style.top = this.y + "px";
        this.asteroidElement.style.visibility = "visible";

    }


    drawExplosion()
    {

        var drawExplosionSpriteNum =  Math.round(this.ExplosionSpriteNum / 5) + 1;
        if (this.ExplosionElement) this.ExplosionElement.style.visibility = "hidden";
        this.ExplosionElement  = document.getElementById("imgExp" + drawExplosionSpriteNum + "-" + this.id);

        this.ExplosionElement.style.left = this.x - 16 + "px";
        this.ExplosionElement.style.top = this.y - 16 + "px";
        this.ExplosionElement.style.visibility = "visible";

        this.ExplosionSpriteNum++;

        if (this.asteroidElement) this.asteroidElement.style.visibility = "hidden";

        if (this.ExplosionSpriteNum >= (numExplosionSprites * 5 - 2 )) this.changeStatus("spawn new");

    }

    changeStatus(status) {
        this.status = status;
    }

    update() {
        
        this.y+=this.speed;

        if (this.status == "rotate")
            this.drawAsteroid();
        if (this.status == "explosion")
            this.drawExplosion();
        if (this.status == "spawn new") 
            return "spawn new";

        if (this.y > BrowserPageHeight) 
            return "into nothing";

    }


    get getY() {
        return this.y;
    }

    get getX() {
        return this.x;
    }

    nirvana()
    {
       RemoveAsteroid(this.id);
       RemoveExplosion(this.id);
    }
}


function initAsteroid()
{

    var curAsteroid = 0;
    for (var i = 0; i <= Asteroids.length; i++)
    {
        if (Asteroids[i] == null) {
            curAsteroid = i;
            break;
        }
    }

    Asteroids[curAsteroid] = new aAsteroid(curAsteroid);

    globalAsteroidCount++

}

function updateAsteroids()
{
    for (var i=0; i < Asteroids.length; i++) { 
        
        if (Asteroids[i]) {
            var asteroidStaus = Asteroids[i].update();

            if (asteroidStaus == "into nothing") {
                Asteroids[i].nirvana();
                Asteroids[i] = null;

                if (!gameOver) initAsteroid();
                
                return "into nothing";
            }

            if (asteroidStaus == "spawn new") {                
                Asteroids[i].nirvana();
                Asteroids[i] = null;
                
                score++;
                if (!gameOver) {
                    initAsteroid();
                    if (globalAsteroidCount < maxPossibleAsteroids) initAsteroid();
                }
                
                return "into nothing";
            }
        }

    }

        
}
