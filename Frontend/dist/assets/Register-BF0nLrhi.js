import{A as y,s as C,a as R,b as S,c as U}from"./AuthService-BZpewyjO.js";import{f as z,h as B,g as E,u as I,i as T,r as N,o as _,c as f,b as o,w as r,j as t,t as P,k as A,a as d,d as w,l as $,p as j,e as M,_ as D}from"./index-BGpGa3Tn.js";const i=c=>(j("data-v-a10d4207"),c=c(),M(),c),F={class:"container"},H=i(()=>d("h1",{style:{"text-align":"center"},class:"my-2"},"Sign Up",-1)),L={key:0,class:"error-text mt-2 mb-3",style:{"text-align":"center"}},O={class:"flex flex-column justify-content-evenly align-items-center"},q=i(()=>d("label",{for:"name"},"name",-1)),G=i(()=>d("label",{for:"username"},"Username",-1)),J=i(()=>d("label",{for:"password"},"Password",-1)),K=i(()=>d("label",{for:"confirm_password"},"Confirm Password",-1)),Q=z({__name:"Register",setup(c){const u=$();let l=B("");const e=E({name:"",username:"",password:"",confirm_password:""}),g=new y,{setToken:V,isTokenExpired:v}=I(),b=async()=>{if(!e.username||!e.password||!e.confirm_password||!e.name){l.value="Please fill all fields";return}if(e.password!==e.confirm_password){l.value="Passwords do not match";return}try{const a=await g.register(e.name,e.username,e.password);if(a.status==400){const s=a.data.message;console.error("Registration Error: ",s),l.value=s;return}else a.status==200?(console.log("Registration Successful"),V(a.data.token),u.push({name:"login"})):console.error("An Unknown Error Occurred")}catch(a){console.error(a),a.response&&(console.error("Registration Error: ",a.response.data.message),l.value=a.response.data.message)}};return T(()=>{v()||u.push({name:"app"})}),(a,s)=>{const m=C,p=R,h=S,k=N("router-link"),x=U;return _(),f("div",F,[o(x,{class:"p-5 h-35rem w-25rem"},{title:r(()=>[H,t(l)?(_(),f("div",L,P(t(l)),1)):A("",!0)]),content:r(()=>[d("div",O,[o(p,{class:"mb-5 mt-2"},{default:r(()=>[o(m,{id:"name",size:"large",modelValue:t(e).name,"onUpdate:modelValue":s[0]||(s[0]=n=>t(e).name=n)},null,8,["modelValue"]),q]),_:1}),o(p,{class:"mb-5"},{default:r(()=>[o(m,{id:"username",size:"large",modelValue:t(e).username,"onUpdate:modelValue":s[1]||(s[1]=n=>t(e).username=n)},null,8,["modelValue"]),G]),_:1}),o(p,{class:"mb-5"},{default:r(()=>[o(m,{id:"password",type:"password",size:"large",modelValue:t(e).password,"onUpdate:modelValue":s[2]||(s[2]=n=>t(e).password=n)},null,8,["modelValue"]),J]),_:1}),o(p,{class:"mb-5"},{default:r(()=>[o(m,{id:"confirm_password",type:"password",size:"large",modelValue:t(e).confirm_password,"onUpdate:modelValue":s[3]||(s[3]=n=>t(e).confirm_password=n)},null,8,["modelValue"]),K]),_:1}),o(h,{type:"submit",size:"large",class:"mt-1",onClick:b},{default:r(()=>[w("Register")]),_:1}),o(k,{to:"/",class:"mt-3"},{default:r(()=>[w("Home")]),_:1})])]),_:1})])}}}),Y=D(Q,[["__scopeId","data-v-a10d4207"]]);export{Y as default};
