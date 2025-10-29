// ============ HAMBURGER MENU ============
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// ============ BUBBLES BACKGROUND ============
const bubblesContainer = document.getElementById("bubbles-container");
const totalBubbles = 35;

const bubbleColors = [
  "rgba(0, 184, 148, 0.2)",
  "rgba(9, 132, 227, 0.2)",
  "rgba(253, 121, 168, 0.2)",
  "rgba(255, 234, 167, 0.2)",
  "rgba(255, 99, 72, 0.2)",
];

// Create each bubble once
for (let i = 0; i < totalBubbles; i++) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");

  // Random size
  const size = Math.floor(Math.random() * 60) + 20; // 20-80px
  bubble.style.width = size + "px";
  bubble.style.height = size + "px";

  // Random horizontal position
  bubble.style.left = Math.random() * 100 + "%";

  // Pick a random color
  const colorIndex = Math.floor(Math.random() * bubbleColors.length);
  bubble.style.backgroundColor = bubbleColors[colorIndex];

  // Random animation duration: 8s to 14s
  const duration = Math.random() * 6 + 8;
  bubble.style.animationDuration = duration + "s";

  // Random delay: 0s to 5s
  const delay = Math.random() * 5;
  bubble.style.animationDelay = delay + "s";

  bubblesContainer.appendChild(bubble);
}

// ============ DOWNLOAD & OPEN RESUME ============
const downloadBtn = document.getElementById("downloadResumeBtn");
if (downloadBtn) {
  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Path to your PDF
    const pdfUrl = "resume/Tushar-Wasake-Resume.pdf";

    // 1) Open in new tab
    window.open(pdfUrl, "_blank");

    // 2) Force download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "Tushar-Wasake-Resume.pdf";
    link.click();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Select all links that point to the resume
  const downloadLinks = document.querySelectorAll(
    "a[href='resume/Tushar-Wasake-Resume.pdf']"
  );

  downloadLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default behavior

      const pdfUrl = "resume/Tushar-Wasake-Resume.pdf";

      // Open the resume in a new tab
      window.open(pdfUrl, "_blank");

      // Use a small delay before triggering the download
      setTimeout(() => {
        const tempLink = document.createElement("a");
        tempLink.href = pdfUrl;
        tempLink.download = "Tushar-Wasake-Resume.pdf";
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
      }, 500); // Delay ensures the tab opens first
    });
  });
});
