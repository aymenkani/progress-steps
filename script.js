const progressSteps = document.querySelectorAll(".progress-step");
const progressBar = document.querySelector(".progress-bar");

let active_step = 0;

progressSteps.forEach((step, index) => {
  if (index === 0) {
    step.style.transform = "scale(1.2)";
  }

  const initialProgressWidth = (0.7 / progressSteps.length) * 100;

  progressBar.style.width = `${initialProgressWidth}%`;

  step.addEventListener("click", () => {
    const prevActiveStep = progressSteps[active_step];

    prevActiveStep?.classList.remove("active");
    animateStep(prevActiveStep, 1.2, 1);
    // progressSteps.forEach((otherStep) => {
    //   otherStep.classList.remove("active");
    //   animateStep(otherStep, 1); // Start at scale 1 for otherSteps
    // });
    step.classList.add("active");

    // Update progress bar based on clicked step index
    const progressWidth = ((index + 0.7) / progressSteps.length) * 100; // Percentage
    progressBar.style.width = `${progressWidth}%`;
    if (index + 1 >= progressSteps.length / 2) {
      progressBar.style.backgroundColor = `hsla(${
        120 - (progressWidth + 20)
      }, 100%, 50%, 1)`;
    } else {
      progressBar.style.backgroundColor = `hsla(120, 100%, 50%, 1)`;
    }

    animateStep(step, 1, 1.2); // Animate clicked step to scale 1.2

    active_step = index;
  });
});

function animateStep(step, currentScale, targetScale) {
  //let currentScale = 1; // Initial scale

  const animate = () => {
    currentScale += (targetScale - currentScale) * 0.1; // Smoothly update scale
    step.style.transform = `scale(${currentScale})`;

    if (Math.abs(currentScale - targetScale) > 0.01) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}
