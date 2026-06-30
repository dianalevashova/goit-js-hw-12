import{a as m,S as b,i as l}from"./assets/vendor-CFFvTae-.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();m.defaults.baseURL="https://pixabay.com/api/";const w="26535916-1f26af17a56090e5344028601";async function h(s,r=1){const{data:e}=await m.get("",{params:{key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:15}});return e}const v=new b(".gallery a",{captionsData:"alt",captionDelay:250});function y(s){const r=s.map(e=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${e.largeImageURL}">
            <img
              class="gallery-image"
              src="${e.webformatURL}"
              alt="${e.tags}"
            />
          </a>

          <div class="info">
            <p>Likes <br>${e.likes}</p>
            <p>Views <br>${e.views}</p>
            <p>Comments <br>${e.comments}</p>
            <p>Downloads <br>${e.downloads}</p>
          </div>
        </li>
      `).join("");a.gallery.insertAdjacentHTML("beforeend",r),v.refresh()}function S(){a.gallery.innerHTML=""}function g(){a.loader.classList.remove("is-hidden")}function c(){a.loader.classList.add("is-hidden")}function p(){a.loadMoreBtn.classList.remove("is-hidden")}function u(){a.loadMoreBtn.classList.add("is-hidden")}const a={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),form:document.querySelector(".form"),loadMoreBtn:document.querySelector(".load-more-btn")};a.form.addEventListener("submit",B);a.loadMoreBtn.addEventListener("click",M);let i=1,f="",L=15;async function B(s){s.preventDefault();const r=a.form.elements["search-text"].value.trim();if(r){f=r,i=1,S(),u(),g();try{const{hits:e,totalHits:n}=await h(f,i);if(e.length===0){c(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}y(e),i*L>=n?(u(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):p(),c()}catch{c(),l.error({message:"Something went wrong. Please try again later."})}}}async function M(){i+=1,g();try{const{hits:s,totalHits:r}=await h(f,i);y(s);const e=document.querySelector(".gallery-item");if(e){const n=e.getBoundingClientRect().height;window.scrollBy({top:n*2,behavior:"smooth"})}i*L>=r?(u(),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):p(),c()}catch{c(),l.error({message:"Something went wrong. Please try again later."})}}
//# sourceMappingURL=index.js.map
