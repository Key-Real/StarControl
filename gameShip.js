
var Ship;
var shipHit;

const numKaboomSprites = 20;

class aShip{

    constructor() {

            this.shipX = BrowserPageWidth / 2 - 32;

            for (var i=1; i <= numKaboomSprites; i++) {
                    let img = document.createElement("img");
                    img.src = "./graph/kaboom/boom" + i + ".png";
                    img.id ="imgExp" + i;
                    img.style.position = "absolute";
                    img.style.left = "-100px";
                    img.style.top = "-100px";
                    document.body.appendChild(img);
            }



            const img = document.createElement("img");
            img.src = "./graph/ship.png";
            img.id ="imgShip";
            img.style.position = "absolute";
            img.style.left = this.shipX + "px";
            img.style.top = (BrowserPageHeight - 96) + "px";
            img.style.zIndex = 1;
            document.body.appendChild(img);

            this.theShip = document.getElementById("imgShip");


            this.KaboomSpriteNum = 1;

            shipHit = false;
    }


    moveShip(speedX) { 
        
        if (shipHit) return;

        if (this.shipX < 10) {
            this.shipX = 10;
            return;
        }


        if (this.shipX > (BrowserPageWidth - 82) ) {
            this.shipX = BrowserPageWidth - 82;
            return;
        }

        this.theShip.style.left = this.shipX + "px"; 
        
        this.shipX += speedX;

    }


    checkShipHit() {
        if (!shipHit)
            for (var i=0; i <= Asteroids.length; i++) { 
                
                if (Asteroids[i]) {
                    if ((Asteroids[i].getY + 64) > (BrowserPageHeight - 96))
                        if ( ((Asteroids[i].getX) > (this.shipX-64))  &&  ((Asteroids[i].getX) < (this.shipX+64)) ) {
                            this.theShip.style.left = "-100px";
                            Asteroids[i].status = "explosion";
                            shipHit = true;
                        }
                }
            }

    }




    updateKaboom() {

            this.KaboomSpriteNum++;
            this.KaboomDrawSpriteNum = Math.round(this.KaboomSpriteNum / 5) + 1;

            if (this.KaboomSpriteNum >= numKaboomSprites)
               gameOver = true;

            if (this.KaboomElement != null) this.KaboomElement.style.visibility = "hidden";
            this.KaboomElement  = document.getElementById("imgExp" + this.KaboomDrawSpriteNum);
            if (!this.KaboomElement) return;
            this.KaboomElement.style.left = (this.shipX - 16) + "px";
            this.KaboomElement.style.top = (BrowserPageHeight - 128) + "px";
            this.KaboomElement.style.visibility = "visible";

    }

}


function initShip() {

    Ship = new aShip;

}

function updateShip() {

    Ship.checkShipHit();
    if (shipHit) Ship.updateKaboom();

}