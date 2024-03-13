const StarMaxSpeed=8;

var Stars = [];


function initStars() {

    for (var i=0; i <= 14; i++) {
        var img = document.createElement("img");
        img.src = "./graph/stars/star" + i + ".png";
        img.id ="imgStar" + i;
        img.style.position = "absolute";
        img.style.left = "-100px";
        img.style.top = "-100px";
        document.body.appendChild(img);

        Stars[i] = new aStar("imgStar"+i);
    }
  
}

class aStar {
  constructor(ID) {

        this.ID = ID;
        this.starElement = document.getElementById(ID);
        this.x = Math.floor(Math.random() * BrowserPageWidth);
        this.y = Math.floor(Math.random() * BrowserPageHeight);
        this.speed = Math.floor(Math.random() * StarMaxSpeed)+1;
    
  }

  update() {

        this.y += this.speed / 3;

        if (this.y >= BrowserPageHeight) {
            this.x = Math.floor(Math.random() * BrowserPageWidth);
            this.y = 0;            
            this.speed = Math.floor(Math.random() * StarMaxSpeed)+1;
        }

        this.starElement.style.left = this.x + "px";
        this.starElement.style.top = this.y + "px";
    }

}



function updateStars()
{
    for (var i=0; i < Stars.length-1; i++)
        Stars[i].update();
}