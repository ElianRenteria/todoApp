import{A as I,s as L,a as S,b as T,c as N}from"./AuthService-BZpewyjO.js";import{f as z,g as _,u as U,h as $,i as j,r as q,o as f,c as w,b as o,w as a,j as t,t as A,k as E,a as l,d as v,l as M,p as P,e as D,_ as F}from"./index-BGpGa3Tn.js";const i=n=>(P("data-v-e0ea41e7"),n=n(),D(),n),R={class:"container"},G=i(()=>l("h1",{style:{"text-align":"center"}},"Login",-1)),H={key:0,class:"error-text mb-2",style:{"text-align":"center"}},J={class:"flex flex-column justify-content-evenly align-items-center"},K=i(()=>l("label",{for:"username"},"Username",-1)),O=i(()=>l("label",{for:"password"},"Password",-1)),Q=z({__name:"Login",setup(n){const p=M(),e=_({username:void 0,password:void 0}),g=_({username:void 0,password:void 0}),h=new I,{setToken:x,isTokenExpired:k}=U();let r=$("");const y=()=>{g.password=e.password!==void 0&&e.password.length>0},V=async()=>{if(!e.username||!e.password){console.error("username and password are required"),r.value="username and password are required";return}try{const s=await h.login(e.username,e.password);if(s.status!==200){console.error(s.data.detail),r.value=s.data.detail;return}x(s.data.token),p.push({name:"app"})}catch(s){r.value=s.response.data.message,console.error(s)}};return j(()=>{k()||p.push({name:"app"})}),(s,d)=>{const u=L,m=S,b=T,C=q("router-link"),B=N;return f(),w("div",R,[o(B,{class:"p-5 h-30rem w-25rem"},{title:a(()=>[G,t(r)?(f(),w("div",H,A(t(r)),1)):E("",!0)]),content:a(()=>[l("div",J,[o(m,{class:"mb-5 mt-3"},{default:a(()=>[o(u,{id:"username",size:"large",modelValue:t(e).username,"onUpdate:modelValue":d[0]||(d[0]=c=>t(e).username=c)},null,8,["modelValue"]),K]),_:1}),o(m,{class:"mb-5"},{default:a(()=>[o(u,{id:"password",type:"password",size:"large",modelValue:t(e).password,"onUpdate:modelValue":d[1]||(d[1]=c=>t(e).password=c),onChange:y},null,8,["modelValue"]),O]),_:1}),o(b,{type:"submit",size:"large",class:"mt-2",onClick:V},{default:a(()=>[v("Login")]),_:1}),o(C,{to:"/register",class:"mt-4"},{default:a(()=>[v("create account")]),_:1})])]),_:1})])}}}),Y=F(Q,[["__scopeId","data-v-e0ea41e7"]]);export{Y as default};
