// Select the button element
const button = document.querySelector('#screenshot-button');

// Add click event listener to the button
button.addEventListener('click', function() {
  // Get all visible divs on the page
  const divs = Array.from(document.querySelectorAll('div')).filter(function(div) {
    return window.getComputedStyle(div).display !== 'none';
  });

  // Create a canvas element with the same dimensions as the page
  const canvas = document.createElement('canvas');
  canvas.width = 1321;
  canvas.height = 749;

  // Get the canvas context and draw the divs onto it
  const context = canvas.getContext('2d');
  Promise.all(divs.map(function(div) {
    return domtoimage.toPng(div);
  })).then(function(images) {
    images.forEach(function(image) {
      context.drawImage(image, 0, 0);
    });

    // Convert the canvas to a data URL and prompt the user to save the file
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'screenshot.png';
    link.href = dataUrl;
    link.click();
  }).catch(function(error) {
    console.error('Something went wrong!', error);
  });
});
