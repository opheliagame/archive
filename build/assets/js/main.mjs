import{createComponent as e}from"https://cdn.skypack.dev/ficusjs@3";import{html as r,renderer as t}from"https://cdn.skypack.dev/@ficusjs/renderers@3/htm";["https://fonts.googleapis.com/css2?family=Saira:wght@400;500;600;700&display=swap"].forEach((function(e){const r=document.createElement("link");r.rel="stylesheet",r.href=e,r.type="text/css";const t=document.getElementsByTagName("link")[0];t.parentNode.insertBefore(r,t)})),function({createComponent:e,html:r,renderer:t}){e("main-footer",{renderer:t,render:()=>r`
        <footer>
          <ul class="markdown-list list-inside self-start">
            <li><a class="link-primary" href="https://www.instagram.com/ophelia.game/">instagram</a></li>
            <li><a class="link-primary" href="https://twitter.com/anushkatr">twitter</a></li>
          </ul>
        </footer>
      `})}({createComponent:e,html:r,renderer:t}),function({createComponent:e,html:r,renderer:t}){e("main-header",{renderer:t,render:()=>r`
        <header class="flex justify-between lg:justify-center items-center py-4 md:py-8 px-2">
          <a class="text-black no-underline" href="/">
            <h1 class="text-2xl md:text-3xl font-bold">
              opheliagame
            </h1>
          </a>
        </header>
      `})}({createComponent:e,html:r,renderer:t}),function({createComponent:e,html:r,renderer:t}){e("main-nav",{renderer:t,render:()=>r`
        <div class="flex flex-wrap gap-y-2 py-2 lg:px-24 col-span-full justify-between items-center text-xl">
          <a class="py-1 px-2 md:py-2 md:px-4" href="/about">
            <span class="link-primary">about</span>
          </a>
        </div>
      `})}({createComponent:e,html:r,renderer:t}),function({createComponent:e,html:r,renderer:t}){e("main-tag",{renderer:t,props:{name:{type:String,required:!0}},mounted(){},render(){return r`
        <div class="pr-2">
          <span class="text-xs bg-lime-200 px-1 rounded-full border border-green-300">
            ${this.props.name}
          </span>
        </div>
      `}})}({createComponent:e,html:r,renderer:t});
