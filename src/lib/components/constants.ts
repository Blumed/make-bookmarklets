export const useExample1 = `if(document.designMode === "off") {
    document.designMode = "on";
  } else {
    document.designMode = "off"; 
  }`;  
export const useExample2 = `const capture = async () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const video = document.createElement("video");
  
    try {
      const captureStream = await navigator.mediaDevices.getDisplayMedia();
      video.srcObject = captureStream;
      context.drawImage(video, 0, 0, window.width, window.height);
      const frame = canvas.toDataURL("image/png");
      captureStream.getTracks().forEach(track => track.stop());
      window.location.href = frame;
    } catch (err) {
      console.error('Full page screenshot bookmarklet did not work: ' + err);
    }
  };
  
  capture();`;
export const useExample3 = `function pageSpeedInsights(currentSite){
    try {
     window.open('https://pagespeed.web.dev/report?url=' + currentSite, '_blank', 'noopener,noreferrer'); 
    } catch (error){
      console.log('pagespeed insights bookmarklet did not work: ', error);
    }
  };
  pageSpeedInsights(window.location.href);`;
  export const useExample4 = `try {   
    navigator.clipboard.writeText('ADD WHAT EVER TEXT YOU WANT HERE');
  } catch(error) {
    console.log('Copy To Clipboard Bookmarklet did not work: ', error);
  }`;  
export const useExample5 = `try {
    const highlightedText = window.getSelection();
     window.open('http://google.com/search?q="' + highlightedText + '"');
  }  catch(error) {
    console.log('Google If Text Indexed Bookmarklet did not work: ', error);
  }`;
export const config = {
  parserOptions: {
      ecmaVersion: 2019,
      sourceType: "module",
  },
  env: {
      browser: true,
      node: true,
  },
  rules: {
      semi: ["warn", "always"],
      "valid-typeof": ["error", "always"],
      "no-unused-vars": ["error", "always"],
      "no-unreachable": ["error", "always"],
      "no-dupe-args": ["error", "always"],
      "no-dupe-else-if": ["error", "always"],
      "no-console": ["warn", "always"],
  },
};