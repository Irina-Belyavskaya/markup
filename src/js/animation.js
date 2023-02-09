window.onload = () => {
    const container = document.querySelector('.container__square');
    const maxXPosition = container.getBoundingClientRect().width - 10;

    const containerPadding = getComputedStyle(container, null).getPropertyValue("padding-right").replace(/px/gi,'');
    
    const timeBlock = document.querySelector('.square-timer');
    const frameBlock = document.querySelector('.square-frame');

    const squareWidth = timeBlock.getBoundingClientRect().width;

    timeoutAnimate(maxXPosition, squareWidth, containerPadding, timeBlock);
    frameAnimate(maxXPosition, squareWidth, containerPadding, frameBlock);
};

  
function timeoutAnimate(maxXPosition, squareWidth, containerPadding, block) {
    const refreshRate = 10;
  
    let speedX = 3;
    let positionX = 0;
  
    setInterval(() => {
      positionX = positionX + speedX;
      if (positionX > maxXPosition - squareWidth - containerPadding || positionX < 0) {
        speedX = speedX * -1;
      }
      block.style.transform = `translateX(${positionX}px)`;
    }, refreshRate);
}

function frameAnimate(maxXPosition, squareWidth, containerPadding, block) {
    let positionX = 0;
    let speedX = 100;
    let prevTime = 0;

    animationStartTime = 0,
    stoppedAt = 0;

    let requestID = 0;

    addEventListener('blur', () => {
        cancelAnimationFrame(requestID);
    });

    addEventListener('focus', () => {
        requestId = window.requestAnimationFrame(step);
    });
  
    function step(time) {
        if (!prevTime) {
            prevTime = time;
        }

        let timestamp = time - prevTime;
        prevTime = time;      

        requestID = window.requestAnimationFrame(step);

        positionX += speedX * (timestamp / 1000);        
        block.style.transform = `translateX(${positionX}px)`;        
        if (positionX > maxXPosition - squareWidth - containerPadding ) {
            speedX = speedX * -1;
            positionX = maxXPosition - squareWidth - containerPadding;
        }
        if ( positionX < 0) {
            positionX = 0;
            speedX = speedX * -1;
        }
    }
    animationStartTime = window.performance.now();
    requestID = window.requestAnimationFrame(step);
}
  