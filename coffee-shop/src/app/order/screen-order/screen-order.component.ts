import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-order',
  templateUrl: './screen-order.component.html',
  styleUrls: ['./screen-order.component.css']
})
export class ScreenOrderComponent implements OnInit {
  urlGame = 'https://cdn.htmlgames.com/BubbleWheel/';

  constructor() { }

  ngOnInit(): void {
  }

  checkButtonOption: boolean = false;
    // $(document).ready(function() {
    //     $('#gameButton').on('hidden.bs.modal', function() {
    //         var $this = $(this).find('iframe'),
    //         tempSrc = $this.attr('src');
    //         console.log($this);
    //         console.log(tempSrc);
    //         $this.attr('src', "");
    //         $this.attr('src', tempSrc);
    //     });
    // });

  turnOffBackground(){
    this.urlGame = '';
    this.urlGame = 'https://cdn.htmlgames.com/BubbleWheel/';
  }

  displayTimer(timer, timerDisplay){
      let timerCountdown = timer;
      let minutes, seconds;
      let setTimer = setInterval(()=>{
            minutes = (parseInt(timerCountdown) / 60, 10);
            seconds = (parseInt(timerCountdown) % 60, 10);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            timerDisplay.textContent = minutes + ":" + seconds;
            if(++timerCountdown>(60*1)){
                alert("Time's up");
                clearInterval(setTimer);
                timerDisplay.textContent = "00" + ":" + "00";
            }
        }, 1000);
    }

  countTimer(){
    let timer = 0;
    let timerDisplay = document.getElementById("timerCountdown");
    this.displayTimer(timer, timerDisplay);
  }

  openOption(){
      if(!this.checkButtonOption){
          document.getElementById("menuOption").style.display = 'block';
          this.checkButtonOption = true;
      }
      else{
          document.getElementById("menuOption").style.display = 'none';
          this.checkButtonOption = false;
      }
    }

}
