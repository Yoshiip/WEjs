class Start extends Marking {
    constructor(center, directionVector, width, height) {
        super(center, directionVector, width, height);
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.center.x, this.center.y);
        ctx.rotate(angle(this.directionVector) - Math.PI / 2);
        ctx.scale(1, 3);

        ctx.beginPath();
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "green";
        ctx.font = "bold " + this.height * 0.3 + "px Arial";
        ctx.fillText("START", 0, 1);
        ctx.restore();
    }
}