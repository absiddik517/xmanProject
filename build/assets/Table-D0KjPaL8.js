import{k as C,r as i,j as e,C as p,L as u}from"./index-4WgTBl-l.js";import"./DefaultLayout-BLFrAsgA.js";import{a as o}from"./index.esm-CdVIU4p-.js";import{a as f,d as D}from"./crud-B82QNuOT.js";import{C as b,a as w}from"./CRow-CegcB6TX.js";import{C as g,a as v}from"./CCardBody-BOTH1aaN.js";import{C as y}from"./CCardHeader-frLQR2cS.js";import{C as T,a as N,b as n,c as a,d as E,e as r}from"./CTable-ouXeKY5D.js";import"./auth-DAOsVcov.js";import"./cil-user-Ddrdy7PS.js";const G=()=>{const{currentUser:t}=C(),[x,j]=i.useState([]),[h,l]=i.useState(!1),d=async()=>{l(!0);const s=await f("deliveries",t.uid);s.success&&(l(!1),j(s.data))};i.useEffect(()=>{d()},[t]);const m=async s=>{s.preventDefault();const c=s.target.dataset.id;confirm("Are sure to delete?")&&(l(!0),(await D("deliveries",c)).success&&d(),l(!1))};return e.jsx(b,{children:e.jsx(w,{xs:12,children:e.jsxs(g,{className:"mb-4",children:[e.jsxs(y,{children:[e.jsx("strong",{children:"React Table"})," ",h&&e.jsx(p,{size:"sm"})]}),e.jsx(v,{children:e.jsxs(T,{align:"middle",responsive:!0,children:[e.jsx(N,{children:e.jsxs(n,{children:[e.jsx(a,{scope:"col",className:"w-5",children:"#"}),e.jsx(a,{scope:"col",className:"w-40",children:"Delivery Date"}),e.jsx(a,{scope:"col",className:"w-10",children:"Delivery"}),e.jsx(a,{scope:"col",className:"w-10",children:"Rate"}),e.jsx(a,{scope:"col",className:"w-10",children:"Earning"}),e.jsx(a,{scope:"col",className:"w-25",children:"Action"})]})}),e.jsx(E,{children:x.map((s,c)=>e.jsxs(n,{children:[e.jsx(r,{children:c+1}),e.jsx(r,{children:s.data.date}),e.jsx(r,{children:s.data.delivery}),e.jsx(r,{children:s.data.rate}),e.jsx(r,{children:s.data.earning}),e.jsxs(r,{children:[e.jsx(u,{to:"/edit/"+s.id,children:e.jsx(o,{color:"primary",children:"Edit"})}),e.jsx(o,{color:"dark","data-id":s.id,onClick:m,children:"Delete"})]})]},c))})]})})]})})})};export{G as default};