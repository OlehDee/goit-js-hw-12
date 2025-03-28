import{a as y,S as f,i}from"./assets/vendor-Db2TdIkw.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const h="49411735-b32ab4d57ab72698c2bda355f",b="https://pixabay.com/api/";async function F(o,s,t){const a=await y.get(b,{params:{key:h,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:t}});return{images:a.data.hits,totalHits:a.data.totalHits}}const p=document.querySelector(".gallery"),L=new f(".gallery a",{captionsData:"alt",captionDelay:250});function w(){p.innerHTML=""}function A(o){const s=o.map(t=>`
        <li class="img-card">
            <a href="${t.largeImageURL}">
                <img 
                    src="${t.webformatURL}" 
                    alt="${t.tags}" 
                    loading="lazy"
                />
            </a>
            <div class="image-info">
                <p><strong>Likes:</strong> ${t.likes}</p>
                <p><strong>Views:</strong> ${t.views}</p>
                <p><strong>Comments:</strong> ${t.comments}</p>
                <p><strong>Downloads:</strong> ${t.downloads}</p>
            </div>
        </li>`).join("");p.insertAdjacentHTML("beforeend",s),L.refresh()}const v=document.querySelector("form"),E=document.querySelector("#input");document.querySelector(".gallery");const n=document.getElementById("load-more-btn"),g=document.getElementById("loading-message");let d="",l=1;const u=15;v.addEventListener("submit",async o=>{if(o.preventDefault(),d=E.value.trim(),d===""){i.error({message:"Please fill in the field!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"});return}l=1,w(),n.style.display="none",await m()});n.addEventListener("click",async()=>{l+=1,await m()});async function m(){try{g.style.display="block";const{images:o,totalHits:s}=await F(d,l,u);if(!o||o.length===0){i.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"}),n.style.display="none";return}A(o);const t=Math.ceil(s/u);l>=t?(n.style.display="none",i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#4E75FF"})):n.style.display="block"}catch{i.error({message:"An error occurred while fetching images. Please try again!",position:"topRight",messageColor:"#FAFAFB",backgroundColor:"#EF4040"})}finally{g.style.display="none"}}
//# sourceMappingURL=index.js.map
