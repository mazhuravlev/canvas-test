import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
//import * as fabric from "fabric";

let d = () => (new Date()).valueOf();


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @ViewChild('myCanvas') canvasRef: ElementRef;

  mousePos = {x: 0, y: 0};

  private mul = 1;

  @HostListener('window:resize') onResize() {
    this.resize();
  }

  @HostListener('click') onClick() {
    this.mul = Math.random();
  }

  ngOnInit(): void {
    this.resize();
    this.redraw();
  }

  private resize() {
    this.canvasRef.nativeElement.width = window.innerWidth;
    this.canvasRef.nativeElement.height = window.innerHeight;
  }

  mouseMove(e: MouseEvent) {
    let rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mousePos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  redraw() {
    let ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    ctx.fillStyle = '#ffffff';
    //ctx.fillRect(0,0,1500,1500);
    //ctx.beginPath();
    ctx.fillStyle = 'rgba(100,100,100,255)';
    for (let i = 0; i < 5000; i++) {
      ctx.beginPath();
      let x = Math.random() * 2000 + this.mousePos.x - 1000;
      let y = Math.random() * 2000 + this.mousePos.y - 1000;
      ctx.moveTo(x, y);
      let r = this.dist(this.mousePos, {x: x, y: y}) % 255;
      ctx.fillStyle = 'rgba(' + r.toFixed(0) + ',' + (r / 4).toFixed(0) + ',0,255)';
      ctx.arc(x, y, (500 * this.mul * Math.random() / r) % 100, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();

    }

    requestAnimationFrame(_ => this.redraw());
  }

  dist(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

//     let fabric = <any>(window['fabric']);
//     const c = new fabric.StaticCanvas('canvas');
//     let objects = [];
// let count = 0;
//     let start = d();
//     for(let x = 0; x < 1000; x += 30) {
//       for(let y = 0; y < 1000; y += 30) {
//         count++;
//         let o =  new fabric.Rect({
//           top : y,
//           left : x,
//           width : 10,
//           height : 10,
//           fill : 'red'
//         });
//         objects.push(o);
//         c.add(o);
//       }
//     }
// //    c.add(objects);
//     console.log(`added ${count} objects in ${((d() - start)/1000).toFixed(2)} s`);
//   }
  title = 'app';
}
