var Shots = [];
    WaitForShotDelay = 0;
    WaitForShotDelayConst = 20;
    ShotSpeed = 3;

class aShot{
    constructor(ID,x){
        this.id = ID;
        this.img = document.createElement("img");
        this.img.src = "./graph/shot.png";
        this.img.id ="imgShot-" + ID;
        this.img.style.position = "absolute";
        this.img.style.left = "-100px";
        this.img.style.top = "-100px";
        document.body.appendChild(this.img);
        this.x = x;
        this.y = BrowserPageHeight - 106;
    }

    getShotX()
    {
        return this.x;
    }
    
    getShotY()
    {
        return this.y;
    }

    update()
    {
        this.y-=ShotSpeed;

        this.shotElement  = document.getElementById("imgShot-" + this.id);
        this.shotElement.style.left = this.x + "px";
        this.shotElement.style.top = this.y + "px";

        if (this.y < 0) return "into nothing"; else return;
    }


    nirvana()
    {
        var img = document. getElementById("imgShot-" + this.id); 
        img.parentNode.removeChild(img);
    }

}



function getFreeShotInArray() {

    var curShot = 0;
    for (var i = 0; i <= Shots.length; i++)
    {
        if (Shots[i] == null) {
            curShot = i;
            break;
        }
    }
    return curShot;

}

function shotCreate()
{
    if (shipHit) return;


    if (WaitForShotDelay >= WaitForShotDelayConst)
    {
        var curShot = getFreeShotInArray();
        Shots[curShot] = new aShot(curShot,Ship.shipX+34);
        WaitForShotDelay = 0;
    }

}










function updateShots()
{
    for (var i=0; i<=Shots.length; i++){
        if (Shots[i]) {

            for (var j=0; j < Asteroids.length; j++) {

                if (Asteroids[j])
                    if ( ((Asteroids[j].getY+64) > Shots[i].getShotY()) &&  // 64 is sprite width/height
                         ((Asteroids[j].getX+64) > Shots[i].getShotX()) && 
                         ((Asteroids[j].getX) < Shots[i].getShotX()) ) {

                        Asteroids[j].changeStatus("explosion");
                        Shots[i].nirvana();
                        Shots[i] = null;
                        return;
                    }

            }

            
            var shotStatus = Shots[i].update();
            if (shotStatus == "into nothing") {
                Shots[i].nirvana();
                Shots[i] = null;                    
            }
            

        }
    }

    WaitForShotDelay++;
}