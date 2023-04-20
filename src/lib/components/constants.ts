export const useExampleBookmarklet1 = `const source = "https://assets.make-bookmarklets.com/thanks-ac42db36.mp3";
const audio = new Audio();

audio.addEventListener("load", () => {
  audio.play();
}, true);

audio.src = source;
audio.autoplay = true;`;

export const useExampleBookmarklet2 = `const capture = async () => {
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
export const useExampleBookmarklet3 = `function pageSpeedInsights(currentSite){
    try {
     window.open('https://pagespeed.web.dev/report?url=' + currentSite, '_blank', 'noopener,noreferrer'); 
    } catch (error){
      console.log('pagespeed insights bookmarklet did not work: ', error);
    }
  };
  pageSpeedInsights(window.location.href);`;
  export const useExampleBookmarklet4 = `try {   
    navigator.clipboard.writeText('ADD WHAT EVER TEXT YOU WANT HERE');
  } catch(error) {
    console.log('Copy To Clipboard Bookmarklet did not work: ', error);
  }`;  
export const useExampleBookmarklet5 = `try {
  const highlightedText = window.getSelection().toString();
   window.open('http://google.com/search?q=site:' + window.location.hostname + ' "' + highlightedText + '"');
}  catch(error) {
  console.log('Google If Text Indexed Bookmarklet did not work: ', error);
}`;
export const useExampleSnippet1 = `const container = document.createElement('div');
container.className = 'xxxxxx_wraper_xxxxx';
container.textContent = 'Give me some data, or maybe some buttons?';
container.styles = 'width: 100%;letter-spacing:1px;background-color:pink;text-align:right;font-family:helvetica !important;font-weight:100;padding-inline: 60px;color:#161613;margin:auto;top:0;right:0;left:0;position:fixed;z-index:2147483647;font-size:18px;text-rendering:optimizeLegibility;text-align:center;line-height:36px;';
container.setAttribute('style', container.styles);
document.body.appendChild(container);

const close = document.createElement('button');
close.setAttribute('type', 'button');
close.className = 'xxxxxx_close_xxxxx';
close.textContent = 'x';
close.setAttribute('style', 'position:absolute;left:30px;top:8px !important;background-color:white;border-radius:50%;color:black;z-index:30;padding:0;font-size:15px;font-weight:100;width:20px;height:20px;cursor:pointer;display:flex;justify-content:center;align-items:flex-start;border:1px solid black;line-height:16px;');
close.onclick = () => container.remove();
container.appendChild(close);`;
export const useExampleSnippet2 = `const container = document.createElement('dialog');

function createDialog() {
  const close = document.createElement('button');

  container.setAttribute('style', 'width: 100%;letter-spacing:1px;background-color:pink;font-family:helvetica !important;font-weight:100;border-radius:12px;padding-inline:60px;color:#161613;border-color:#fff;position:fixed;inset:0;margin:auto;width:100%;max-width:400px;z-index:2147483647;font-size:18px;text-rendering:optimizeLegibility;text-align:left;line-height:36px;');
  
  close.setAttribute('style', 'position:absolute;right:10px;top:8px !important;background-color:white;border-radius:50%;color:black;z-index:30;padding:0  0 0 1px;font-size:15px;font-weight:100;width:20px;height:20px;cursor:pointer;display:flex;justify-content:center;align-items:flex-start;border:1px solid black;line-height:16px;');
  close.textContent = 'x';
  close.onclick = () => container.remove();
  
  document.body.appendChild(container);
  container.appendChild(close);

  createContent('h1');
  createContent('h2');
  createContent('h3');
  createContent('h4');
  createContent('h5');
  createContent('h6');
  container.showModal();
} 

function createContent(header) {
  const p = document.createElement('p');
  const strong = document.createElement('strong');
  
  strong.textContent = document.getElementsByTagName(header).length;
  
  p.textContent = header + ': ';
  
  container.appendChild(p);
  p.appendChild(strong);
}

createDialog();`;
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