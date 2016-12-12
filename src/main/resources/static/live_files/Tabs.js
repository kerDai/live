var C={Slice:Array.prototype.slice,G:function(Id)
{return typeof(Id)=="string"?document.getElementById(Id):Id;},Ce:function(Tag)
{return document.createElement(Tag);},Bd:function(D)
{var D=D||document;return C.Gs(D.documentElement,"body")[0];},Gsn:function(Nm,Obj)
{var Rst=document.getElementsByName(Nm);if(Obj||window.attachEvent)
{Rst=[];var e=(C.G(Obj)||document).getElementsByTagName("*");for(var i=0,len=e.length;i<len;i++)
{if(e[i].tagName&&e[i].getAttribute("name")==Nm)
{Rst[Rst.length]=e[i];}}}
return Rst;},Gs:function(prt,tg,Progeny)
{var prt=typeof(prt)=="string"?C.G(prt):prt,Childs=new Array(),Ds=prt.getElementsByTagName(tg),Progeny=!Progeny?false:true;for(var i=0;i<Ds.length;i++)
{if(Ds[i].parentNode==prt||Progeny)
{Childs.push(Ds[i]);}}
return Childs;},Cls:function(ClsNm,Tag,Prt)
{var Tags=Tag||"*",Prt=C.G(Prt)||document;Reg=new RegExp("(^| )"+ClsNm+"( |$)"),t=C.Gs(Prt,Tags,true),Arr=[];for(var i=0;i<t.length;i++)
{if(Reg.test(t[i].className))
{Arr.push(t[i]);}}
return Arr;},Lt:function(o)
{o.L=o.offsetLeft;o.T=o.offsetTop;var Ele=o;while(Ele.offsetParent.tagName.toLowerCase()!="body")
{Ele=Ele.offsetParent;o.L+=Ele.offsetLeft;o.T+=Ele.offsetTop;}},Pre:function(Ele)
{return C.Sbl(Ele,"previousSibling");},Nxt:function(Ele)
{return C.Sbl(Ele,"nextSibling");},Sbl:function(Ele,Fn)
{var E=Ele[Fn];while(E.nodeType!=1)
{E=E[Fn];}
return E;},Json:function(Str)
{return eval("({"+Str+"})")},Hide:function(Id)
{var oE=C.G(Id),H=oE.offsetHeight;if(H>0)
{H--;}
else
{return;}
oE.style.height=H+"px";setTimeout(function(){C.Hide(Id)},100);},Show:function(Id)
{var oE=C.G(Id),Max=parseInt(Id.substring(2));oE.style.height=!oE.style.height?"0px":oE.style.height;Ch=parseInt(oE.style.height.slice(0,-2));if(Ch<Max)
{Ch++;oE.style.height=Ch+"px";setTimeout(function(){C.Show(Id)},0);}},Batch:function()
{var Ns=C.Slice.apply(C.Batch.caller.arguments);if(Ns.length>1)
{for(var i=0;i<Ns.length;i++)
{C.Batch.caller.prototype.Init(C.G(Ns[i]));}}
else
{C.Batch.caller.prototype.Init(C.G(Ns[0]))}},CurrentStyle:function(element)
{return element.currentStyle||document.defaultView.getComputedStyle(element,null);},AttrStyle:function(Elem,Attr)
{if(Elem.Attr)
{return Elem.style[Attr];}else if(Elem.currentStyle)
{return Elem.currentStyle[Attr];}else if(document.defaultView&&document.defaultView.getComputedStyle)
{Attr=Attr.replace(/([A-Z])/g,'-$1').toLowerCase();return document.defaultView.getComputedStyle(Elem,null).getPropertyValue(Attr);}else
{return null;}},Eh:function(Id,Tg)
{var Ctn=C.G(Id),Sbs=C.Gs(Ctn,Tg),Hs=[];for(var i=0;i<Sbs.length;i++)
{Hs[i]=Sbs[i].clientHeight;}
for(var j=0;j<Sbs.length;j++)
{Sbs[j].style.height=Hs.sort(function(a,b){return b-a;})[0]+"px";}},Ehs:function()
{var Es=[],Hs=[];for(var i=0;i<arguments.length;i++)
{var El=C.G(arguments[i]);if(El.nodeType==1)
{Es.push(El);Hs.push(El.clientHeight);}}
for(var j=0;j<Es.length;j++)
{Es[j].style.height=Hs.sort(function(a,b){return b-a;})[0]+"px";}},Fi:function(Id)
{var F=C.G(Id),Vh=C.Gs(F.contentWindow.document.documentElement,"body")[0].clientHeight;F.style.height=Vh+"px";},Ts:function()
{return"timestamp="+new Date().getTime().toString();},AddEvent:function(obj,ev,fn,arg)
{var Ehd=!arg?fn:function(e){fn(e,arg);},obj=C.G(obj);if(window.addEventListener)
{obj.addEventListener(ev,Ehd,false);}
else if(window.attachEvent)
{obj.attachEvent("on"+ev,Ehd);}
else
{obj["on"+ev]=Ehd;}},AE:function(obj,ev,fn,arg)
{var Ehd;if(arguments.length<4)
{Ehd=fn;}
else
{var Ag=C.Slice.call(arguments,3);Ehd=function(){return function(e){Ag.unshift(e);fn.apply(null,Ag);};}();}
if(window.addEventListener)
{obj.addEventListener(ev,Ehd,false);}
else if(window.attachEvent)
{obj.attachEvent("on"+ev,Ehd);}
else
{obj["on"+ev]=Ehd;}},DelEvent:function(obj,ev,fn)
{if(window.removeEventListener)
{obj.removeEventListener(ev,fn,false);}
else if(window.detachEvent)
{obj.detachEvent("on"+ev,fn);}
else
{obj["on"+ev]=null;}},StopBubble:function(e)
{if(e&&e.stopPropagation)
{e.stopPropagation();}
else
{window.event.cancelBubble=true;}},DelClass:function(M,Cn)
{if(M)
{var Cls=M.getAttribute("class")||M.getAttribute("className");if(Cls)
{if(RegExp("^\\s*"+Cn+"\\s*$").test(Cls))
{C.DelAttr(M,"className");C.DelAttr(M,"class");}
else
{M.className=Cls.replace(new RegExp("( ?|^)"+Cn+"\\b"),"");}}}},AddClass:function(M,Cn)
{if(M)
{var Cls=M.getAttribute("class")||M.getAttribute("className");if(Cls!=null)
{Cn=Cls.indexOf(Cn)==-1?Cls+" "+Cn:Cls;}
M.className=Cn;}},Attr:function(Id,Attr)
{var obj=C.G(Id),oAttr;if(obj.getAttribute(Attr))
{oAttr=obj.getAttribute(Attr)}
else if(obj.attributes[Attr])
{oAttr=obj.attributes[Attr];}
return oAttr;},DelAttr:function(Id,Attr)
{var obj=C.G(Id),oAttr;if(obj.getAttribute(Attr))
{obj.removeAttribute(Attr);}
else if(obj.attributes[Attr])
{obj.removeAttributeNode(obj.attributes[Attr]);}},DelStyle:function(Ele)
{if(Ele.getAttribute("style"))
{Ele.removeAttribute("style");}
else if(Ele.attributes["style"])
{Ele.removeAttributeNode(Ele.attributes["style"]);}},Sa:function(Sp,Intro)
{var Sp=C.G(Sp),Cs=C.Gs(Sp,"input",true),Itr=null;if(Intro)
{Itr=C.G(Intro);}
else
{switch(Sp.id.charAt(0).toUpperCase())
{case"F":Itr=Cs.shift();break;case"L":Itr=Cs.pop();break;}}
C.AddEvent(Itr,"click",function()
{for(var i=0;i<Cs.length;i++)
{if(Cs[i].type=="checkbox")
{Cs[i].checked=Itr.checked?true:false;}}});},XHR:function()
{var XHR;try
{XHR=new XMLHttpRequest();}
catch(e1)
{try
{XHR=new ActiveXObject("Msxml2.XMLHTTP");}
catch(e2)
{try
{XHR=new ActiveXObject("Microsoft.XMLHTTP");}
catch(e3)
{XHR=false;}}}
return XHR;},EXHR:function(CallBack,Method,Url,Data,Proc,Async)
{var oXHR=this.XHR(),Rst=null,Junctor=Url.indexOf("?")!=-1?"&":"?";oXHR.onreadystatechange=function()
{switch(oXHR.readyState)
{case 0:Rst="请求未初始化";break;case 1:Rst="服务器连接已建立";break;case 2:Rst="请求已接收";break;case 3:Rst="请求处理中";break;case 4:Rst="请求已完成，且响应已就绪";if(oXHR.status==200)
{var Rsp=null,cType=oXHR.getResponseHeader("Content-Type");if(cType.indexOf("text/xml")!=-1){Rsp=oXHR.responseXML}
else if(cType.indexOf("text/json")!=-1||cType.indexOf("text/html")!=-1||cType.indexOf("text/javascript")!=-1||cType.indexOf("application/javascript")!=-1||cType.indexOf("application/json")!=-1||cType.indexOf("application/x-javascript")!=-1)
{Rsp=eval('('+oXHR.responseText+')');}
else
{Rsp=oXHR.responseText;}
CallBack(Rsp);}
break;}
if(Proc){Proc(Rst);}};Data=Method=="GET"?null:Data;Async=Async!=false?true:false;oXHR.open(Method,encodeURI(Url),Async);if(Method=="POST")
{oXHR.setRequestHeader("Content-type","application/x-www-form-urlencoded");}
oXHR.send(Data);},Collect:function(sUrl,Tit)
{var sUrl=!sUrl?document.URL:sUrl,Tit=!Tit?document.title:Tit;try
{window.external.addFavorite(sUrl,Tit);}
catch(e)
{try
{window.sidebar.addPanel(Tit,sUrl,"");}
catch(eb)
{alert("对不起，您所使用的浏览器不允许点击收藏!\n请使用Ctrl+D进行收藏。");}}},SetHome:function(sUrl)
{var sUrl=!sUrl?document.URL:sUrl;try
{document.body.style.behavior='url(#default#homepage)';document.body.setHomePage(sUrl);}
catch(e)
{alert("抱歉!您的浏览器不支持直接设为首页。您可通过浏览器 工具->选项->使用当前页->确定，完成设为首页。");}},sDate:function()
{this.Ts=arguments.length==0?this.Ts:C.Slice.apply(arguments);var D=new Date,Wd=["日","一","二","三","四","五","六"],Y=D.getUTCFullYear(),M=(D.getUTCMonth()+1),Ds=D.getUTCDate(),H=D.getUTCHours(),Mt=D.getUTCMinutes(),S=D.getUTCSeconds(),W=Wd[D.getDay()];for(var i=0;i<this.Ts.length;i++)
{var Pl=C.G(this.Ts[i]),Str="",Jetlag=-D.getTimezoneOffset(),J;switch(this.Ts[i].charAt(0).toUpperCase())
{case"A":J=8;break;case"B":J=0;break;case"C":J=-4;break;case"D":J=9;break;case"E":J=-5;break;}
H=D.getUTCHours()+J;if(H>=24)
{Ds+=1;H=H-24;}
else if(H<0)
{Ds-=1;H+=24;}
S=S.toString().length!=2?S="0"+S:S;Mt=Mt.toString().length!=2?Mt="0"+Mt:Mt;switch(this.Ts[i].charAt(1).toUpperCase())
{case"D":Str=Y+"年"+M+"月"+Ds+"日";break;case"W":Str=Y+"年"+M+"月"+Ds+"日"+" 星期"+W;break;case"M":Str=H+":"+Mt;break;case"S":Str=H+":"+Mt+":"+S;break;}
Pl.innerHTML=Str;}
setTimeout(function(){C.sDate()},1000);},Bdo:function()
{var Baw=C.G("Bas"),Args=arguments;for(var i=0;i<Args.length;i++)
{BAIDU_CLB_fillSlot(arguments[i]);}
window.setTimeout(function()
{var Bad=C.Gs(Baw,"div");for(var j=0;j<Args.length;j++)
{var Win=C.G("baidu_clb_slot_iframe_"+Args[j]);if(Win!=null)
{var Ad=Win.contentWindow.document.getElementsByTagName("a")[0]||Win.contentWindow.document.getElementsByTagName("object")[0]||Win.contentWindow.document.getElementsByTagName("embed")[0];if(!Ad){continue;}
C.G(Bad[j].id.substring(15)).innerHTML=Ad.parentNode.innerHTML;}}},2400);}};Function.prototype.Method=function(Nm,Fun)
{if(!this.prototype[Nm])
{this.prototype[Nm]=Fun;}};String.Method("Trim",function(){return this.replace(/^\s+|\s+$/g,"");});
;function Menus()
{var Ns=C.Slice.apply(arguments);this.IsFirst=typeof Menus.Initialized=="undefined"?true:false,Arr=[];if(this.IsFirst)
{Menus.prototype={Ms:function()
{for(var i=0;i<Ns.length;i++)
{var oMs=C.Gsn(Ns[i]);for(var j=0;j<oMs.length;j++)
{Arr.push(oMs[j]);}}},ShowNext:function(e)
{var e=e||window.event,M=e.srcElement||e.target,Cts=M.nextSibling.style;Cts.visibility="visible";C.AddClass(M,"Ex");Cts.top=M.offsetTop+M.offsetHeight+"px";Cts.left=M.offsetLeft+"px";},HideNext:function(e)
{var e=e||window.event,Ct=e.srcElement||e.target,Et=e.toElement||e.relatedTarget;Ct=Ct.nextSibling;if(Et!=Ct)
{Ct.style.visibility="hidden";C.DelClass(Ct.previousSibling,"Ex");}}}
Menus.Initialized=true;}
Menus.prototype.Ms();for(var i=0;i<Arr.length;i++)
{var oM=Arr[i];var En=Arr[i].name.charAt(0).toLowerCase()=="c"?"click":"mouseover";C.AddEvent(oM,En,Menus.prototype.ShowNext);C.AddEvent(oM,"mouseout",Menus.prototype.HideNext);C.AddEvent(oM.nextSibling,"mouseout",function(e)
{var e=e||window.event,Ct=e.srcElement||e.target,Et=e.toElement||e.relatedTarget;if(Ct.tagName=="SPAN"&&Et.parentNode!=Ct)
{Ct.style.visibility="hidden";C.DelClass(Ct.previousSibling,"Ex");}});}}
;function Cleaner(){Cleaner.prototype={Init:function(o){o.Txt=C.G(o).value;C.AddEvent(o,"click",Cleaner.prototype.Clear,o);C.AddEvent(o,"blur",Cleaner.prototype.Reset,o);},Clear:function(e,o){if(C.G(o).value==o.Txt){o.value='';}},Reset:function(e,o){if(o.value==''){o.value=o.Txt;}}};C.Batch();}
;function Tabs()
{this.Ids=C.Slice.apply(arguments);this.IsFirst=typeof Tabs.Initialized=="undefined"?true:false;if(true)
{var Arr=[];Tabs.prototype.Swc=function(L)
{var oDL=L.parentNode.parentNode,Ms=C.Gs(L.parentNode,L.tagName),Cs=C.Gs(oDL,"dd");for(var i=0;i<Ms.length;i++)
{if(Ms[i].parentNode.tagName.toLowerCase()=="dt")
{Ms[i].setAttribute("n",i);}
Cs[i].style.display="none";}
if(!this.IsFirst&&oDL.oi>-1)
{C.DelClass(Ms[oDL.oi],"CM");C.DelStyle(Cs[oDL.oi]);}
var n=L.getAttribute("n");C.AddClass(L,"CM");Cs[n].style.display="block";oDL.oi=parseInt(n);};Tabs.prototype.Dls=function()
{for(var i=0;i<this.Ids.length;i++)
{var oDl=C.G(this.Ids[i]);if(oDl.tagName.toLowerCase()=="dl")
{Arr.push(oDl);}
else
{var sDs=C.Gs(oDl,"dl",true);for(var p=0;p<sDs.length;p++)
{sDs[p].name=oDl.id;Arr.push(sDs[p]);}}}
for(var j=0;j<Arr.length;j++)
{var dId=(Arr[j].id!="")?Arr[j].id:Arr[j].name,Md=dId.charAt(2),Tn=Md=="i"?"img":"a",Ls=C.Gs(C.Gs(Arr[j],"dt")[0],Tn),Fg=parseInt(dId.charAt(1))-1,Et=dId.charAt(0).toLowerCase()=='c'?"mousedown":"mouseover",IA=dId.indexOf("_");if(Fg>-1)
{this.Swc(Ls[Fg]);if(IA>0)
{var Tm=parseInt(dId.slice(IA+1)),ALs=C.Gs(C.Gs(C.G(dId),"dt")[0],Tn),AFg=parseInt(dId.charAt(1))-1;Arr[j].T=setInterval(function()
{AFg=AFg<ALs.length?AFg++:0;Tabs.prototype.Swc(ALs[AFg++]);},Tm);}}
for(var k=0;k<Ls.length;k++)
{C.AddEvent(Ls[k],Et,function(e)
{var that=(e.target)?e.target:e.srcElement,that=that.getAttribute("n")!=null?that:that.parentNode,Dl=that.parentNode.parentNode;if(Dl.id.indexOf("_")>0)
{clearInterval(Dl.T);var n=parseInt(that.getAttribute("n")),Ln=C.Gs(C.Gs(Dl,"dt")[0],Dl.id.charAt(2)=="i"?"img":"a");Tabs.prototype.Swc(Ln[n]);Dl.T=setInterval(function()
{n=Ln.length==n?0:n;Tabs.prototype.Swc(Ln[n++]);},parseInt(Dl.id.slice(Dl.id.indexOf("_")+1)));}
else
{Tabs.prototype.Swc(that);}});}}};this.Dls();Tabs.Initialized=true;}}