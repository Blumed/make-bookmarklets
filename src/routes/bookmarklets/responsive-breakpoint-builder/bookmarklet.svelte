<script lang="ts">
    import { browser } from "$app/environment";
    export let data: any;
    export let toggleBookmarklet: boolean;

    //https://www.toptal.com/developers/javascript-minifier
    export let dynamicString =
        '!function(){let t={xxl:{background:"' +
        data.backgroundColors.xxl +
        '",color:"' +
        data.colors.xxl +
        '",maxWidth:' +
        data.breakpoint.xxl +
        ',text:"' +
        data.text.xxl +
        '"},xl:{background:"' +
        data.backgroundColors.xl +
        '",color:"' +
        data.colors.xl +
        '",maxWidth:' +
        data.breakpoint.xl +
        ',text:"' +
        data.text.xl +
        '"},lg:{background:"' +
        data.backgroundColors.lg +
        '",color:"' +
        data.colors.lg +
        '",maxWidth:' +
        data.breakpoint.lg +
        ',text:"' +
        data.text.lg +
        '"},md:{background:"' +
        data.backgroundColors.md +
        '",color:"' +
        data.colors.md +
        '",maxWidth:' +
        data.breakpoint.md +
        ',text:"' +
        data.text.md +
        '"},sm:{background:"' +
        data.backgroundColors.sm +
        '",color:"' +
        data.colors.sm +
        '",maxWidth:' +
        data.breakpoint.sm +
        ',text:"' +
        data.text.sm +
        '"},xs:{background:"' +
        data.backgroundColors.xs +
        '",color:"' +
        data.colors.xs +
        '",maxWidth:' +
        data.breakpoint.xs +
        ',text:"' +
        data.text.xs +
        '"},static:{wrap:"width: 100%;letter-spacing:1px;background-color:' +
        data.backgroundColors.container +
        ";text-align:right;font-family:helvetica !important;font-weight:100;line-height:20px;color:" +
        data.textColor.currentColor +
        ';margin:auto;top:0;right:0;left:0;position:fixed;z-index:2147483647;font-size:18px;height:36px;text-rendering:optimizeLegibility;",panel:"position: absolute;padding: 3px 0;margin: 0 auto;width: 100%;right: 0;left: 0;top:0;bottom:0;",font:"font-size: inherit;color:inherit;font-weight:100;",dots:"width:10px;height:10px;border:1px solid ' +
        data.textColor.currentColor +
        ';position:absolute;top:14px;border-radius:10px;"}};function e(t,e){clearTimeout(t),t=setTimeout(x,e)}function x(){let e=document.getElementById("screen-width"),x=document.getElementById("before-circle"),i=document.getElementById("after-circle"),l=window.innerWidth;e.innerText=window.innerWidth,e.setAttribute("style",`${t.static.font}${l===t.xxl.maxWidth||l===t.xl.maxWidth||l===t.lg.maxWidth||l===t.md.maxWidth||l===t.sm.maxWidth||l===t.xs.maxWidth?"font-weight: 600;":""}`),x.setAttribute("style",`${t.static.dots}left:62px;${l===t.xxl.maxWidth-1||l===t.xl.maxWidth-1||l===t.lg.maxWidth-1||l===t.md.maxWidth-1||l===t.sm.maxWidth-1||l===t.xs.maxWidth-1?"background-color: ' +
        data.textColor.currentColor +
        ';":""}`),i.setAttribute("style",`${t.static.dots}right:62px;${l===t.xxl.maxWidth+1||l===t.xl.maxWidth+1||l===t.lg.maxWidth+1||l===t.md.maxWidth+1||l===t.sm.maxWidth+1||l===t.xs.maxWidth+1?"background-color: ' +
        data.textColor.currentColor +
        ';":""}`)}(function x(){function i(t,e,x){let i=document.createElement("p");i.setAttribute("style","margin: 0;padding: 5px; color: inherit;font-weight: inherit;"),i.setAttribute("title",`breakpoint: ${x}`),i.textContent=e,t.appendChild(i)}let l=document.createElement("div");l.className="xxxxxx_wraper_xxxxx",l.setAttribute("style",t.static.wrap),document.body.appendChild(l);let a=document.createElement("button");a.setAttribute("type","button"),a.className="xxxxxx_close_xxxxx",a.setAttribute("style","position:absolute;left:30px;top:8px !important;background-color:white;border-radius:50%;color:black;z-index:30;padding:0;font-size:15px;font-weight:100;width:20px;height:20px;cursor:pointer;display:flex;justify-content:center;align-items:center;border:1px solid black;"),a.onclick=function t(){window.removeEventListener("resize",e),l.remove()},l.appendChild(a);let o=document.createElement("span");o.setAttribute("style","margin-top:-3px;"),o.textContent="x",a.appendChild(o);let n=document.createElement("section");n.className="xxxxxx_xxl_xxxxx",n.setAttribute("style",`max-width:${t.xxl.maxWidth}px;background-color:${t.xxl.background};${t.static.font}color:${t.xxl.color};${t.static.panel}z-index: 1;`),i(n,t.xxl.text,t.xxl.maxWidth),l.appendChild(n);let d=document.createElement("section");d.className="xxxxxx_xl_xxxxx",d.setAttribute("style",`max-width:${t.xl.maxWidth}px;background-color:${t.xl.background};${t.static.font}color:${t.xl.color};${t.static.panel}z-index: 2;`),i(d,t.xl.text,t.xl.maxWidth),l.appendChild(d);let r=document.createElement("section");r.className="xxxxxx_lg_xxxxx",r.setAttribute("style",`max-width:${t.lg.maxWidth}px;background-color:${t.lg.background};${t.static.font}color:${t.lg.color};${t.static.panel}z-index: 3;`),i(r,t.lg.text,t.lg.maxWidth),l.appendChild(r);let c=document.createElement("section");c.className="xxxxxx_md_xxxxx",c.setAttribute("style",`max-width:${t.md.maxWidth}px;background-color:${t.md.background};${t.static.font}color:${t.md.color};${t.static.panel}z-index: 4;`),i(c,t.md.text,t.md.maxWidth),l.appendChild(c);let s=document.createElement("section");s.className="xxxxxx_sm_xxxxx",s.setAttribute("style",`max-width:${t.sm.maxWidth}px;background-color:${t.sm.background};${t.static.font}color:${t.sm.color};${t.static.panel}z-index: 5;`),i(s,t.sm.text,t.sm.maxWidth),l.appendChild(s);let m=document.createElement("section");m.className="xxxxxx_xs_xxxxx",m.setAttribute("style",`max-width:${t.xs.maxWidth}px;background-color:${t.xs.background};${t.static.font}color:${t.xs.color};${t.static.panel}z-index: 6;`),i(m,t.xs.text,t.xs.maxWidth),l.appendChild(m);let p=document.createElement("section");p.className="xxxxxx_display_xxxxx",p.setAttribute("style",`width:200px;height:100%;margin:0 auto;position:relative;text-align:center;color:inherit;padding-top: 10px;letter-spacing:inherit;z-index:7;${t.static.font}`),l.appendChild(p);let h=document.createElement("div");h.setAttribute("id","before-circle"),p.appendChild(h);let f=document.createElement("span");f.setAttribute("id","screen-width"),p.appendChild(f);let g=document.createElement("div");g.setAttribute("id","after-circle"),p.appendChild(g);let u=document.createElement("style");u.textContent="html{padding-top: 36px !important;}",l.appendChild(u)})(),x(),window.addEventListener("resize",e)}();';
    export let bookmarkletify = "javascript:" + dynamicString;

    $: data || toggleBookmarklet, toggleBookmarklet && updateBookmarklet();
    $: toggleBookmarklet, updateBookmarklet();

    function updateBookmarklet() {
        if (browser && toggleBookmarklet === true) {
            const bookmarklet = document.querySelector(".xxxxxx_wraper_xxxxx");
            bookmarklet && bookmarklet ? bookmarklet.remove() : null;
            return new Function("return " + dynamicString)();
        }
        if (browser && toggleBookmarklet === false) {
            toggleBookmarklet = false;
            const bookmarklet = document.querySelector(".xxxxxx_wraper_xxxxx");
            bookmarklet && bookmarklet ? bookmarklet.remove() : null;
        }
    }
</script>

<a
    href={bookmarkletify}
    class="button fill-pink"
>{data.bookmarkletName}</a>